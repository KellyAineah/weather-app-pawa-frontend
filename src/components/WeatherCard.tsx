
'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

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
  error,
  onRetry,
}: {
  weather?: WeatherData;
  forecast?: ForecastData;
  city: string;
  error?: string;
  onRetry?: () => void;
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

  // Process forecast data to group by day and get daily averages
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
      
      // Get the most common weather condition for the day
      const descriptions = items.map(item => item.description);
      const description = mode(descriptions);
      
      // Get the most common icon for the day
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
    }).slice(0, 3); // Get only next 3 days
  };
  
  // Helper function to find mode (most frequent value) in array
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
      <h2 className="text-xl font-semibold mb-3">
        Current Weather in {weather.location || city}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-center">
        <p><span className="font-bold">Temp:</span> {weather.temperature}°C</p>
        <p><span className="font-bold">Desc:</span> {weather.description}</p>
        <p><span className="font-bold">Humidity:</span> {weather.humidity}%</p>
        <p><span className="font-bold">Wind:</span> {weather.wind_speed} km/h</p>
      </div>

      {weather.icon && (
        <div className="flex justify-center mb-6">
          <img 
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
            alt={weather.description}
            className="w-24 h-24"
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
                <img 
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} 
                  alt={day.description}
                  className="w-16 h-16"
                />
                <div className="flex flex-col items-center mt-2">
                  <span className="text-2xl font-bold">{day.temp}°C</span>
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