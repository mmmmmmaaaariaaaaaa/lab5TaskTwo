import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Cloud, Sun, Thermometer, Wind, Droplets } from 'lucide-react';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const API_KEY = '8daef9a5572712f8c1bd93e69ace3b45'; // Замініть на ваш ключ API
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=uk`
      );
      
      if (!response.ok) {
        throw new Error('Місто не знайдено');
      }
      
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Погода</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Введіть назву міста"
                className="flex-1"
              />
              <Button type="submit" disabled={loading}>
                {loading ? 'Завантаження...' : 'Пошук'}
              </Button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          {weather && (
            <div className="mt-6 space-y-4">
              <div className="text-center">
                <h2 className="text-2xl font-bold">{weather.name}</h2>
                <div className="text-4xl font-bold mt-2">
                  {Math.round(weather.main.temp)}°C
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5" />
                  <span>Відчувається як: {Math.round(weather.main.feels_like)}°C</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5" />
                  <span>Вологість: {weather.main.humidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-5 h-5" />
                  <span>Вітер: {Math.round(weather.wind.speed)} м/с</span>
                </div>
                <div className="flex items-center gap-2">
                  {weather.weather[0].main === 'Clear' ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Cloud className="w-5 h-5" />
                  )}
                  <span>{weather.weather[0].description}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherApp;