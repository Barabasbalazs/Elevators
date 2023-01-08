import { useState, useEffect } from 'react'
import Floor from '../components/Floor'
import '../styles/ElevatorApp.css'
import { Queue } from '../utils/queue'

const ElevatorApp = () => {

  const [floors] = useState([6, 5, 4, 3, 2, 1, 0])

  const [floorStates, setFloorStates] = useState([
    {
      left: true,
      right: false,
      headingToLeft: new Queue()
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
      headingToRight: new Queue()
    }
  ])

  const [left, setLeftElevator] = useState(0)

  const [right, setRightElevator] = useState(6)

  const [leftHeading, setLeftHeading] = useState(new Queue());

  const [rightHeading, setRightHeading] = useState(new Queue());

  useEffect(() => {
    const interval = setInterval(() => {

      if (leftHeading.isEmpty()) {
        console.log('it is empty')
        return;
      }

      const leftHNum = parseInt(leftHeading.peek());

      console.log(`left: ${left} - leftHNum ${leftHNum}`);

      if (left === leftHNum) {
        console.log('stepped into equal')
        setLeftHeading((prev) => {
          prev.dequeue();
          const newQueue = prev;
          return newQueue;  
        });
        return;
      }

      if (left < leftHNum) {
        setLeftElevator(left + 1, moveLeftElevator(left + 1)); // sets the position of the left one
      } else {
        setLeftElevator(left - 1, moveLeftElevator(left - 1)); // sets the position of the right,
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [left, leftHeading]);

  useEffect(() => {
    const interval = setInterval(() => {

      if (rightHeading.isEmpty()) {
        return;
      }

      const rightHNum = parseInt(rightHeading.peek());

      if (right === rightHNum) {
        // console.log('stepped into equal')
        setRightHeading((prev) => {
          prev.dequeue();
          const newQueue = prev;
          return newQueue;  
        });
        return;
      }

      if (right < rightHNum) {
        setRightElevator(right + 1, moveRightElevator(right + 1)); // sets the position of the left one

      } else {
        setRightElevator(right - 1, moveRightElevator(right - 1)); // sets the position of the right,
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [right, rightHeading]);

  // changes the states of the floors so the elevator moves
  const moveLeftElevator = (destFloor) => {
    setFloorStates((prev) => {
      const newFloors = prev.map((el, ind) => {
        if (ind === parseInt(destFloor)) {
          return {
            left: true,
            headingToLeft: leftHeading,
            headingToRight: el.headingToRight,
            right: el.right
          }
        } else {
          return {
            left: false,
            headingToRight: el.headingToRight,
            right: el.right
          }
        }
      })
      return newFloors;
    });
  }

  const moveRightElevator = (destFloor) => {
    setFloorStates((prev) => {
      const newFloors = prev.map((el, ind) => {
        if (ind === parseInt(destFloor)) {
          return {
            right: true,
            headingToLeft: el.headingToLeft,
            headingToRight: rightHeading,
            left: el.left
          }
        } else {
          return {
            right: false,
            headingToLeft: el.headingToLeft,
            left: el.left
          }
        }
      })
      return newFloors;
    });
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
      setLeftHeading((prev) => {
        prev.enqueue(buttonClicked);
        const newH = prev;
        return newH;
      }); // => this fires of the changeing of the pos and the queue
    } else if (side === 'right') {
      setRightHeading((prev) => {
        prev.enqueue(buttonClicked);
        const newH = prev;
        return newH;
      });
    }
  } 
  
  const floorButtonPush = () => {
    console.log('Floorbuttonpush');
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
