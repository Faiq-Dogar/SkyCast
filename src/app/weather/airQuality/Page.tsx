"use client";
import { Typography, useMediaQuery } from "@mui/material";
import React from "react";

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
interface AirQualityProps {
  temperatureResults: TemperatureResults;
}

const Page: React.FC<AirQualityProps> = ({ temperatureResults }) => {
  const isMobile = useMediaQuery("(max-width:599px)");

  return (
    <div className="py-7">
      <Typography
        variant={isMobile ? "body1" : "h1"}
        sx={{
          fontSize: "1.5em",
          fontWeight: "bold",
          fontFamily: "var(--font-poiret)",
        }}
      >
        {" "}
        Air Quality
      </Typography>{" "}
      <div className="flex justify-around items-center px-5 mt-10">
        <div className="flex flex-col items-center">
          <p className="text-gray-300 mb-1 text-sm">CO</p>
          <p className="text-xs text-gray-300">Carbon</p>
          <p className="text-sm text-gray-300">
            {temperatureResults?.current.air_quality.co} (μg/m3)
          </p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-gray-300 mb-1 text-sm">NO2</p>
          <p className="text-xs text-gray-300">Nitrogen</p>
          <p className="text-sm text-gray-300">
            {temperatureResults?.current.air_quality.no2} (μg/m3)
          </p>
        </div>
      </div>
      <div className="flex justify-around items-center px-5 mt-13">
        <div className="flex flex-col items-center">
          <p className="text-gray-300 mb-1 text-sm">O3</p>
          <p className="text-xs text-gray-300">Ozone</p>
          <p className="text-sm text-gray-300">
            {temperatureResults?.current.air_quality.o3} (μg/m3)
          </p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-gray-300 mb-1 text-sm">SO2</p>
          <p className="text-xs text-gray-300">SulfurDiOxide</p>
          <p className="text-sm text-gray-300">
            {temperatureResults?.current.air_quality.so2} (μg/m3)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
