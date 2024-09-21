import "./Map.scss";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useEffect } from "react";
import { BiExpandAlt } from "react-icons/bi";

function Map({trailData}) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        // googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });

    const [activeMarker, setActiveMarker] = useState(null);

    // useEffect(() => {
    //     if (isLoaded) {
    //         console.log("Google Maps script loaded successfully");
    //     }
    // }, [isLoaded]);

    const handleOnLoad = (map) => {
        console.log("Map loaded");
        const bounds = new window.google.maps.LatLngBounds();
        trailData.forEach(({position}) => {bounds.extend(position)});
        map.fitBounds(bounds);
    };

    const handleMarkerClick = (markerId) => {
        setActiveMarker(markerId === activeMarker ? null : markerId);
    };

    if (loadError) {
        return <div>Error loading maps</div>;
    }
    if (!isLoaded) {
        return <div>Loading maps</div>;
    }
    
    return (
        <div className="map">
            <GoogleMap 
                mapContainerClassName="map-container"
                onLoad={handleOnLoad}
                onClick={() => handleMarkerClick(null)}
            >
                {trailData.map(({id, name, position}) => (
                    <Marker 
                        key={id}
                        position={position}
                        onClick={() => handleMarkerClick(id)}
                    >
                        {activeMarker === id ? (
                            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                <h3>{name}</h3>
                            </InfoWindow>
                        ) : null}
                    </Marker>
                ))}
            </GoogleMap>
        </div>
    );
}

export default Map;