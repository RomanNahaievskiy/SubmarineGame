import React from "react";
import "./Statusbar.css";

function Statusbar({ submarineState, submarineResources, submarineCoords }) {
  return (
    <div id="statusbar">
      <div id="name">The{submarineState.name}</div>
      <div id="healt-l">Health : {submarineResources.health}%</div>
      <div id="fuel-l">Fuel : {submarineResources.fuel} %</div>
      <div id="charge-l">Charge : {submarineResources.charge}%</div>
      <div id="oxigen-l">Oxigen : {submarineResources.oxigen}%</div>
      <div id="deep-l">Deep : {Math.round(submarineCoords.deep)}m</div>
    </div>
  );
}
export default Statusbar;
