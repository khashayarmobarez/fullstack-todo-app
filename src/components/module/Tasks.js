import { RiMastodonLine } from "react-icons/ri"; 

function Tasks({ data = [], fetchToDos }) {
  return (
    <div className="tasks">
      {
        data.map((task) => (
            <div key={task._id} className="tasks__card">
                <span className={task.status}></span>
                <RiMastodonLine />
                <h4>{task.title}</h4>
            </div>
        ))
      }
    </div>
  )
}

export default Tasks
