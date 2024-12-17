import { useState, useEffect, createContext, useContext, useReducer, useCallback } from "react"

const CitiesContext = createContext()
const BASE_URL = 'http://localhost:7000/cities'

const initialState = {
  cities : [],
  isLoading : false, 
  currentCity : {},
  error : ""
}

function reducer(state, action){
  switch(action.type){
    case 'loading':
      return {...state, isLoading : true}
    case 'cities/loaded':
      return {...state, isLoading : false , cities : action.payload}
    case 'city/loaded':
      return {...state, isLoading : false, currentCity : action.payload}
    case 'cities/created':
      return {...state, isLoading : false, cities : [...state.cities, action.payload], currentCity : action.payload}
    case 'cities/deleted':
      return {...state, isLoading : false, cities : state.cities.filter(city=>city.id !== action.payload)}
    case 'rejected':
      return {...state, isLoading : false, error : action.payload}
    default:
      throw new Error("unknown action occured")
      
  }
}

function CitiesProvider({children}){
  const [{cities, isLoading, currentCity}, dispatch] = useReducer(reducer,initialState)

    // const [cities, setCities] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    // const [currentCity, setCurrentCity] = useState({})

    useEffect(function(){
      async function fetchCities() {
        dispatch({type : 'loading'})
        try{
          const res = await fetch(`${BASE_URL}`)
          const data = await res.json()
          dispatch({type : "cities/loaded", payload : data})
        }catch(err){
          dispatch({type : "rejected", payload : "Error occured in fetchCities"})
        }
      }
      fetchCities()
    },[])

const getCity = useCallback( async function getCity(id){
  if(Number(id) === currentCity.id) return
  dispatch({type : "loading"})
  try{
    const res = await fetch(`${BASE_URL}/${id}`)
    const data = await res.json()
    dispatch({type : 'city/loaded', payload : data})
  }catch(err){
    dispatch({type : "rejected", payload : "Error occured in getCity"})
  }
},[currentCity.id])

async function createCity(newCity){
  dispatch({type : "loading"})
  try{
    const res = await fetch(`${BASE_URL}`,{
      method : "POST",
      body : JSON.stringify(newCity),
      headers : {
        "Content-Type" : "application/json"
      }
    })
    const data = await res.json()
    dispatch({type : 'cities/created', payload : data})
  }catch(err){
    dispatch({type : "rejected", payload : "Error occured in createCity"})
  }
}

async function deleteCity(id){
  dispatch({type : "loading"})
  try{
    await fetch(`${BASE_URL}/${id}`,{
      method : "DELETE"
    })
    dispatch({type : 'cities/deleted', payload : id})
  }catch(err){
    dispatch({type : "rejected", payload : "Error occured in deleteCity"})
  }
}

    return <CitiesContext.Provider value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity
    }}>
        {children}
    </CitiesContext.Provider>
}

function useCities(){
    const context = useContext(CitiesContext)
    return context
}

export {CitiesProvider, useCities}