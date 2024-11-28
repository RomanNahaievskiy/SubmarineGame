import React from "react";
import './Submarine.css'




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




function Submarine({ submarineResources, submarineState, submarineCoords }) {

    return (
        <div
            id="submarine" className={submarineCoords.isMoving ? 'moving' : 'stay'}
            style={{ top: submarineCoords.deep + 21 + "%", transform: "scale(0.78)" }}>

            <div id="periscope"></div>
            <div id="propeller"></div>
            <div id="inner-submarine" style={{ opacity: submarineState['inner opacity'] }}>
                <div className="inner-submarine-item" id="engine"><span></span></div>
                <div className="inner-submarine-item" id="fuel-tank"><IndicateLevel level={submarineResources.fuel} color={'#dd3131'}></IndicateLevel><span>fuel</span><span>{submarineResources.fuel}%</span></div>
                <div className="inner-submarine-item" id="accomulator"><IndicateLevel level={submarineResources.charge} color={'#ceb10b'}></IndicateLevel><span>&#91;+      -&#93;</span><span>{submarineResources.charge}%</span></div>
                <div className="inner-submarine-item" id="oxigen"><IndicateLevel level={submarineResources.oxigen} color={'rgb(34, 240, 255)'}></IndicateLevel><span>O2</span><span>{submarineResources.oxigen}%</span></div>
            </div>

            <div id='tip-deep' style={{ color: " white", position: "absolute", bottom: 0, left: "-42px" }}>{Math.round(submarineCoords.deep) + "m"}</div>
        </div >
    );
}



export default Submarine;