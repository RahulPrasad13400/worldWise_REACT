import { useNavigate, useSearchParams } from 'react-router-dom'
import {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent  } from 'react-leaflet'
import styles from './Map.module.css'
import { useEffect, useState } from 'react'
import { useCities } from '../contexts/CitiesContext'
import { useGeolocation } from '../../hooks/useGeolocation'
import Button from './Button'

export default function Map() {
  const {cities} = useCities()
  const {isLoading : isLoadingPosition, position : geoLocationPosition, getPosition} = useGeolocation()
  const [mapPosition, setMapPosition] = useState([40,40])
  const [searchParams, setUseSearch] = useSearchParams()
  const mapLat = searchParams.get('lat') ? searchParams.get('lat') : 40
  const mapLng = searchParams.get('lng') ? searchParams.get('lng') : 0

  useEffect(function(){
    if(mapLat, mapLng) setMapPosition([mapLat, mapLng])
  },[mapLat,mapLng])

  useEffect(function(){
    if(geoLocationPosition){
      console.log("hello myre")
      setMapPosition(geoLocationPosition.lat, geoLocationPosition.lng)
    } 
  },[geoLocationPosition])

  return (
    <div className={styles.mapContainer}>
      <Button type='position' onClick={getPosition}>{isLoadingPosition ? 'Loading...' : 'Use your current Position'}</Button>
        <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true}  className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {cities.map(city=><Marker position={[city.position.lat, city.position.lng]} key={city.id}>
      <Popup>
        <span>{city.emoji}</span><span>{city.cityName}</span>
      </Popup>
    </Marker>)}
    <ChangeCenter position={[mapLat, mapLng]} />
    <DetectClick />
  </MapContainer>
    </div>
  )
}

function ChangeCenter({position}){
  const map = useMap()
  map.setView(position)
  return null
}

function DetectClick(){ 
  const navigate = useNavigate()

  useMapEvent({
    click : (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)

  })
}
