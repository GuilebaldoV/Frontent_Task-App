import {useForm} from 'react-hook-form'
import { useTasks } from '../context/TaskContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
const TaskFormPage = () => {
    const {register,handleSubmit,setValue}=useForm()
    const {tasks,createTask,getTask,updateTask}=useTasks()
    const navigate=useNavigate()
    const params=useParams()

    useEffect(() => {

        const loadTask=async()=>{
            if(params.id){
                const task=await getTask(params.id)
                console.log(task,"taasks")
                setValue('title',task.title)
                setValue('description',task.description)
            }


        }
        loadTask()

    }, []);

    const onSubmit=handleSubmit((data)=>{
        if(params.id){
            updateTask(params.id,data)
        }else{
            createTask(data)
        }
        navigate('/tasks')
        
    })

    return ( 
        <div className='flex justify-center m-8 items-center'>

    <div className='bg-zinc-800  my-2 max-w-md w-full p-10 rounded-md '>
    <form onSubmit={onSubmit} action="">
        <input type="text" placeholder="Title"
        {...register("title")}
        autoFocus
        className='w-full bg-zinc-700 my-2 text-white px-4 py-2 rounded-md'
        />
        <textarea rows="3" placeholder="Description"
        {...register("description")}
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md'
        ></textarea>
        <button className='text-white'>Save</button>

    </form>
    
    </div> 
        </div>
    );
}
 
export default TaskFormPage;