export type AirQualityData = {
  time: number;
  interval: number;
  european_aqi: number;
  pm10: number;
  pm2_5: number;
  carbon_monoxide: number;
  dust: number;
  uv_index: number;
  alder_pollen: number;
  birch_pollen: number;
  grass_pollen: number;
  mugwort_pollen: number;
  olive_pollen: number;
  ragweed_pollen: number;
};

export type AirQualityResponse = {
  airQuality: {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: {
      time: string;
      interval: string;
      european_aqi: string;
      pm10: string;
      pm2_5: string;
      carbon_monoxide: string;
      dust: string;
      uv_index: string;
      alder_pollen: string;
      birch_pollen: string;
      grass_pollen: string;
      mugwort_pollen: string;
      olive_pollen: string;
      ragweed_pollen: string;
    };
    current: AirQualityData;
  };
};
