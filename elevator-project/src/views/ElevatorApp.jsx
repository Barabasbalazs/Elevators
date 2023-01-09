import { useState, useEffect } from 'react'
import Floor from '../components/Floor'
import '../styles/ElevatorApp.css'
import { Queue } from '../utils/queue'

const ElevatorApp = () => {

  const [floorNumbers] = useState(import.meta.env.VITE_NUM_FLOORS);

  const [floors, setFloors] = useState()

  const [floorStates, setFloorStates] = useState()

  const [left, setLeftElevator] = useState()

  const [right, setRightElevator] = useState()

  const [leftHeading, setLeftHeading] = useState(new Queue());

  const [rightHeading, setRightHeading] = useState(new Queue());

  useEffect(() => {

    const floorArray = Array.from({length: floorNumbers}, (x, i) => i);

    const tmpFloorStates = floorArray.map((ind) => {
      if (ind === 0) {
        return {
          left: true,
          right: false,
        }
      } else if (ind === (floorNumbers - 1)) {
        return {
          left: false,
          right: true,
        }
      } else {
        return {
          left: false,
          right: false
        }
      }
    });

    setFloors(floorArray.reverse(), setFloorStates(tmpFloorStates));

    setLeftElevator(0);
    setRightElevator(floorNumbers - 1);

  }, []);

  useEffect(() => {
    const interval = setInterval(() => {

      if (leftHeading.isEmpty()) {
        // console.log('it is empty')
        return;
      }

      const leftHNum = parseInt(leftHeading.peek());

      // console.log(`left: ${left} - leftHNum ${leftHNum}`);

      if (left === leftHNum) {
        // console.log('stepped into equal')
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
            right: el.right
          }
        } else {
          return {
            left: false,
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
            left: el.left
          }
        } else {
          return {
            right: false,
            left: el.left
          }
        }
      })
      return newFloors;
    });
  }
  
  const calculateClosest = (floorNumber) => {
    if (Math.abs(left - floorNumber) < Math.abs(right - floorNumber)) {
      return 'left';
    } else if (Math.abs(left - floorNumber) > Math.abs(right - floorNumber)) {
      return 'right';
    } else if (Math.abs(left - floorNumber) === Math.abs(right - floorNumber)) {
      if (left <= right) {
        return 'left';
      } else if (left > right) {
        return 'right';
      }
    }
  }

  const elavatorButtonPush = async (side, buttonClicked) => {
    // if its greater or smaller than the destination and headed in that direction it will not ad it to the queue
    if (side === 'left') {
      if (buttonClicked > left && buttonClicked <= leftHeading.peek()) {
        return;
      } else if (buttonClicked < left && buttonClicked >= leftHeading.peek()) {
        return;
      }
      setLeftHeading((prev) => {
        prev.enqueue(buttonClicked);
        const newH = prev;
        return newH;
      }); // => this fires of the changeing of the pos and the queue
    } else if (side === 'right') {
      if (buttonClicked > right && buttonClicked <= rightHeading.peek()) {
        return;
      } else if (buttonClicked < right && buttonClicked >= rightHeading.peek()) {
        return;
      }
      setRightHeading((prev) => {
        prev.enqueue(buttonClicked);
        const newH = prev;
        return newH;
      });
    }
  } 
  
  const floorButtonPush = (floorCalled, direction) => {
    // need to check if it's headed in the same direction !!!!!!
    goToClosest(floorCalled);
  }

  const goToClosest = (floorCalled) => {
    const closest = calculateClosest(floorCalled);
    if (closest === 'left') {
      setLeftHeading((prev) => {
        prev.enqueue(floorCalled);
        const newH = prev;
        return newH;
      });
    } else {
      setRightHeading((prev) => {
        prev.enqueue(floorCalled);
        const newH = prev;
        return newH;
      });
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-full h-fit">
        <div className="text-left grid grid-cols-3 divide-x items-center border-t-4 space-x-2">
          <div></div>
          <div>
            <div className="flex space-x-2">
              <p>First Elevator:</p>
              <p>{left}</p>
            </div>
            <div className="flex space-x-2">
              <p>Heading To:</p>
              { leftHeading.asList().map((el) => {
                return <p>{el}</p>
              })}
            </div>
          </div>  
          <div>
            <div className="flex space-x-2">
              <p>Second Elevator:</p>
              <p>{right}</p>
            </div>
            <div className="flex space-x-2">
              <p>Heading To:</p>
              { rightHeading.asList().map((el) => {
                return <p>{el}</p>
              })}
            </div>
          </div>
        </div>
        {floorStates && floors.map((index) => {
            return <Floor 
                    index={index}
                    floors={floors}
                    elevatorCallBack={elavatorButtonPush}
                    floorCallBack={floorButtonPush}
                    floorSituation={floorStates[index]}
                    max={parseInt(floorNumbers)}
                    />; }
        )}
      </div>
    </div>
  )
}

export default ElevatorApp;
