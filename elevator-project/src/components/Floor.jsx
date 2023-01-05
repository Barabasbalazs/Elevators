const Floor = (props) => {

    return (
        <div className=" h-1/6 text-left">
            <p>{ props.index }. Floor</p>
            <button>Up</button><br></br>
            <button>Down</button>
        </div>
    )
}

export default Floor;