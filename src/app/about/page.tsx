'use client';

import { motion } from 'framer-motion';
import { Cloud, Sun, Umbrella, Wind, Thermometer, MapPin, Droplet, Eye } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const weatherFeatures = [
    {
      icon: <Thermometer className="w-8 h-8" />,
      title: "Precision Forecasting",
      description: "Hyper-local temperature readings accurate to your neighborhood"
    },
    {
      icon: <Umbrella className="w-8 h-8" />,
      title: "Rain Predictions",
      description: "Minute-by-minute precipitation forecasts so you never get caught unprepared"
    },
    {
      icon: <Wind className="w-8 h-8" />,
      title: "Wind Analysis",
      description: "Detailed wind speed and direction maps for outdoor activities"
    },
    {
      icon: <Droplet className="w-8 h-8" />,
      title: "Humidity Index",
      description: "Real-time humidity levels with comfort indicators"
    },
    {
      icon: <Sun className="w-8 h-8" />,
      title: "UV Monitoring",
      description: "Sun intensity ratings with skin protection recommendations"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Visibility Alerts",
      description: "Fog, haze, and air quality conditions for travelers"
    }
  ];

  const useCases = [
    {
      title: "For Farmers",
      description: "Plan irrigation and harvests with agricultural weather insights"
    },
    {
      title: "For Travelers",
      description: "Route-specific weather forecasts for your journey"
    },
    {
      title: "For Event Planners",
      description: "Accurate outlooks for weddings, sports, and outdoor events"
    },
    {
      title: "For Health",
      description: "Pollen counts and air quality indexes for sensitive groups"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-blue-100/80 px-4 py-2 rounded-full mb-4">
            <p className="text-blue-600 font-medium">Weather Intelligence</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
            About PawaWeather
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Africa's most accurate weather companion, powered by advanced prediction models
          </p>
        </motion.section>

        {/* App Description */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-16 border border-blue-100/30"
        >
          <div className="flex items-center mb-6">
            <div className="p-3 bg-blue-100 rounded-xl text-blue-600 mr-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Your Local Weather Guardian</h2>
          </div>
          <div className="prose prose-lg text-gray-600">
            <p>
              PawaWeather delivers <span className="font-semibold text-blue-600">street-level accuracy</span> for weather forecasts across Africa. 
              Our proprietary algorithms analyze microclimate patterns to give you the most reliable predictions 
              for your exact location.
            </p>
            <p>
              Unlike basic weather apps, we provide <span className="font-semibold">actionable insights</span> tailored to African weather patterns - 
              from the harmattan winds of West Africa to the tropical storms of the East coast. 
              Know exactly when to plant, travel, or prepare for severe weather.
            </p>
          </div>
        </motion.div>

        {/* Weather Features */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Advanced Weather Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weatherFeatures.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-blue-100/20"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100/80 rounded-lg text-blue-600 mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Use Cases */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-blue-600/5 rounded-xl shadow-lg p-8 mb-16 border border-blue-200/20"
        >
          <h2 className="text-2xl font-bold mb-8 text-center text-blue-800">Who Uses PawaWeather?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white/90 p-5 rounded-lg border border-blue-100/30">
                <h3 className="font-bold text-lg mb-2 text-blue-700">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-16 border border-amber-100/30"
        >
          <blockquote className="text-center max-w-3xl mx-auto">
            <p className="text-xl italic text-gray-600 mb-4">
              "PawaWeather predicted the dry spell two weeks before anyone else. We adjusted our planting schedule and saved 40% of our crops."
            </p>
            <footer className="font-medium text-blue-600">
              — Ngozi Okeke, Agricultural Cooperative (Lagos, Nigeria)
            </footer>
          </blockquote>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Experience Weather Forecasting Reimagined</h2>
          <Link href="/">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl">
              Check Your Local Forecast
            </button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}