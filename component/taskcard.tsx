"use client";
import { useEffect, useState } from "react";
import AddTask from "./addtask";
import {jwtDecode} from "jwt-decode"

type TaskCardProps = {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
    refreshTasks: () => Promise<void>; 
    addBy:string;
}

async function deleteCard(id : TaskCardProps["id"],refreshTasks: TaskCardProps["refreshTasks"]) { 
    try {
    let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/taskcard/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`,
        },
    });
    let result = await response.json();
    if (response.ok) {
        refreshTasks();
        alert(result.message || "Task deleted successfully");
    } else {   
      alert(result.message || "Failed to delete task");
    }
     } catch (error) {
      console.error(error);
      alert("Server error");
    }
}


export default function TaskCard({id, title, description, assignedTo, refreshTasks,addBy}: TaskCardProps) {
   
    const [taskId, setTaskId] = useState("");
    const [isEditingTask, setIsEditingTask] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(function(){
       let token= localStorage.getItem("token");

       if(token){
        try {
            const decode:any= jwtDecode(token)
            console.log(decode);
            if(decode.id==addBy){
                setIsOwner(true);
            }
        }catch(err){
            console.error('invalid token',err)
        }
       }
    },[addBy])
    return (
        <>
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-gray-600 text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 mb-4 bg-gray-100 p-2 rounded">
                {description}
            </p>
            <span className="text-sm text-gray-500">Assigned to: {assignedTo}</span>
            {isOwner ? (
            <div className="flex justify-between items-center">
                <button className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={ () => {setTaskId(id); setIsEditingTask(true)}}>
                    Edit
                </button>
                <button className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500" onClick={ () => deleteCard(id, refreshTasks)}>
                    Delete
                </button>
            </div>)
          :(null)}
        </div>
        {isEditingTask && <AddTask handlecancel={() => setIsEditingTask(false)}  refreshTasks={refreshTasks} id={taskId}/>}
        </>
    );
}