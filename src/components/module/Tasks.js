

function Tasks({ data = [] }) {
  return (
    <div className="tasks">
      {
        data.map((task) => (
            <div key={task._id} className="task__card">
                <span className={task.status}></span>
            </div>
        ))
      }
    </div>
  )
}

export default Tasks
