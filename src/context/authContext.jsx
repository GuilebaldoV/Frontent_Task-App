
import { useState,createContext, useContext } from "react";
import { registerRequest,loginRequest, verifyTokenRequest } from "../api/auth";
import { useEffect } from "react";
import Cookies from 'js-cookie'
// creamos un contexto para el usuario
export const authContext= createContext();

// hook que facilita la vida
export const useAuth=()=>{
    const context=useContext(authContext);
    if(!context) throw new Error("useAuth must be used within an auhtprovider")
    return context;
}

export const AuthProvider=({children})=>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors,setErrors]=useState([])
    // para manejar mejor la asincronia
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if(errors.length>0){
            const time=setTimeout(() => {
                setErrors([])
            }, 5000);
            return()=>clearTimeout(time)
        }
    },[errors])

    useEffect(()=>{
       
        const checkLogin=async()=>{
            const cookies=Cookies.get()
            console.log(cookies)
            if(cookies.token){
                try {
                    const res=await verifyTokenRequest(cookies.token)
                    if(!res.data) setIsAuthenticated(false)
                    setIsAuthenticated(true)
                    setUser(res.data)
                } catch (error) {
                    setUser(null)
    
                    console.log(error,"VerifyError")
                    // setErrors(error)
                }
            }
            setIsLoading(false)
        }
        checkLogin()


    },[])

    const logout=async()=>{
        Cookies.remove('token')
        setIsAuthenticated(false)
        setUser(null)
    }

    const signup=async(user)=>{ 
        try {
            const res= await registerRequest(user);
            setUser(user)
            setIsAuthenticated(true)
            console.log(isAuthenticated,"cambio")
        } catch (error) {
            // handlear todos los errorrs
            console.log("errores",error.response.data)
            setErrors(error.response.data)
            console.log(errors,"seterrros")
        }

    };

    const signin=async(user)=>{ 
        try {
            const res= await loginRequest(user);
            setIsAuthenticated(true)
            setUser(res.data)
            console.log(res)
            console.log(isAuthenticated,"cambio")
        } catch (error) {
            // handlear todos los errorrs
            console.log("errores",error.response.data)
            setErrors(error.response.data)
            console.log(errors,"seterrros")

        }

    };


    return (
        <authContext.Provider value={{
            signup,logout,user,isLoading,signin,isAuthenticated,errors
        }}>
        {children}
        </authContext.Provider>
    )



}

