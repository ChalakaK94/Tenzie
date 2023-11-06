export default function Dies(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <div className="die-face" style={styles}>
            <h2 className="die-num" onClick={props.holdDice} >{props.value}</h2>
        </div>
    )
}