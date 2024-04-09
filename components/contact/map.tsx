"use client";

import { GoogleMap, LoadScriptNext, MarkerF } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "1.5rem",
};

const center = {
  lat: 53.416017,
  lng: 14.547546,
};

export default function Map() {
  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
        <MarkerF position={center} />
      </GoogleMap>
    </LoadScriptNext>
  );
}
