import React, { useState, useEffect } from 'react';

const Elevator = ({ queue }) => {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [direction, setDirection] = useState('up');

  useEffect(() => {
    const interval = setInterval(() => {
      if (direction === 'up') {
        setCurrentFloor(currentFloor + 1);
      } else {
        setCurrentFloor(currentFloor - 1);
      }

      if (currentFloor === queue[queue.length - 1]) {
        setDirection('down');
      } else if (currentFloor === queue[0]) {
        setDirection('up');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentFloor, queue, direction]);

  return (
    <div className="elevator">
      Elevator is on floor {currentFloor}
    </div>
  );
}

const NewElevatorApp = () => {
  const [queue, setQueue] = useState([1, 2, 3, 4]);

  useEffect(() => {
    // Update the queue every 5 seconds
    const interval = setInterval(() => {
      setQueue(prevQueue => {
        // Modify the queue here
        return newQueue;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <Elevator queue={queue} />
    </div>
  );
}


export default NewElevatorApp;
