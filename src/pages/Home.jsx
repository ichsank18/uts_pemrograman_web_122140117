import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from '../components/TaskItem';

function Home() {
  const { filteredTasks, loading, error, addTask, setFilter, filter } = useTasks();
  const [newTitle, setNewTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTitle.trim()) {
      addTask(newTitle);
      setNewTitle('');
    }
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
        <h2>Daftar Task</h2>

        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
            <input
            type="text"
            placeholder="Tambah task baru..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            />
            <button type="submit">Tambah</button>
        </form>

        <div className="filter-btns" style={{ marginBottom: '1rem' }}>
            <button onClick={() => setFilter('all')} disabled={filter === 'all'}>Semua</button>
            <button onClick={() => setFilter('todo')} disabled={filter === 'todo'}>Belum</button>
            <button onClick={() => setFilter('done')} disabled={filter === 'done'}>Selesai</button>
        </div>

        {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
        ))}
    </div>

  );
}

export default Home;
