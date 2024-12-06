import { useState, useEffect, createContext, useContext } from "react"

const CitiesContext = createContext()
const BASE_URL = 'http://localhost:7000/cities'

function CitiesProvider({children}){

    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentCity, setCurrentCity] = useState({})

    useEffect(function(){
      async function fetchCities() {
        try{
          setIsLoading(true)
          const res = await fetch(BASE_URL)
          const data = await res.json()
          setCities(data)
        }catch(err){
          console.log("There was an error occured during fetching the cities")
        }finally{
          setIsLoading(false)
        }
      }
      fetchCities()
    },[])

async function getCity(id){
  try{
    setIsLoading(true)
    const res = await fetch(`${BASE_URL}/${id}`)
    const data = await res.json()
    console.log(data)
    setCurrentCity(data)
  }catch(err){
    console.log("There was an error occured during getCity")
  }finally{
    setIsLoading(false)
  }
}

    return <CitiesContext.Provider value={{
        cities,
        isLoading,
        currentCity,
        setCurrentCity,
        getCity
    }}>
        {children}
    </CitiesContext.Provider>
}

function useCities(){
    const context = useContext(CitiesContext)
    return context
}

export {CitiesProvider, useCities}