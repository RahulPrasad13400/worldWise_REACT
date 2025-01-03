import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/fakeAuthContext"
import { useEffect } from "react"

export default function ProtectedRoutes({children}) {
    const {isAuthenticated} = useAuth()
    const navigate = useNavigate()
    useEffect(function(){
        if(!isAuthenticated) navigate('/')
    },[isAuthenticated,navigate])
    return isAuthenticated ? children : null
  }
  