

function Tasks({ data = [] }) {
  return (
    <div className="tasks">
      {
        data.map((task) => (
            <div key={task._id} className="task__card">
                <span className={task.status}></span>
                <h3>{task.title}</h3>
                <p>Status: {task.status}</p> 
            </div>
        ))
      }
    </div>
  )
}

export default Tasks
