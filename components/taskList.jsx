import React from 'react';

const TaskList = ({ tasks, updateTaskStatus }) => {
  return (
    <div>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks available.</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} className="flex justify-between items-center bg-gray-100 p-3 mb-2 rounded-lg">
            <div>
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p>{task.time}</p>
            </div>
            <div>
              {task.status === 'active' && (
                <>
                  <button
                    onClick={() => updateTaskStatus(task.id, 'completed')}
                    className="text-green-600 mr-2"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => updateTaskStatus(task.id, 'trash')}
                    className="text-red-600"
                  >
                    Trash
                  </button>
                </>
              )}
              {task.status === 'trash' && (
                <button
                  onClick={() => updateTaskStatus(task.id, 'active')}
                  className="text-blue-600"
                >
                  Restore
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
