import { RiMastodonLine } from "react-icons/ri"; 
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

function Tasks({ data = [], fetchToDos, back, next }) {

  const changeStatus = async (id, status) => {
    const res = await fetch("/api/toDos", {
      method: "PATCH",
      body: JSON.stringify({id, status}),
      headers: { "content-type" : "application/json"}
    })

    const data = await res.json();
    if(data.status === "success") fetchToDos();
  }

  return (
    <div className="tasks">
      {
        data.map((task) => (
            <div key={task._id} className="tasks__card">
                <span className={task.status}></span>
                <RiMastodonLine />
                <h4>{task.title}</h4>
                <div>
                  {
                    back ? (<button className="button-back" onClick={() => changeStatus(task._id, back)}><BiLeftArrow/> back</button>) : null
                  }
                  {
                    next ? (<button className="button-next" onClick={() => changeStatus(task._id, next)}>next <BiRightArrow/></button>) : null
                  }
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default Tasks
