import { useTasks } from '../context/TaskContext';

function TaskItem({ task }) {
    const { toggleTaskStatus } = useTasks();
  
    return (
      <div className={`task-item ${task.completed ? 'done' : ''}`}>
        <h4>{task.title}</h4>
        <p>Status: {task.completed ? 'Selesai ✅' : 'Belum selesai ❌'}</p>
        <button onClick={() => toggleTaskStatus(task.id)}>
          Tandai {task.completed ? 'Belum' : 'Selesai'}
        </button>
      </div>
    );
  }
  

export default TaskItem;
