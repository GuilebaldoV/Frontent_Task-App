import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
    
    const {register,handleSubmit,formState:{errors}}=useForm()
    // usando auth
    const {signup,signin,errors:registerErrors,user,isAuthenticated}=useAuth();
    // si esta autenticado cambiaaa
    const navigate=useNavigate()
    useEffect(()=>{
        console.log("??",isAuthenticated)
        if(isAuthenticated){
            navigate('/tasks')
        }
    },[isAuthenticated])


    return ( <>
    <div className='flex items-center h-[calc(100vh-100px)] justify-center '>


        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {
            registerErrors.map((error,i)=>( 
                <div className='bg-red-500 p-2 text-white ' key={i}>
                    {error}
                </div>
            ))
        }
        <h1 className="text-2xl font-bold text-white">Login</h1>
        <form onSubmit={handleSubmit(async values=>{
        signin(values);
    })}>
        {/* le dejjamos todo al hook.... */}
        {errors.email && (<p className='text-red-500'>email is required</p>)}
        <input className='w-full bg-zinc-700 text-white px-4 py-2 
        rounded-md my-2' placeholder='Email'  type="email" name="email" {...register("email",{required:true})}></input>

        {errors.password && (<p className='text-red-500'>Password is required</p>)}
        <input className='w-full bg-zinc-700 text-white px-4 py-2 
        rounded-md my-2' placeholder='password'  type="password" name="password" {...register("password",{required:true})}></input>



        <button className="text-white">Login</button>
    </form>
    <p className="flex gap-x-2 justify-between text-white">
        Don´t have an account? <Link className="text-sky-500"  to="/register">Sing up</Link>
    </p>
        </div>


        </div>
    </> );

}
 
export default LoginPage;