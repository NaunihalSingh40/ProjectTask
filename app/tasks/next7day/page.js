"use client";

import React, { useState } from 'react';
import { sampleTasks } from "@/components/taskSchema";
import TaskList from "@/components/TaskList";
import { isThisWeek } from "date-fns";

export default function Next7Days() {
  const [tasks, setTasks] = useState(sampleTasks);

  const updateTaskStatus = (taskId, status) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status } : task));
  };

  const next7DaysTasks = tasks.filter(task => isThisWeek(task.date) && task.status === 'active');

  return (
    <div className="min-h-screen bg-gray-200 p-6 ml-[300px]">
      <div className="bg-white p-6 rounded-2xl">
        <h1 className="font-bold text-gray-400 text-2xl mb-3">Next 7 Days</h1>
        <TaskList tasks={next7DaysTasks} updateTaskStatus={updateTaskStatus} />
      </div>
    </div>
  );
}
