// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import Button from "./Button";
import styles from "./Form.module.css";
import BackButton from "./BackButton";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Message from './Message'
import Spinner from './Spinner'
import { useCities } from '../contexts/CitiesContext';
import { useNavigate } from 'react-router-dom';
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate()
  const [mapLat, mapLng] = useUrlPosition()
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("")
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false)
  const [geoCodingError, setGeoCodingError] = useState("")
  const {createCity} = useCities()

  useEffect(function(){
    async function fetchCityData(){
      try{
        if(!mapLat && !mapLng) return 
        setIsLoadingGeoCoding(true)
        setGeoCodingError("")
        const res = await fetch(`${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`)
        const data = await res.json() 
        if(!data.countryCode) throw new Error("That dosent seems to be a city, click somewhere else")
        setCityName(data.city || data.locality || "")
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))
      }catch(err){
        console.log("Error occured at the Form on the fetchCityData")
        setGeoCodingError(err.message)
      }finally{
        setIsLoadingGeoCoding(false)
      }
    }
    fetchCityData()

  },[mapLat,mapLng])

  async function handleSubmit(e){
    e.preventDefault()
    if(!cityName || !date) return 

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position : {lat : mapLat,lng : mapLng} 
    }
    await createCity(newCity)
    navigate('/app')
  }

  if(isLoadingGeoCoding) return <Spinner />
  if(!mapLat && !mapLng) return <Message message='Start by clicking somewhere on the map' />
  if(geoCodingError) return <Message message={geoCodingError} />

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat='dd/MM/yyyy' />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
