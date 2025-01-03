import Spinner from './Spinner'
import CityItem from './CityItem'
import Message from './Message'
import styles from './CityList.module.css'
import { useCities } from '../contexts/CitiesContext'
function CityList() {
  const {cities, isLoading} = useCities()
    if(isLoading) return <Spinner />
    if(!cities.length) return <Message message='Click on the Map to add your First City'/>
  return (
    <ul className={styles.CityList}>
      {cities?.map(city=><CityItem key={city.id} city={city} />)}
    </ul>
  )
}

export default CityList
