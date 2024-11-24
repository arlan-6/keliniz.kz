"use client";
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
	width: "100%",
	height: "400px",
};

const center = {
	lat: 37.437041393899676,
	lng: -4.191635586788259,
};

const GoogleMaps = ({location}:{location?: { lat: number; lng: number }}) => {
	return (
		<LoadScript
			googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
		>
			<GoogleMap mapContainerStyle={containerStyle} center={location} zoom={18}>
				<Marker position={location||center} />
			</GoogleMap>
		</LoadScript>
	);
};

export default GoogleMaps;
