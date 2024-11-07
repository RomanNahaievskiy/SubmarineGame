import React from "react";
import './Submarine.css'

// function handleControl(event) {
//     if (event.code) {
//         setSubmarineState({ 'isMoving': true })
//     } else {
//         setSubmarineState({ 'isMoving': false })
//     }

// }


function IndicateLevel({ level, color }) {
    return <div style={{
        width: "100%",
        height: level + "%",
        backgroundColor: color,
        zIndex: '-1',
        position: "absolute",
        bottom: '0px',
        left: '0px',
    }}></div>
}


function Submarine({ keyEvent, submarineState }) {
    // тут я "піднімаю" до батьківського компоненту стан який описано нижче , щоб передавати його в Statusbar
    // const [submarineState, setSubmarineState] = useState({
    //     'oxigen': 100,
    //     'charge': 100,
    //     'fuel': 100,
    //     'deep': 0,
    //     'health': 100,
    //     'critical preassure': 200,
    //     'inner opacity': 0.1,
    //     'isMoving': false,
    // }
    // );



    return (
        <div
            id="submarine" className={submarineState.isMoving ? 'moving' : 'stay'}
            style={{ top: submarineState.deep + 21 + "%", transform: "scale(0.78)" }}>

            <div id="periscope"></div>
            <div id="propeller"></div>
            <div id="inner-submarine" style={{ opacity: submarineState['inner opacity'] }}>
                <div className="inner-submarine-item" id="engine"><span></span></div>
                <div className="inner-submarine-item" id="fuel-tank"><IndicateLevel level={submarineState.fuel} color={'#dd3131'}></IndicateLevel><span>fuel</span><span>{submarineState.fuel}%</span></div>
                <div className="inner-submarine-item" id="accomulator"><IndicateLevel level={submarineState.accomulator} color={'#ceb10b'}></IndicateLevel><span>&#91;+      -&#93;</span><span>{submarineState.accomulator}%</span></div>
                <div className="inner-submarine-item" id="oxigen"><IndicateLevel level={submarineState.oxigen} color={'rgb(34, 240, 255)'}></IndicateLevel><span>O2</span><span>{submarineState.oxigen}%</span></div>
            </div>
            <div id='tip-deep' style={{ color: " white", position: "absolute", bottom: 0, left: "-42px" }}>{Math.round(submarineState.deep * 1.4) + "m"}</div>
        </div >
    );
}



export default Submarine;