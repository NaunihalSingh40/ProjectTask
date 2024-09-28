"use client";

import React, { useState } from 'react';
import { IoIosTimer } from "react-icons/io";
import { LuAlarmClock } from "react-icons/lu";
import { IoIosRepeat } from "react-icons/io";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isToday } from "date-fns";
import { sampleTasks, sampleTask } from "@/components/taskSchema";
import TaskList from "@/components/TaskList";

export default function Page() {
  const [tasks, setTasks] = useState(sampleTasks);
  const [showAddTask, setShowAddTask] = useState(false);
  const [formData, setFormData] = useState({ ...sampleTask });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Add Task Function
  const addTask = () => {
    if (!formData.title) {
      alert("Please enter a task title.");
      return;
    }
    setTasks([...tasks, { ...formData, id: tasks.length + 1, date: selectedDate }]);
    setShowAddTask(false);
  };

  // Handle status change (Completed, Trash)
  const updateTaskStatus = (taskId, status) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status } : task));
  };

  // Calendar logic for the modal
  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-lg px-2 py-1 rounded hover:bg-gray-200">‹</button>
        <span className="text-xl font-bold">{format(currentDate, "MMMM yyyy")}</span>
        <button onClick={handleNextMonth} className="text-lg px-2 py-1 rounded hover:bg-gray-200">›</button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    return (
      <div className="grid grid-cols-7 gap-1 text-center font-bold mb-1">
        {days.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        days.push(
          <div
            key={day}
            className={`p-2 text-center rounded cursor-pointer ${
              day.getMonth() === currentDate.getMonth() ? "text-black" : "text-gray-400"
            } hover:bg-gray-200 ${format(cloneDay, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd") ? "bg-blue-200" : ""}`}
            onClick={() => setSelectedDate(cloneDay)}
          >
            {format(day, "d")}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1 mb-1" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  // Filters for Today tasks
  const todayTasks = tasks.filter(task => isToday(task.date) && task.status === 'active');

  return (
    <div className="min-h-screen bg-gray-200 p-6 ml-[300px]">
      <div className="bg-white p-6 rounded-2xl mb-6">
        <h1 className="font-bold text-gray-400 text-2xl mb-3">Today</h1>
        <TaskList tasks={todayTasks} updateTaskStatus={updateTaskStatus} />
        <button
          className="mt-4 border-none px-4 py-2 bg-blue-600 text-white font-semibold rounded"
          onClick={() => setShowAddTask(true)}
        >
          + Add Task
        </button>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md text-blue-950 w-96 h-5/6 overflow-scroll">
            <div className="mb-4">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Task Title"
                className="border border-gray-300 p-2 rounded-lg w-full mb-4"
              />
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Task Description"
                className="border border-gray-300 p-2 rounded-lg w-full mb-4"
              />
              <div className="w-80 p-4 bg-white rounded-lg shadow-md mb-4">
                {renderHeader()}
                {renderDays()}
                {renderCells()}
              </div>
              <div className="mb-4">
                <div className="mb-2">
                  <IoIosTimer className="inline-block mr-2" />
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="border border-gray-300 p-2 rounded-lg w-full"
                  >
                    <option value="">Select Time</option>
                    {Array.from({ length: 48 }).map((_, index) => {
                      const hour = Math.floor(index / 2);
                      const minutes = index % 2 === 0 ? "00" : "30";
                      return (
                        <option key={index} value={`${hour}:${minutes}`}>
                          {`${hour.toString().padStart(2, "0")}:${minutes}`}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-2">
                  <LuAlarmClock className="inline-block mr-2" />
                  <select
                    value={formData.reminder}
                    onChange={(e) => setFormData({ ...formData, reminder: e.target.value })}
                    className="border border-gray-300 p-2 rounded-lg w-full"
                  >
                    <option value="">Select Reminder</option>
                    <option value="1_day">1 Day Ahead</option>
                    <option value="1_week">1 Week Ahead</option>
                    <option value="custom">Custom...</option>
                  </select>
                </div>
                <div className="mb-4">
                  <IoIosRepeat className="inline-block mr-2" />
                  <select
                    value={formData.repeat}
                    onChange={(e) => setFormData({ ...formData, repeat: e.target.value })}
                    className="border border-gray-300 p-2 rounded-lg w-full"
                  >
                    <option value="">Select Repeat</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="custom">Custom...</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-gray-200 p-2 rounded"
                onClick={() => {
                  setShowAddTask(false);
                }}
              >
                Clear
              </button>
              <button
                className="bg-blue-600 text-white p-2 rounded"
                onClick={addTask}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
