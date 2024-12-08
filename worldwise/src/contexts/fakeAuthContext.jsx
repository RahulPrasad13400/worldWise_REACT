const { createContext, useContext, useReducer } = require("react");

function reducer(state, action){
    switch(action.type){
        case 'login':
            return {...state, user : action.payload, isAuthenticated : true}
        case 'logout':
            return {...state, user : null, isAuthenticated : false}
        default:
            throw new Error("Error occured in the fake authentication")
    }
}

const initialState = {
    user : null,
    isAuthenticated : false
}

const AuthContext = createContext()

function AuthProvider({children}){

    const[{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState)

    function login(email,password){
        if(email === FAKE_USER.email && password === FAKE_USER.password){
            dispatch({type : "login", payload : FAKE_USER})
        }
    }

    function logout(){
        dispatch({type : 'logout'})
    }



    return <AuthContext.Provider value={{user,isAuthenticated,login,logout}}>{children}</AuthContext.Provider>
}

function useAuth(){
    const context = useContext(AuthContext)
    if(context === undefined) throw new Error("Auth context was used outside auth provider")
}


export {AuthProvider, useAuth}