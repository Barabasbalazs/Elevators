import { Button } from 'react-bootstrap';
import { Queue } from '../utils/queue';
import PropTypes from 'prop-types';

const ElevatorComp = (props) => {

    // console.log(`${props.side} here and i'm currently on ${props.currentFloor}`);

    const buttonClicked = async (e) => {
        await props.buttonClickCallback(props.side, e.target.value);
    }

    // console.log(`Elevator here: next is: ${props.list.peek()}`);
    // some better way of rendering this!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const renderNextInQueue = () => {
        const queue = props.list;

        if (queue.isEmpty()) {
          return null;
        }
    
        const next = queue.dequeue();
        return <p>{next}</p>;
    };
    // { // renderNextInQueue()}
    return (
        <div key={props.side} className="text-2xl space-x-4 border-8 border-black">
            {props.floors.map((index) => {
                return <Button key={index} value={index} onClick={buttonClicked}>{index}</Button>;
                })
            }
            <div className="flex space-x-2">
                <p className="text-l">Heading to: </p>
             
            </div>    
        </div> 
    );
}

ElevatorComp.propTypes = {
    currentFloor: PropTypes.number,
    buttonClickCallback: PropTypes.func,
    list: PropTypes.instanceOf(Queue),
    side: PropTypes.string,
    floors: PropTypes.arrayOf(PropTypes.number)
};

export default ElevatorComp