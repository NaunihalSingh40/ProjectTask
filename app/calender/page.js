"use client";

import React, { useState } from "react";
import { sampleTasks } from "@/components/taskSchema";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  getDay,
  isSameMonth,
} from "date-fns";

export default function CalendarPage() {
  const [tasks, setTasks] = useState(sampleTasks);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Move to the previous month
  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Move to the next month
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Render the header with month and navigation buttons
  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrevMonth}
          className="text-lg px-3 py-1 rounded hover:bg-gray-200"
        >
          ‹
        </button>
        <span className="text-2xl font-bold">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button
          onClick={handleNextMonth}
          className="text-lg px-3 py-1 rounded hover:bg-gray-200"
        >
          ›
        </button>
      </div>
    );
  };

  // Render the days of the week
  const renderDaysOfWeek = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return (
      <div className="grid grid-cols-7 gap-2 text-center font-bold mb-4">
        {days.map((day, index) => (
          <div key={index} className="text-gray-700">
            {day}
          </div>
        ))}
      </div>
    );
  };

  // Render the calendar cells for the month
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;

        // Filter tasks for the current day
        const dayTasks = tasks.filter((task) =>
          isSameDay(new Date(task.date), cloneDay)
        );

        days.push(
          <div
            key={day}
            className={`border p-3 rounded-md min-h-[100px] ${
              isSameMonth(day, currentMonth) ? "bg-white" : "bg-gray-100"
            } hover:bg-gray-200`}
          >
            <div className="text-sm font-bold mb-1">
              {format(cloneDay, "d")}
            </div>
            {dayTasks.map((task) => (
              <div
                key={task.id}
                className="bg-blue-100 p-1 rounded mb-1 text-xs"
              >
                {task.title}
              </div>
            ))}
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className="grid grid-cols-7 gap-2 mb-2" key={day}>
          {days}
        </div>
      );

      days = [];
    }

    return <div>{rows}</div>;
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {renderHeader()}
        {renderDaysOfWeek()}
        {renderCells()}
      </div>
    </div>
  );
}
