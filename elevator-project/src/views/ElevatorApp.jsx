import { useState, useEffect } from 'react'
import Floor from '../components/Floor'
import '../styles/ElevatorApp.css'

const ElevatorApp = () => {

  const [floors, setFloors] = useState([6, 5, 4, 3, 2, 1, 0])

  const [floorStates, setFloorStates] = useState([
    {
      left: true,
      right: false,
    },
    {
      left: false,
      right: false,
    },
    {
      left: false,
      right: false,
    },
    {
      left: false,
      right: false,
    },
    {
      left: false,
      right: false,
    },
    {
      left: false,
      right: false,
    },
    {
      left: false,
      right: true,
    }
  ])

  const [left, setLeft] = useState(0)

  const [right, setRight] = useState(6)

  const changeLeft = (buttonClicked) => {
    setFloorStates((prevFloorStates) => {
      const newFloorState = prevFloorStates.map((el, ind) => {
        if (ind === parseInt(buttonClicked)) {
          return {
            left: true,
            right: el.right
          };
        } else if (el.left === true) {
          return {
            left: false,
            right: el.right
          };
        } else {
          return el;
        }
      })
      return newFloorState;
    })
  }

  const changeRight = (buttonClicked) => {
    setFloorStates((prevFloorStates) => {
      const newFloorState = prevFloorStates.map((el, ind) => {
        if (ind === parseInt(buttonClicked)) {
          return {
            left: el.left,
            right: true
          };
        } else if (el.right === true) {
          return {
            left: el.left,
            right: false
          };
        } else {
          return el;
        }
      })
      return newFloorState;
    })
  }

  const elavatorButtonPush = async (side, floorPos, buttonClicked) => {
    if (side === 'left') {
      moveLeft(buttonClicked);
    } else if (side === 'right') {
      moveRight(buttonClicked);
    }
  } 

  const moveLeft = (wishedFloor) => {
    if (wishedFloor > left) {
      for (let i = left; i <= wishedFloor; i++) {
        setTimeout(() => {
          setLeft(i);
          changeLeft(i);
        }, 1000 * i);
      }
    } else if (wishedFloor < left) {
      const div = (left - wishedFloor);
      for (let i = 0; i <= div; i++) {
        setTimeout(() => {
          setLeft(left - i);
          changeLeft(left - i); 
        }, 1000 * i);
      }
    }
  }
  
  const moveRight = (wishedFloor) => {
    if (wishedFloor > right) {
      for (let i = right; i <= wishedFloor; i++) {
        setTimeout(() => {
          setRight(i);
          changeRight(i);
        }, 1000 * i);
      }
    } else if (wishedFloor < right) {
      const div = (right - wishedFloor);
      for (let i = 0; i <= div; i++) {
        setTimeout(() => {
          setRight(right - i);
          changeRight(right - i); 
        }, 1000 * i);
      }
    }
  }
  
  const calculateClosest = (floorNumber) => {
    if (Math.abs(left - floorNumber) < Math.abs(right - floorNumber)) {
      return 'left';
    } else if (Math.abs(left - floorNumber) > Math.abs(right - floorNumber)) {
      return 'right';
    } else if (Math.abs(left - floorNumber) > Math.abs(right - floorNumber)) {
      if (left < floorNumber) {
        return 'left';
      } else if (right < floorNumber) {
        return 'right';
      }
    }
  }

  const floorButtonPush = (floorNumber, buttonClicked) => {
    if (calculateClosest(floorNumber) === 'left') {
      moveLeft(floorNumber);
    } else {
      moveRight(floorNumber);
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
                    elevatorCallBack={elavatorButtonPush}
                    floorCallBack={floorButtonPush}
                    floorSituation={floorStates[index]}
                    />; }
        )}
      </div>
    </div>
  )
}

export default ElevatorApp;
