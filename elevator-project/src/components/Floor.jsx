import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import ElevatorComp from './ElevatorComp';

const Floor = (props) => {

    const [floors] = useState(props.floors.reverse());

    const buttonClicked = (e) => {
        props.floorCallBack(props.index, e.target.value);
    }

    return (
        <div className="h-1/6 text-left grid grid-cols-3 divide-x items-center border-t-4 space-x-2">
            <div className="grid grid-cols items-center space-y-1">
                <p>{ props.index }. Floor</p>
                <Button value={'up'} onClick={buttonClicked}>Up</Button>
                <Button value={'down'} onClick={buttonClicked}>Down</Button>
            </div>
            <div className="h-full w-full">
            {props.floorSituation.left && 
                <ElevatorComp floors={floors} side={'left'}
                    currentFloor={props.index}
                    buttonClickCallback={props.elevatorCallBack}
                    list={props.floorSituation.headingToLeft}
                />    
            }
            </div>
            <div className="h-full w-full border-l-4">
            {props.floorSituation.right && 
                 <ElevatorComp floors={floors} side={'right'}
                    currentFloor={props.index}
                    buttonClickCallback={props.elevatorCallBack}
                    list={props.floorSituation.headingToRight}
                 />
            }
            </div>
        </div>
    )
}

export default Floor;