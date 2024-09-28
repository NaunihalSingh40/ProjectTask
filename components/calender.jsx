import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from "date-fns";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

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
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        days.push(
          <div
            key={day}
            className={`p-2 text-center rounded cursor-pointer ${
              day.getMonth() === currentDate.getMonth() ? "text-black" : "text-gray-400"
            } hover:bg-gray-200`}
            onClick={() => console.log(format(cloneDay, "yyyy-MM-dd"))}
          >
            {formattedDate}
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

  return (
    <div className="w-80 p-4 bg-white rounded-lg shadow-md">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
