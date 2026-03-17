"use client";

import TaskCard from "./taskcard";
import AddTask from "./addtask";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function Home() {

  type Task = {
  _id: string;
  title: string;
  description: string;
  status: string;
  taskAssignedTo: string;
};

const [tasks, setTasks] = useState(false);
const [getTasks, setGetTasks] = useState<Task[]>([]);

  function handleAddTask() {
    setTasks(!tasks);
  }

  function handleCancel() {
    setTasks(false);
  }


  async function fetchTasks() {
        try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/taskcard`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setGetTasks(result.data);
      } else {
        alert(result.message || "Failed to fetch tasks");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  }


  useEffect(function () {
    fetchTasks();
  }, []);

  
function handleDragEnd(result:any){

if(!result.destination) return

const taskId = result.draggableId
const newStatus = result.destination.droppableId

const updatedTasks = getTasks.map((task) =>
    task._id === taskId ? { ...task, status: newStatus } : task
  );

  setGetTasks(updatedTasks);

updateTaskStatus(taskId,newStatus)
}

async function updateTaskStatus(id:string,status:string){

await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/taskcard/${id}`,{
method:"PUT",
headers:{
"Content-Type":"application/json",
authorization:`Bearer ${localStorage.getItem("token")}`
},
body:JSON.stringify({status})
})
}

  return (
    <>
      <div className=" container mx-auto p-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">My Todo App</h1>

        <div className="flex justify-start w-full mb-4">
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
          onClick={handleAddTask }
        >
          Add Task
        </button>

        <button
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4 ml-2"
          onClick={fetchTasks}
        >
          Refresh Tasks
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mb-4 ml-auto"
          onClick={() => {
            window.location.href = "/";
            localStorage.removeItem("token");
          }}
        >
          Logout
        </button>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>

        <table className=" border-collapse table-fixed  w-250" >
          <thead>
            <tr>
              <th className="text-center text-gray-600">To Do</th>
              <th className="text-center text-gray-600">In Progress</th>
              <th className="text-center text-gray-600">Done</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              
                <td className=" p-2 w-1/3 h-[400px] align-top ">
                <Droppable droppableId="To Do">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} style={{minHeight:"400px"}}>
                    
              {getTasks
                .filter((task) => task.status === "To Do")
                .map((task, index) => (
                     
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                        
                    <TaskCard
                      key={task._id}
                      id={task._id}
                      title={task.title}
                      description={task.description}
                      assignedTo={task.taskAssignedTo}
                      refreshTasks={fetchTasks}
                    />
                    </div>
                    )}
                    </Draggable>
                ))}
                {provided.placeholder}
                </div>
                )}
                </Droppable>
                </td>

                
                  <td className=" p-2 w-1/3 h-[400px] align-top ">
                    <Droppable droppableId="In Progress">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} style={{minHeight:"400px"}}>
              {getTasks
                .filter((task) => task.status === "In Progress")
                .map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <TaskCard
                      key={task._id}
                      id={task._id}
                      title={task.title}
                      description={task.description}
                      assignedTo={task.taskAssignedTo}
                      refreshTasks={fetchTasks}
                    />
                    </div>
                    )}
                    </Draggable>
                  
                ))}
                {provided.placeholder}
                </div>
                )}
                </Droppable>
                  </td>

            <td className=" p-2 w-1/3 h-[400px] align-top ">
            <Droppable droppableId="Done">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} style={{minHeight:"400px"}}>

              {getTasks
                .filter((task ) => task.status === "Done")
                .map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>

                    <TaskCard
                        key={task._id}
                        id={task._id}
                      title={task.title}
                      description={task.description}
                      assignedTo={task.taskAssignedTo}
                      refreshTasks={ fetchTasks}
                    />
                    </div>
                    )}
                    </Draggable>
                ))}
                {provided.placeholder}
                </div>
                )}
                </Droppable>
                </td>
            </tr>
          </tbody>
        </table>
        </DragDropContext>
      </div>

      {tasks && <AddTask handlecancel={handleCancel} refreshTasks={fetchTasks} />}
    </>
  );
}
