"use client";
type AddTaskProps = {
    id?: string;
    handlecancel: () => void;
    refreshTasks: () => Promise<void>;
};

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function AddTask({ id,handlecancel, refreshTasks }: AddTaskProps) {

     const router = useRouter();

     const [isEditingTask, setIsEditingTask] = useState("");
     useEffect(function () {
        if (id) {
            setIsEditingTask(id);
        } else {
            setIsEditingTask("");
        }
        }, [id]);

    
      async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    
        const formData = new FormData(event.currentTarget);
    
        const data = {
          title: formData.get("title"),
          description: formData.get("description"),
          taskAssignedTo: formData.get("taskAssignedTo")
        };

        const url=isEditingTask ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/taskcard/${id}` : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/taskcard`;
    
        const response = await fetch(url, {
          method: isEditingTask ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          
          body: JSON.stringify(data)
        });
        console.log('abhishek')
        const result = await response.json();
        console.log(result);
        console.log(response.ok);
    
        if (response.ok) {
            alert("Task added/edited successfully");
            handlecancel();
            refreshTasks();
        } else {
          alert(result.message || "Failed to add task");
        } 
       
      }

    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black fixed top-0 left-0 w-full h-full z-50 ">
        <div className=" bg-white rounded-lg shadow-md p-4 ">
            <h2 className="text-gray-600 text-xl font-semibold mb-2 text-center">{isEditingTask ? "Edit Task" : "Add New Task"}</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-2 justify-center align-center">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskTitle">
                        Task Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="taskTitle"
                        type="text"
                        placeholder="Enter task title"
                        name="title"
                    />
                </div>
                <div >
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskDescription">
                        Task Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="taskDescription"
                        placeholder="Enter task description"
                        name="description"
                    />
                </div>
                <div >
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignedTo">
                        Assign To
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="assignedTo"
                        type="text"
                        name="taskAssignedTo"
                        placeholder="Enter assignee name"
                    />
                </div>

                <div className="flex justify-center">
                <button
                    className=" bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mr-2"
                    type="submit">
                   {isEditingTask ? "Edit Task" : "Add New Task"}
                </button>
                </div>
                
            </form>
        </div>
         <button
                className="bg-red-500 text-white w-12 h-12 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mt-4 text-xs flex items-center justify-center"
                onClick={handlecancel}>
                Cancel
         </button>
    </div>
    );
}