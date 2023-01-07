import { useState, useEffect } from 'react'
import Floor from '../components/Floor'
import '../styles/ElevatorApp.css'

const ElevatorApp = () => {

  const [floors, setFloors] = useState([6, 5, 4, 3, 2, 1, 0])

  const [floorStates, setFloorStates] = useState([
    {
      left: true,
      right: false,
      headingToLeft: []
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
      headingToRight: []
    }
  ])

  const [left, setLeft] = useState({
    pos: 0,
    headingTo: [6, 1]
  })

  const [right, setRight] = useState({
    pos: 6,
    headingTo: [5,6]
  })

  const changeLeft = (buttonClicked) => {
    const prevLeft = left;
    setFloorStates((prevFloorStates) => {
      const newFloorState = prevFloorStates.map((el, ind) => {
        if (ind === parseInt(buttonClicked)) {
          return {
            left: true,
            headingToLeft: prevLeft.headingTo,
            right: el.right,
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
    const prevRight = right;
    setFloorStates((prevFloorStates) => {
      const newFloorState = prevFloorStates.map((el, ind) => {
        if (ind === parseInt(buttonClicked)) {
          return {
            left: el.left,
            headingToRight: prevRight.headingTo,
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
    if (wishedFloor > left.pos) {
      for (let i = left.pos; i <= wishedFloor; i++) {
        setTimeout(() => {
          setLeft({
            pos: i
          });
          changeLeft(i);
        }, 1000 * i);
      }
    } else if (wishedFloor < left) {
      const div = (left.pos - wishedFloor);
      for (let i = 0; i <= div; i++) {
        setTimeout(() => {
          setLeft({
            pos: left.pos - i
          });
          changeLeft(left.pos - i); 
        }, 1000 * i);
      }
    }
  }
  
  const moveRight = (wishedFloor) => {
    if (wishedFloor > right.pos) {
      for (let i = right.pos; i <= wishedFloor; i++) {
        setTimeout(() => {
          setRight({
            pos: i
          });
          changeRight(i);
        }, 1000 * i);
      }
    } else if (wishedFloor < right.pos) {
      const div = (right.pos - wishedFloor);
      for (let i = 0; i <= div; i++) {
        setTimeout(() => {
          setRight({
            pos: right.pos - i
          });
          changeRight(right.pos - i); 
        }, 1000 * i);
      }
    }
  }
  
  const calculateClosest = (floorNumber) => {
    if (Math.abs(left.pos - floorNumber) < Math.abs(right.pos - floorNumber)) {
      return 'left';
    } else if (Math.abs(left.pos - floorNumber) > Math.abs(right.pos - floorNumber)) {
      return 'right';
    } else if (Math.abs(left.pos - floorNumber) > Math.abs(right.pos - floorNumber)) {
      if (left.pos < floorNumber) {
        return 'left';
      } else if (right.pos < floorNumber) {
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
