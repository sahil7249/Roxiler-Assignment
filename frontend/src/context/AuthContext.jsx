import { createContext, useEffect, useState } from "react";
import { api } from "../api/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user,setUser] = useState(null)
    const [token,setToken] = useState(null)
    const [isLoading,setIsLoading] = useState(true)

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')
        
        if(storedUser && storedToken) {
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
        }
        setIsLoading(false)
    },[])

    const login = async (email,password) => {
        const { token : newToken,user : newUser} = await api.auth.login(email,password)

        console.log(newToken)
        console.log(newUser)

        localStorage.setItem('token',newToken)
        localStorage.setItem('user',JSON.stringify(newUser))

        setToken(null)
        setUser(null)
    }

    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider   value={{user,token,login,logOut,isLoading}}>
            {children}
        </AuthContext.Provider>
    )
};
