'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import Image from 'next/image';

interface ForecastItem {
  datetime: string;
  temperature: number;
  description: string;
  icon: string;
  humidity?: number;
  wind_speed?: number;
}

interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  wind_speed: number;
  icon?: string;
}

interface ForecastData {
  location: string;
  forecast: ForecastItem[];
}

export default function WeatherCard({
  weather,
  forecast,
  city,
  unit = 'metric',
  error,
  onRetry,
  onToggleUnit,
}: {
  weather?: WeatherData;
  forecast?: ForecastData | null;
  city: string;
  unit?: 'metric' | 'imperial';
  error?: string;
  onRetry?: () => void;
  onToggleUnit?: () => void;
}) {
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-md mt-6 max-w-4xl mx-auto text-center shadow-md flex flex-col items-center space-y-3"
      >
        <div className="flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <strong>Error:</strong> {error}
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Retry
          </button>
        )}
      </motion.div>
    );
  }

  if (!weather) {
    return null;
  }

  const processForecast = (forecastData: ForecastItem[]) => {
    if (!forecastData) return [];
    
    const dailyForecast: Record<string, ForecastItem[]> = {};
    
    forecastData.forEach(item => {
      const date = new Date(item.datetime).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      
      if (!dailyForecast[date]) {
        dailyForecast[date] = [];
      }
      dailyForecast[date].push(item);
    });
    
    return Object.entries(dailyForecast).map(([date, items]) => {
      const temps = items.map(item => item.temperature);
      const maxTemp = Math.max(...temps);
      const minTemp = Math.min(...temps);
      const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
      
      const descriptions = items.map(item => item.description);
      const description = mode(descriptions);
      
      const icons = items.map(item => item.icon);
      const icon = mode(icons);
      
      return {
        date,
        day: date.split(',')[0],
        temp: Math.round(avgTemp),
        maxTemp: Math.round(maxTemp),
        minTemp: Math.round(minTemp),
        description,
        icon
      };
    }).slice(0, 3);
  };
  
  const mode = (arr: string[]) => {
    const frequency: Record<string, number> = {};
    let max = 0;
    let result = '';
    
    for (const item of arr) {
      frequency[item] = (frequency[item] || 0) + 1;
      if (frequency[item] > max) {
        max = frequency[item];
        result = item;
      }
    }
    
    return result;
  };

  const processedForecast = forecast ? processForecast(forecast.forecast) : [];

  return (
    <div className="bg-white text-black p-6 mt-6 max-w-4xl mx-auto rounded-2xl shadow-md">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-xl font-semibold">
          Current Weather in {weather.location || city}
        </h2>
        {onToggleUnit && (
          <button 
            onClick={onToggleUnit}
            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm hover:bg-blue-200 transition"
          >
            °{unit === 'metric' ? 'F' : 'C'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-center">
        <p><span className="font-bold">Temp:</span> {weather.temperature}°{unit === 'metric' ? 'C' : 'F'}</p>
        <p><span className="font-bold">Desc:</span> {weather.description}</p>
        <p><span className="font-bold">Humidity:</span> {weather.humidity}%</p>
        <p><span className="font-bold">Wind:</span> {weather.wind_speed} {unit === 'metric' ? 'km/h' : 'mph'}</p>
      </div>

      {weather.icon && (
        <div className="flex justify-center mb-6">
          <Image 
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            width={96}
            height={96}
            unoptimized
          />
        </div>
      )}

      {processedForecast.length > 0 && (
        <>
          <h3 className="text-lg font-medium mb-2">3-Day Forecast</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {processedForecast.map((day, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-blue-50 rounded-lg p-4 flex flex-col items-center shadow-sm"
              >
                <span className="font-semibold text-lg">{day.day}</span>
                <span className="text-sm text-gray-600 mb-2">{day.date.split(',')[1]}</span>
                <Image 
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.description}
                  width={64}
                  height={64}
                  unoptimized
                />
                <div className="flex flex-col items-center mt-2">
                  <span className="text-2xl font-bold">{day.temp}°{unit === 'metric' ? 'C' : 'F'}</span>
                  <div className="flex gap-2 mt-1">
                    <span className="text-sm text-blue-600">H: {day.maxTemp}°</span>
                    <span className="text-sm text-blue-400">L: {day.minTemp}°</span>
                  </div>
                </div>
                <span className="text-sm text-gray-700 mt-2 text-center">{day.description}</span>
              </motion.li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}