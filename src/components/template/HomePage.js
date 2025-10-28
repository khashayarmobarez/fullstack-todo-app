'use client'
import { useEffect, useState } from "react"


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
            </div>
            <div className="home-page--inProgress">
                <p>In progress</p>
            </div>
            <div className="home-page--review">
                <p>review</p>
            </div>
            <div className="home-page--done">
                <p>done</p>
            </div>
        </div>
    )
}

export default HomePage
