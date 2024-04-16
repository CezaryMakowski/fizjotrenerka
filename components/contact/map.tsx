"use client";

import { GoogleMap, LoadScriptNext, MarkerF } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "1.5rem",
};

const center = {
  lat: 53.45059431422177,
  lng: 14.547556016770134,
};

export default function Map({ googleKey }: { googleKey: string }) {
  return (
    <LoadScriptNext googleMapsApiKey={googleKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
        <MarkerF position={center} />
      </GoogleMap>
    </LoadScriptNext>
  );
}
