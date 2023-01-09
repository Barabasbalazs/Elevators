import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import ElevatorComp from './ElevatorComp';
import PropTypes from 'prop-types';

const Floor = (props) => {

    const [floors] = useState(props.floors.reverse());

    const buttonClicked = async (e) => {
        await props.floorCallBack(props.index, e.target.value);
    }

    return (
        <div className="h-1/6 text-left grid grid-cols-3 divide-x items-center border-t-4 space-x-2">
            <div className="grid grid-cols items-center space-y-1">
                <p>{ props.index }. Floor</p>
                {(props.index !== (props.max - 1)) && <Button value={'up'} onClick={buttonClicked}>Up</Button>}
                {(props.index !== 0) && <Button value={'down'} onClick={buttonClicked}>Down</Button>}
            </div>
            <div className="w-full border-r-4">
            {props.floorSituation.left && 
                <ElevatorComp 
                    floors={floors} 
                    side={'left'}
                    currentFloor={props.index}
                    buttonClickCallback={props.elevatorCallBack}
                />    
            }
            </div>
            <div className="w-full border-l-4">
            {props.floorSituation.right && 
                 <ElevatorComp 
                    floors={floors} 
                    side={'right'}
                    currentFloor={props.index}
                    buttonClickCallback={props.elevatorCallBack}
                 />
            }
            </div>
        </div>
    )
}

Floor.propTypes = {
    index: PropTypes.number,
    floors: PropTypes.array,
    elevatorCallBack: PropTypes.func,
    floorCallBack: PropTypes.func,
    floorSituation: PropTypes.object,
    max: PropTypes.number
};

export default Floor;