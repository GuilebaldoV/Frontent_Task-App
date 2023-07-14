import { createContext,useContext } from "react";
import { useState } from "react";
import { createTaskRequest, deleteTaskRequest, getTaskRequest, getTasksRequest, updatTaskRequest } from "../api/tasks";
const TaskContext=createContext();



export const useTasks=()=>{
    const context= useContext(TaskContext);
    if(!context){
        throw new Error("useTasks mus be used within a TaskProvide")
    }
    return context
}

export function TaskProvider({children}){
    const [tasks, setTasks] = useState([]);    
    
    const createTask=async(task)=>{
        const res=await createTaskRequest(task)
        console.log(res)
    }

    const getTasks=async()=>{
        
        try {
            const res=await getTasksRequest()
            setTasks(res.data)
        } catch (error) {
            console.error(error)
        }
        
    }
    const deleteTask=async(id)=>{
        try {
            const res=await deleteTaskRequest(id)
            console.log(res,"rees")
            
        } catch (error) {
            console.log(error)
        }

    }

    const getTask=async(id)=>{
        try {
            const res=await getTaskRequest(id)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const updateTask=async(id,task)=>{
        try {
            await updatTaskRequest(id,task)
        } catch (error) {
            console.log(error)
        }

    }


    
    return (
        <TaskContext.Provider value={{tasks,updateTask,setTasks,getTasks,createTask,deleteTask,getTask}}>
            {children}
        </TaskContext.Provider>
    )
}



