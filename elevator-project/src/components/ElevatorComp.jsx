import { Button } from 'react-bootstrap';

const ElevatorComp = (props) => {

    // console.log(`${props.side} here and i'm currently on ${props.currentFloor}`);

    const buttonClicked = (e) => {
        props.buttonClickCallback(props.side, props.currentFloor, e.target.value);
    }

    return (
        <div key={props.side} className="text-2xl space-x-4 border-8 border-black">
            {props.floors.map((index) => {
                return <Button key={index} value={index} onClick={buttonClicked}>{index}</Button>;
                })
            }
            <div className="flex space-x-2">
                <p className="text-l">Heading to: </p>
                {props.list.map((el) => {
                    return <p> {el} </p>;   
                })}
            </div>    
        </div> 
    );
}

export default ElevatorComp