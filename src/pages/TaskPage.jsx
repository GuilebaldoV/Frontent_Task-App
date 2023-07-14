// import { useTasks } from "../context/TasksContext";
import { Navigate, useNavigate } from 'react-router-dom'
import { useTasks } from '../context/TaskContext'
import {useEffect} from 'react'
const TaskPage = () => {
    const navigate=useNavigate()
    
    const {getTasks,tasks,setTasks,deleteTask}=useTasks()
    useEffect(() => {
        getTasks()
    }, []);

    console.log(tasks)

    const handleDeleteTask=(id)=>{
        deleteTask(id)
        const updatedTasks = tasks.filter(task => task._id !== id);
        setTasks(updatedTasks)

    }

    const handleUpdateTask=(id)=>{
        navigate(`/tasks/${id}`)
    }

    if(tasks.length==0) return <div>No taks</div>
    return ( 
    <div className='flex flex-col justify-center items-center'>
        {tasks.map((task)=>( 
            <div className='bg-zinc-800 px-4 m-2 w-3/5  py-4 text-white flex justify-between' key={task._id}>
                    <div>
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                    <p>{new Date(task.updatedAt).toLocaleDateString()}</p>
                    </div>
                <div className='align-center'>
                    <button className="bg-red-500 px-4 py-1 rounded-sm" onClick={() => handleDeleteTask(task._id)}>Delete</button>
                    <button className="bg-indigo-500 px-4 py-1 rounded-sm" onClick={()=>handleUpdateTask(task._id)}>Update</button>
                </div>
            </div>

        ))}


    </div>);
}
 
export default TaskPage;
