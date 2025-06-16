import { Suspense } from "react";
import WeatherPage from "./weatherPage";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading weather page...</div>}>
      <WeatherPage />
    </Suspense>
  );
};

export default Page;
