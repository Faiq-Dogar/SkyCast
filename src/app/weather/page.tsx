"use client";
import { Box, Divider, Typography } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
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
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const city = searchParams.get("city") || "Faisalabad";
  const [temperatureResults, setTemperatureResults] =
    useState<TemperatureResults | null>(null);
  const isMobile = useMediaQuery("(max-width:599px)");

  const fetchWeather = async () => {
    const url = `https://api.weatherstack.com/current?access_key=66348045735da7a91606194a47e44af9&query=${city}`;
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
    // fetchWeather();
    setTemperatureResults({
      location: {
        name: "New Delhi",
        country: "India",
        region: "Delhi",
        lat: "28.600",
        lon: "77.200",
        timezone_id: "Asia/Kolkata",
        localtime: "2023-06-13 02:38",
        localtime_epoch: 1686683880,
        utc_offset: "5.50",
      },
      current: {
        observation_time: "03:08 PM",
        temperature: 39,
        weather_code: 113,
        weather_icons: [
          "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png",
        ],
        weather_descriptions: ["Sunny"],
        wind_speed: 13, //1
        wind_degree: 280,
        wind_dir: "W",
        pressure: 1007, //2
        precip: 0,
        humidity: 16, //3
        cloudcover: 0,
        feelslike: 40,
        uv_index: 7, //4
        visibility: 10,
        is_day: "yes",
        astro: {
          sunrise: "06:31 AM",
          sunset: "05:47 PM",
        },
        air_quality: {
          co: "468.05",
          no2: "32.005",
          o3: "55",
          so2: "7.4",
          pm2_5: "6.66",
          pm10: "6.66",
        },
      },
    });
  }, []);

  if (!mounted) return null;

  return (
    <div className="h-full min-h-screen pt-20 text-center font-thin relative overflow-hidden">
      {" "}
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
        </>
      )}
    </div>
  );
};

export default page;
