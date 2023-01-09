import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ElevatorComp = (props) => {

    const buttonClicked = async (e) => {
        await props.buttonClickCallback(props.side, e.target.value);
    }

    return (
        <div key={props.side} className="text-2xl space-x-4 border-8 border-black">
            {props.floors.map((index) => {
                return <Button key={index} value={index} onClick={buttonClicked}>{index}</Button>;
                })
            }  
        </div> 
    );
}

ElevatorComp.propTypes = {
    currentFloor: PropTypes.number,
    buttonClickCallback: PropTypes.func,
    side: PropTypes.string,
    floors: PropTypes.arrayOf(PropTypes.number),
};

export default ElevatorComp