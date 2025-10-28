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
        <div>
        Home page
        </div>
    )
}

export default HomePage
