import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";
const ProtectedRoute = () => {
    const {user,isAuthenticated,isLoading}=useAuth()
    console.log(isAuthenticated,"IS??")
    
    if(isLoading) return <>Cargandoo</>
    
    if (!isAuthenticated)return <Navigate to="/login" replace></Navigate>
    return ( <Outlet></Outlet>);
}
 
export default ProtectedRoute;