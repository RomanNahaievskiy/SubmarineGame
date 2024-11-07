import React from "react";
import './Statusbar.css'

function Statusbar({ submarineState }) {
    return (
        <div id="statusbar">
            <div id="name">The{submarineState.name}</div>
            <div id="healt-l">Health : {submarineState.health}%</div>
            <div id="charge-l">Charge : {submarineState.charge}%</div>
            <div id="oxigen-l">Oxigen : {submarineState.oxigen}</div>
            <div id="deep-l">Deep : {submarineState.deep}m</div>
        </div>
    );
}
export default Statusbar;