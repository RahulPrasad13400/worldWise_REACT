import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'

export default function Map() {
  const [useSearch, setUseSearch] = useSearchParams()
  const navigate = useNavigate()
  const lat = useSearch.get('lat')
  const lng = useSearch.get('lng')
  return (
    <div className={styles.mapContainer} onClick={()=>navigate('form')}>
      MAP
      <h1>position lat : {lat}</h1>
      <h1>position lat : {lng}</h1>
      <button onClick={()=>{
        setUseSearch({lat : 20, lng :20})
      }}>Fuck me</button>
    </div>
  )
}
