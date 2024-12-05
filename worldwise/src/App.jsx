import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from './pages/AppLayout'
import Login from "./pages/Login";
import CityList from "./components/CityList";
import City from "./components/City"
import CountryList from "./components/CountryList";
import Form from './components/Form';

const BASE_URL = 'http://localhost:8000/cities'

export default function App() {

  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(function(){
    async function fetchCities() {
      try{
        setIsLoading(true)
        const res = await fetch(BASE_URL)
        const data = await res.json()
        setCities(data)
      }catch(err){
        alert("There was an error loading data")
      }finally{
        setIsLoading(false)
      }
    }
    fetchCities()
  },[])

  return <BrowserRouter>
  <Routes>
    <Route path="product" element={<Product />} />
    <Route index element={<HomePage />}/>
    <Route path="pricing" element={<Pricing />} />
    <Route path="app" element={<AppLayout />} >
        <Route index element={<Navigate to='cities' />} />
        <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
        <Route path="cities/:id" element={<City />} />
        <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
        <Route path="form" element={<Form />} />
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
  </BrowserRouter>
}
