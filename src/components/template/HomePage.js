'use client'
import { useEffect, useState } from "react"
import Tasks from "@/components/module/Tasks"



function HomePage() {

    const [toDos, setToDos] = useState([])

    useEffect(() => {
        fetchToDos()
    } ,[])

    const fetchToDos = async () => {
        const res = await fetch('/api/toDos')
        const data = await res.json()
        console.log("Fetched ToDos:", data)
        if(data.status === 'success'){
            setToDos(data.toDos)
        }
    }

    return (
        <div className="home-page">
            <div className="home-page--todo">
                <p>zu tun</p>
                <Tasks data={toDos.todo} fetchToDos={fetchToDos}  />   
            </div>
            <div className="home-page--inProgress">
                <p>In progress</p>
                <Tasks data={toDos.inProgress} fetchToDos={fetchToDos} />   
            </div>
            <div className="home-page--review">
                <p>review</p>
                <Tasks data={toDos.review} fetchToDos={fetchToDos} />   
            </div>
            <div className="home-page--done">
                <p>done</p>
                <Tasks data={toDos.done} fetchToDos={fetchToDos} />   
            </div>
        </div>
    )
}

export default HomePage
