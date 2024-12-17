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
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/fakeAuthContext";
import ProtectedRoutes from "./pages/ProtectedRoutes";

export default function App() {

  return <AuthProvider>
  <CitiesProvider>
  <BrowserRouter>
  <Routes>
    <Route path="product" element={<Product />} />
    <Route index element={<HomePage />}/>
    <Route path="pricing" element={<Pricing />} />
    <Route path="app" element={<ProtectedRoutes><AppLayout /></ProtectedRoutes>} >
        <Route index element={<Navigate to='cities' />} />
        <Route path="cities" element={<CityList />} />
        <Route path="cities/:id" element={<City />} />
        <Route path="countries" element={<CountryList />} />
        <Route path="form" element={<Form />} />
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
  </BrowserRouter>
  </CitiesProvider>
  </AuthProvider>
}
