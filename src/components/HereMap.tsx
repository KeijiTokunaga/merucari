import React, { useEffect, useRef } from "react";
import "@here/maps-api-for-javascript";

export const HereMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      const platform = new H.service.Platform({
        apikey: import.meta.env.VITE_WEATHER_API_KEY,
      });

      const defaultLayers: any = platform.createDefaultLayers();

      const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
        center: { lat: 52.52, lng: 13.405 },
        zoom: 10,
        pixelRatio: window.devicePixelRatio || 1,
      });

      window.addEventListener("resize", () => map.getViewPort().resize());

      // const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      // const ui = H.ui.UI.createDefault(map, defaultLayers);

      return () => {
        map.dispose();
      };
    }
  }, [mapRef]);

  return <div ref={mapRef} style={{ width: "50%", height: "500px" }} />;
};
