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
        const newQueue = leftHeading;
        newQueue.dequeue();
        setLeftHeading(newQueue);
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

      // console.log(rightHeading.asList());

      if (rightHeading.isEmpty()) {
        return;
      }

      const rightHNum = parseInt(rightHeading.peek());

      if (right === rightHNum) {
        // console.log('stepped into equal')
        const newQueue = rightHeading;
        newQueue.dequeue();
        // console.log(`New one is: ${newQueue.asList()}`);
        setRightHeading(newQueue);
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
    // need to shift it a little
    // if its greater or smaller than the destination and headed in that direction it will not ad it to the queue
    if (side === 'left') {
      if (buttonClicked > left && buttonClicked <= parseInt(leftHeading.peek())) {
        const newQueue = leftHeading;
        newQueue.reprioritize(buttonClicked);
        setLeftHeading(newQueue);
      } else if (buttonClicked < left && buttonClicked >= parseInt(leftHeading.peek())) {
        const newQueue = leftHeading;
        newQueue.reprioritize(buttonClicked);
        setLeftHeading(newQueue);
      } else {
        const newQueue = leftHeading;
        newQueue.enqueue(buttonClicked);
        setLeftHeading(newQueue);
      }
    } else if (side === 'right') {
      if (buttonClicked > right && buttonClicked <= parseInt(rightHeading.peek())) {
        const newQueue = rightHeading;
        newQueue.reprioritize(buttonClicked);
        setRightHeading(newQueue);
      } else if (buttonClicked < right && buttonClicked >= parseInt(rightHeading.peek())) {
        const newQueue = rightHeading;
        newQueue.reprioritize(buttonClicked);
        setRightHeading(newQueue);
      } else {
        const newQueue = rightHeading;
        newQueue.enqueue(buttonClicked);
        setRightHeading(newQueue);
      }
    }
  } 

  // ugh horrible code  
  const floorButtonPush = async (floorCalled, direction) => {
    if (leftHeading.isEmpty() && rightHeading.isEmpty()) {
      goToClosest(floorCalled);
    } else if (direction === 'down') {
      // left is heading down
      if (left > floorCalled && left >= (leftHeading.peek())) {
        // destination is on the way
        if (floorCalled >= (leftHeading.peek())) {
          const newQueue = leftHeading;
          newQueue.reprioritize(floorCalled);
          setLeftHeading(newQueue);
        } else {
          const newQueue = leftHeading;
          newQueue.enqueue(floorCalled);
          setLeftHeading(newQueue);
        }
        // right is heading down
      } else if (right > floorCalled && right >= (rightHeading.peek())) {
        // destination is on the way
        if (floorCalled >= (rightHeading.peek())) {
          const newQueue = rightHeading;
          newQueue.reprioritize(floorCalled);
          setRightHeading(newQueue);
        } else {
          const newQueue = rightHeading;
          newQueue.enqueue(floorCalled);
          setRightHeading(newQueue);
        }
      } else {
        goToClosest(floorCalled);
      }
    } else if (direction === 'up') {
      // left is heading up from below
      if (left < floorCalled && left <= (leftHeading.peek())) {
        // destination on the way
        if (floorCalled <= (leftHeading.peek())) {
          const newQueue = leftHeading;
          newQueue.reprioritize(floorCalled);
          setLeftHeading(newQueue);
        } else {
          const newQueue = leftHeading;
          newQueue.enqueue(floorCalled);
          setLeftHeading(newQueue);
        }
        // right is heading up from below
      } else if (right < floorCalled && right <= (rightHeading.peek())) {
        // destination on the way
        if (floorCalled <= (rightHeading.peek())) {
          const newQueue = rightHeading;
          newQueue.reprioritize(floorCalled);
          setRightHeading(newQueue);
        } else {
          const newQueue = rightHeading;
          newQueue.enqueue(floorCalled);
          setRightHeading(newQueue);
        }
      } else {
        goToClosest(floorCalled);
      }
    } 
  }

  const goToClosest = (floorCalled) => {
    const closest = calculateClosest(floorCalled);
    if (closest === 'left') {
      const newQueue = leftHeading;
      newQueue.enqueue(floorCalled);
      setLeftHeading(newQueue);
    } else {
      const newQueue = rightHeading;
      newQueue.enqueue(floorCalled);
      setRightHeading(newQueue);
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
