"use client";
import { Box, Divider, Typography } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import AirQuality from "./airQuality/page";
import { Droplet, Gauge, Moon, Sun, Sunrise, Sunset, Wind } from "lucide-react";

interface TemperatureResults {
  location: {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezone_id: string;
    localtime: string;
    localtime_epoch: number;
    utc_offset: string;
  };
  current: {
    observation_time: string;
    temperature: number;
    weather_code: number;
    weather_icons: string[];
    weather_descriptions: string[];
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
    is_day: string;
    astro: {
      sunrise: string;
      sunset: string;
    };
    air_quality: {
      co: string;
      no2: string;
      o3: string;
      so2: string;
      pm2_5: string;
      pm10: string;
    };
  };
}

const page = () => {
  const apiKey = process.env.NEXT_PUBLIC_API;
  console.log("ApiKey: ", apiKey);
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const city = searchParams.get("city") || "Faisalabad";
  const [temperatureResults, setTemperatureResults] =
    useState<TemperatureResults | null>(null);
  const isMobile = useMediaQuery("(max-width:599px)");

  const fetchWeather = async () => {
    const url = `${apiKey}=${city}`;
    const options = {
      method: "GET",
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      setTemperatureResults(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchWeather();
  }, []);

  if (!mounted) return null;

  return (
    <div className="h-full min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 text-white pt-20 text-center font-thin relative overflow-hidden">
      {" "}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-pink-300/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-yellow-200/40 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-pink-200/30 rounded-full animate-bounce delay-1000"></div>
      </div>
      {temperatureResults && (
        <>
          <Typography
            variant={isMobile ? "body1" : "h1"}
            sx={{ fontSize: "2em", fontFamily: "var(--font-poiret)" }}
          >
            {" "}
            {temperatureResults?.location.name} /{" "}
            <span className="fs-1">{temperatureResults?.location.country}</span>
          </Typography>{" "}
          <Typography
            variant={isMobile ? "body1" : "h1"}
            sx={{ fontSize: "1.25em", fontFamily: "var(--font-poiret)" }}
          >
            {temperatureResults?.location.localtime}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              my: 6,
            }}
          >
            {parseInt(temperatureResults?.location.localtime.slice(-5, -3)) <=
            12 ? (
              <Sun
                className="w-20 h-20 
            //   text-gray-700
              text-white drop-shadow-lg
               "
              />
            ) : (
              <Moon
                className="w-20 h-20 drop-shadow-lg
            //   text-gray-700
              text-white "
              />
            )}
          </Box>
          <Typography
            variant="h1"
            sx={{ fontFamily: "var(--font-poiret)", mb: 3 }}
          >
            {temperatureResults?.current.temperature}°c
          </Typography>
          <Typography
            variant={isMobile ? "body1" : "h1"}
            sx={{ fontSize: "1.5em", fontFamily: "var(--font-poiret)" }}
          >
            {" "}
            {temperatureResults?.current.weather_descriptions}
          </Typography>
          <Typography
            variant={isMobile ? "body1" : "h1"}
            sx={{ fontSize: "1.2em", fontFamily: "var(--font-poiret)" }}
          >
            Feels like {temperatureResults?.current.feelslike}°c
          </Typography>
          <hr className="my-5 w-10 mx-auto" />
          <div className="flex justify-around items-center px-5 mt-13 lg:mx-80">
            <div className="flex flex-col items-center">
              <Droplet className="text-gray-300 mb-1" fontSize="small" />
              <p className="text-xs text-gray-300">HUMIDTY</p>
              <p className="text-sm text-gray-300">
                {temperatureResults?.current.humidity} %
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Wind className="text-gray-300 mb-1" fontSize="small" />
              <p className="text-xs text-gray-300">WIND</p>
              <p className="text-sm text-gray-300">
                {temperatureResults?.current.wind_speed} m/s
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center px-5 mt-6 lg:mx-80">
            <div className="flex flex-col items-center">
              <Sunrise className="text-gray-300 mb-1" fontSize="small" />
              <p className="text-xs text-gray-300">SUNRISE</p>
              <p className="text-sm text-gray-300">
                {temperatureResults?.current.astro.sunrise}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Gauge className="text-gray-300 mb-1" fontSize="small" />
              <p className="text-xs text-gray-300">pressure</p>
              <p className="text-sm text-gray-300">
                {temperatureResults?.current.pressure} hPa
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Sunset className="text-gray-300 mb-1" fontSize="small" />
              <p className="text-xs text-gray-300">SUNSET</p>
              <p className="text-sm text-gray-300">
                {temperatureResults?.current.astro.sunset}
              </p>
            </div>
          </div>
          <hr className="my-5 w-10 mx-auto" />
          <AirQuality temperatureResults={temperatureResults} />
        </>
      )}
    </div>
  );
};

export default page;
