import { useSearchParams } from "react-router-dom"

export function useUrlPosition(){
    const [searchParams, setUseSearch] = useSearchParams()
    const mapLat = searchParams.get('lat') ? searchParams.get('lat') : 40
    const mapLng = searchParams.get('lng') ? searchParams.get('lng') : 0

    return [mapLat, mapLng]
}

