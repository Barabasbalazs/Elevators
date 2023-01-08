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
    pos: 0
  })

  const [right, setRight] = useState({
    pos: 6
  })

  const [leftHeading, setLeftHeading] = useState([])

  const [rightHeading, setRightHeading] = useState([])

  // changes the states of the floors so the elevator moves
  const changeLeft = (buttonClicked) => {
    setFloorStates((prevFloorStates) => {
      const newFloorState = prevFloorStates.map((el, ind) => {
        if (ind === parseInt(buttonClicked)) {
          return {
            left: true,
            headingToLeft: leftHeading,
            right: el.right,
          };
        } else if (el.headingToLeft) {
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
            headingToRight: rightHeading,
            right: true
          };
        } else if (el.headingToRight) {
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

  const moveLeft = (wishedFloor) => {
    if (wishedFloor > left.pos) {
      for (let i = left.pos; i <= wishedFloor; i++) {
        setTimeout(() => {
          setLeft((prev) => { 
            return { 
              pos: i
            }
          });
          changeLeft(i);
        }, 1000 * i);
      }
    } else if (wishedFloor < left) {
      const div = (left.pos - wishedFloor);
      for (let i = 0; i <= div; i++) {
        setTimeout(() => {
          setLeft((prev) => { 
            return { 
              pos: i,
            }
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
          setRight((prev) => { 
            return { 
              pos: i
            }
          });
          changeRight(i);
        }, 1000 * i);
      }
    } else if (wishedFloor < right.pos) {
      const div = (right.pos - wishedFloor);
      for (let i = 0; i <= div; i++) {
        setTimeout(() => {
          setRight((prev) => { 
            return { 
              pos: i,
            }
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

  const elavatorButtonPush = async (side, buttonClicked) => {
    if (side === 'left') {
      Promise.resolve(setLeftHeading((prev) => {
        const heading = prev;
        heading.push(buttonClicked);
        return heading;
      })).then(moveLeft(buttonClicked));
    } else if (side === 'right') {
      Promise.resolve(setRightHeading((prev) => {
        const heading = prev;
        heading.push(buttonClicked);
        return heading;
      })).then(moveRight(buttonClicked));
    }
  } 

  const floorButtonPush = (floorNumber, buttonClicked) => {
    if (calculateClosest(floorNumber) === 'left') {
      setLeftHeading((prev) => {
        const heading = prev;
        heading.push(floorNumber);
        return heading;
      })
      moveLeft(floorNumber);
    } else {
      setRightHeading((prev) => {
        const heading = prev;
        heading.push(floorNumber);
        return heading;
      })
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
