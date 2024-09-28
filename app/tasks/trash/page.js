"use client";

import React, { useState } from 'react';
import { sampleTasks } from "@/components/taskSchema";
import TaskList from "@/components/TaskList";

export default function Trash() {
  const [tasks, setTasks] = useState(sampleTasks);

  const updateTaskStatus = (taskId, status) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status } : task));
  };

  const trashTasks = tasks.filter(task => task.status === 'trash');

  return (
    <div className="min-h-screen bg-gray-200 p-6 ml-[300px]">
      <div className="bg-white p-6 rounded-2xl">
        <h1 className="font-bold text-gray-400 text-2xl mb-3">Trash</h1>
        <TaskList tasks={trashTasks} updateTaskStatus={updateTaskStatus} />
      </div>
    </div>
  );
}
