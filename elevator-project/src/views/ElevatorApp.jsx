import { useState, useEffect } from 'react'
import Floor from '../components/Floor'
import '../styles/ElevatorApp.css'

const ElevatorApp = () => {

  const [floors, setFloors] = useState([6, 5, 4, 3, 2, 1, 0])

  const [left, setLeft] = useState({
    pos: 0
  })

  const [right, setRight] = useState({
    pos: 6
  })

  const floorButtonPush = (floorNumber, buttonClicked) => {
    console.log(`On floor = ${floorNumber} clicked button = ${buttonClicked}`);
  }

  const elavatorButtonPush = async (side, floorPos, buttonClicked) => {
    if (side === 'left') {
      console.log(`Left is going: ${buttonClicked}`);
      setLeft({
        pos: buttonClicked
      });
    } else if (side === 'right') {
      console.log(`Right is going: ${buttonClicked}`);
      setRight({
        pos: buttonClicked
      });
    }
  } 

  return (
    <div className="flex justify-center">
      <div className="w-full h-screen">
        {floors.map((index) => {
            return <Floor 
                    index={index}
                    floors={floors}
                    key={index}
                    leftOnFloor={true}
                    rightOnFloor={true}
                    elevatorCallBack={elavatorButtonPush}
                    floorCallBack={floorButtonPush}
                    right={right.pos}
                    left={left.pos}
                    />; }
        )}
      </div>
    </div>
  )
}

export default ElevatorApp;
