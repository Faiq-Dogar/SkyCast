"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Cloud } from "lucide-react";

export default function Home() {
  const [city, setCity] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      router.push(`/weather?city=${encodeURIComponent(city.trim())}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-80 h-80 bg-pink-300/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-yellow-200/40 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-pink-200/30 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-blue-200/40 rounded-full animate-bounce delay-1500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Main Card */}
        <div className="rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl p-8 hover:bg-white/25 transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-white/20 backdrop-blur-lg border border-white/30">
                <Cloud className="w-12 h-12 text-white drop-shadow-lg" />
              </div>
            </div>
            <h1
              className="text-3xl font-light text-white mb-2"
              style={{ textShadow: "0 4px 8px rgba(0,0,0,0.3)" }}
            >
              Weather App
            </h1>
            <p
              className="text-white/80 text-sm"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
            >
              Discover weather conditions worldwide
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-white/90 flex items-center gap-2"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
              >
                <MapPin className="w-4 h-4 text-blue-200" />
                Enter your city
              </label>

              <div className="relative">
                <input
                  id="city"
                  type="text"
                  placeholder="e.g. Karachi, London, New York"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <Search className="w-5 h-5 text-white/60" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-blue-500/80 to-purple-600/80 backdrop-blur-lg border border-white/30 text-white font-medium shadow-lg hover:from-blue-600/80 hover:to-purple-700/80 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
            >
              <span className="flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Get Weather
              </span>
            </button>
          </form>

          {/* Footer Text */}
          <div className="mt-8 text-center">
            <p
              className="text-sm text-white/70"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
            >
              Get accurate weather information for any city around the world
            </p>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 rounded-2xl bg-white/15 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="text-2xl font-light text-white mb-1">🌡️</div>
            <p className="text-xs text-white/80">Temperature</p>
          </div>
          <div className="text-center p-4 rounded-2xl bg-white/15 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="text-2xl font-light text-white mb-1">💨</div>
            <p className="text-xs text-white/80">Wind Speed</p>
          </div>
          <div className="text-center p-4 rounded-2xl bg-white/15 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="text-2xl font-light text-white mb-1">💧</div>
            <p className="text-xs text-white/80">Humidity</p>
          </div>
        </div>
      </div>
    </main>
  );
}
