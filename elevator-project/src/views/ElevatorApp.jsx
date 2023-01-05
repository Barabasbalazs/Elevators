import { useState } from 'react'
import Floor from '../components/Floor'
import '../styles/ElevatorApp.css'

const ElevatorApp = () => {
  const [count, setCount] = useState(0)

  const [floors] = useState([6, 5, 4, 3, 2, 1, 0])

  return (
    <div className="flex justify-center">
      <div className="w-full h-screen">
        {floors.map((index) => {
          return <Floor index={index}/>; 
        })}
      </div>
    </div>
  )
}

export default ElevatorApp;
