export const sampleTask = {
    id: "",
    title: "",
    description: "",
    date: new Date(),
    time: "",
    reminder: "",
    repeat: "",
    status: "active", // Status can be 'active', 'completed', 'trash'
  };
  
  // Add sample tasks
  export const sampleTasks = [
    {
      id: 1,
      title: "Morning Meeting",
      description: "Team meeting to discuss project progress.",
      date: new Date(), // Today
      time: "09:00",
      reminder: "1_day",
      repeat: "weekly",
      status: "active"
    },
    {
      id: 2,
      title: "Prepare Project Report",
      description: "Create a detailed report on the current project status.",
      date: new Date(new Date().setDate(new Date().getDate() + 2)), // 2 days from today
      time: "14:00",
      reminder: "1_day",
      repeat: "none",
      status: "active"
    },
    {
      id: 3,
      title: "Team Standup",
      description: "Daily team standup meeting.",
      date: new Date(), // Today
      time: "10:00",
      reminder: "1_hour",
      repeat: "daily",
      status: "completed"
    },
    {
      id: 4,
      title: "Review Documentation",
      description: "Review project documentation for accuracy.",
      date: new Date(new Date().setDate(new Date().getDate() + 5)), // 5 days from today
      time: "15:00",
      reminder: "1_day",
      repeat: "none",
      status: "active"
    },
    {
      id: 5,
      title: "Archived Task",
      description: "Review completed tasks.",
      date: new Date(new Date().setDate(new Date().getDate() - 1)), // Yesterday
      time: "13:00",
      reminder: "none",
      repeat: "none",
      status: "trash"
    }
  ];
  