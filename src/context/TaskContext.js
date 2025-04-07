export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all'); // 'all' | 'done' | 'todo'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then((res) => {
          if (!res.ok) throw new Error('Gagal fetch data');
          return res.json();
        })
        .then((data) => {
          setTasks(data.slice(0, 10));
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, []);
  
    const toggleTaskStatus = (id) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    };
  
    const addTask = (title) => {
      const newTask = {
        userId: 1,
        id: Date.now(),
        title,
        completed: false,
      };
      setTasks((prev) => [newTask, ...prev]);
    };
  
    const filteredTasks = tasks.filter((task) => {
      if (filter === 'done') return task.completed;
      if (filter === 'todo') return !task.completed;
      return true;
    });
  
    return (
      <TaskContext.Provider
        value={{ tasks, loading, error, filteredTasks, toggleTaskStatus, addTask, setFilter, filter }}
      >
        {children}
      </TaskContext.Provider>
    );
  }
  