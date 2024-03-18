export type GeoapifyResponse = {
  locationCoordinates: {
    features: Array<{
      geometry: {
        coordinates: [number, number];
      };
    }>;
  };
}
