import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useGeolocation(defaultPosition = null) {
  const [searchParams, setUseSearch] = useSearchParams()
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);
  const mapLat = searchParams.get('lat') ? searchParams.get('lat') : 40
  const mapLng = searchParams.get('lng') ? searchParams.get('lng') : 40
  
    function getPosition() {
      if (!navigator.geolocation)
        return setError("Your browser does not support geolocation");
      console.log(navigator.geolocation.getCurrentPosition)
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
          setIsLoading(false);
        },
        (error) => {
          setError(error.message);
          setIsLoading(false);
        }
      );
    }
    useEffect(function(){
      console.log(position)
    },[position])
    return { isLoading, position, error, getPosition };
  }