import {useForm} from 'react-hook-form'
import { registerRequest } from '../api/auth';
import { useAuth } from '../context/authContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const {register,handleSubmit,formState:{errors}}=useForm()
    // usando auth
    const {signup,errors:registerErrors,user,isAuthenticated}=useAuth();
    // si esta autenticado cambiaaa
    const navigate=useNavigate()
    useEffect(()=>{
        console.log("??",isAuthenticated)
        if(isAuthenticated){
            navigate('/tasks')
        }
    },[isAuthenticated])


    return ( <>
    <div className=' bg-zinc-800 max-w-md p-10 rounded-md'>

        {
            registerErrors.map((error,i)=>( 
                <div className='bg-red-500 p-2 text-white ' key={i}>
                    {error}
                </div>
            ))
        }

    <form onSubmit={handleSubmit(async values=>{
        signup(values)
    })}>
        {/* le dejjamos todo al hook.... */}
        {errors.username && (<p className='text-red-500'>Username is required</p>)}
        <input className='w-full bg-zinc-700 text-white px-4 py-2 
        rounded-md my-2' placeholder='username'  type="text" name="username" {...register("username",{required:true})}></input>
        {errors.email && (<p className='text-red-500'>email is required</p>)}
        <input className='w-full bg-zinc-700 text-white px-4 py-2 
        rounded-md my-2' placeholder='Email'  type="email" name="email" {...register("email",{required:true})}></input>
        {errors.password && (<p className='text-red-500'>Password is required+</p>)}
        <input className='w-full bg-zinc-700 text-white px-4 py-2 
        rounded-md my-2 ' placeholder='password'  type="password" name="password" {...register("password",{required:true})}></input>




        <button>Register</button>
    </form>
        </div>
    </> );
}
 
export default RegisterPage;