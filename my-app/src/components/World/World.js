import React, { useState, useEffect } from "react";
import './World.css';
import Submarine from "../Submarine";
import '../Submarine.css';
import Statusbar from "../ Statusbar/Statusbar";


function World({ keyEvent }) {

    const [submarineState, setSubmarineState] = useState({
        'oxigen': 100,
        'charge': 100,
        'fuel': 100,
        'deep': 0,
        'health': 100,
        'critical preassure': 200,
        'inner opacity': 0.1,
        'isMoving': false,
    }
    );

    useEffect(() => {
        if (keyEvent) {
            // console.log(keyEvent.code);

            setSubmarineState(prevState => {

                if (keyEvent.code === 'ArrowDown' && prevState.deep < 69) {
                    // Збільшуємо глибину, якщо поточне значення менше 69  але це костиль
                    return { ...prevState, deep: prevState.deep + 1 };
                } else if (keyEvent.code === 'ArrowUp' && prevState.deep > 0) {
                    // Зменшуємо глибину, якщо поточне значення більше 0
                    return { ...prevState, deep: prevState.deep - 1 };
                }
                // Повертаємо поточний стан, якщо жодна умова не виконана
                return { ...prevState };
            });
        }
    }, [keyEvent]);

    return (
        <div id="world">
            <div id="sky">
                <Statusbar submarineState={submarineState} />
                <div className="clouds"></div>
            </div>
            <Submarine keyEvent={keyEvent} submarineState={submarineState} />
            <div id="surface"></div>
            <div id="underwater">
                <div id="seabed"></div>
            </div>
        </div>
    );
}
export default World