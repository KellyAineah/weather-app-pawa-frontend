'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Sun,
  CloudRain,
  Cloud,
  Droplet,
  Wind,
  Navigation,
  Search,
  Thermometer,
} from 'lucide-react';
import WeatherCard from '../components/WeatherCard';
import LoadingSpinner from '../components/LoadingSpinner';

interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  wind_speed: number;
  icon?: string;
  coord?: {
    lat: number;
    lon: number;
  };
}

interface ForecastItem {
  datetime: string;
  temperature: number;
  description: string;
  icon: string;
  humidity?: number;
  wind_speed?: number;
}

interface ForecastData {
  location: string;
  forecast: ForecastItem[];
}

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const city = searchParams.get('city') || 'Nairobi';

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputCity, setInputCity] = useState(city);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  const funFacts = useMemo(() => [
    "Nairobi means &apos;cool water&apos; in the Maasai language",
    "The city sits at 1,795 meters above sea level",
    "July is typically the coolest month in Nairobi",
    "Nairobi National Park is the only wildlife park in a capital city"
  ], []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!city) return;

      setLoading(true);
      setError(null);
      setWeather(null);
      setForecast(null);

      try {
        const [weatherResponse, forecastResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/weather?city_name=${city}&units=${unit}`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/forecast?city_name=${city}&units=${unit}`),
        ]);

        if (!weatherResponse.ok || !forecastResponse.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        setWeather(weatherData);
        setForecast(forecastData);
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError('Unable to load weather data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city, unit]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCity.trim()) {
      router.push(`/?city=${encodeURIComponent(inputCity.trim())}`);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">PawaWeather</h1>
          <p className="text-xl sm:text-2xl mb-8">Precision weather forecasting for Africa</p>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Enter city name..."
                value={inputCity}
                onChange={(e) => setInputCity(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-lg bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-gray-200 text-white"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-md"
            >
              Get Forecast
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Weather Highlights */}
        {weather && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <WeatherHighlight
              icon={<Thermometer className="w-8 h-8" />}
              title={unit === 'metric' ? 'Temperature' : 'Fahrenheit'}
              value={`${weather.temperature}°${unit === 'metric' ? 'C' : 'F'}`}
              description="Feels like normal"
            />
            <WeatherHighlight
              icon={<Droplet className="w-8 h-8" />}
              title="Humidity"
              value={`${weather.humidity}%`}
              description={getHumidityDescription(weather.humidity)}
            />
            <WeatherHighlight
              icon={<Wind className="w-8 h-8" />}
              title="Wind Speed"
              value={`${weather.wind_speed} ${unit === 'metric' ? 'km/h' : 'mph'}`}
              description={getWindDescription(weather.wind_speed, unit)}
            />
          </div>
        )}

        {/* Weather Card */}
        <div className="mb-8">
          {loading && <LoadingSpinner />}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-md text-center">
              {error}
            </div>
          )}
          {weather && !error && (
            <WeatherCard
              weather={weather}
              forecast={forecast}
              city={city}
              unit={unit}
              onToggleUnit={toggleUnit}
              error={error}
              onRetry={() => {
                if (inputCity.trim()) {
                  router.push(`/?city=${encodeURIComponent(inputCity.trim())}`);
                }
              }}
            />
          )}
        </div>

        {/* Weather Tips */}
        {weather && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Weather Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getWeatherTips(weather, unit).map((tip, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-full text-blue-600">{tip.icon}</div>
                  <div>
                    <h3 className="font-medium text-gray-800">{tip.title}</h3>
                    <p className="text-gray-600">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fun Facts Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Did You Know?</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {funFacts.map((fact, index) => (
              <li key={index} className="p-4 bg-indigo-50 rounded-lg text-gray-700">
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function WeatherHighlight({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
      <div className="p-3 bg-blue-100 rounded-lg text-blue-600">{icon}</div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

function getHumidityDescription(humidity: number): string {
  if (humidity < 30) return 'Dry air';
  if (humidity < 60) return 'Comfortable';
  if (humidity < 80) return 'Moderately humid';
  return 'Very humid';
}

function getWindDescription(speed: number, unit: string): string {
  const kmh = unit === 'metric' ? speed : speed * 1.60934;
  if (kmh < 5) return 'Calm';
  if (kmh < 12) return 'Light breeze';
  if (kmh < 20) return 'Moderate breeze';
  if (kmh < 30) return 'Strong breeze';
  return 'High winds';
}

function getWeatherTips(weather: WeatherData, unit: 'metric' | 'imperial') {
  const tips: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }> = [];

  // Temperature tips
  const temp = weather.temperature;
  if (temp < (unit === 'metric' ? 10 : 50)) {
    tips.push({
      icon: <Cloud className="w-5 h-5" />,
      title: 'Cold Weather Alert',
      description: 'Wear warm layers and protect exposed skin',
    });
  } else if (temp > (unit === 'metric' ? 30 : 86)) {
    tips.push({
      icon: <Sun className="w-5 h-5" />,
      title: 'Heat Advisory',
      description: 'Stay hydrated and avoid direct sunlight',
    });
  }

  // Rain tips
  if (weather.description.toLowerCase().includes('rain')) {
    tips.push({
      icon: <CloudRain className="w-5 h-5" />,
      title: 'Rain Expected',
      description: 'Carry an umbrella or raincoat',
    });
  }

  // Wind tips
  const windSpeed = unit === 'metric' ? weather.wind_speed : weather.wind_speed * 1.60934;
  if (windSpeed > 20) {
    tips.push({
      icon: <Wind className="w-5 h-5" />,
      title: 'Windy Conditions',
      description: 'Secure loose objects outdoors',
    });
  }

  // Default tips
  if (tips.length < 2) {
    tips.push({
      icon: <Navigation className="w-5 h-5" />,
      title: 'Ideal Conditions',
      description: 'Great day for outdoor activities',
    });
  }

  return tips;
}