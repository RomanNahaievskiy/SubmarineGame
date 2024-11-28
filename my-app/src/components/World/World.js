import React, { useState, useEffect } from "react";
import './World.css';
import Submarine from "../Submarine";
import '../Submarine.css';
import Statusbar from "../ Statusbar/Statusbar";
import Manometer from "../Manometer/Manometer";
import '../Manometer/Manometer.css';



function World({ keyEvent }) {

    const [submarineResources, setSubmarineResourses] = useState({
        'oxigen': 100,
        'charge': 100,
        'fuel': 100,
        'health': 100,
    })

    const [submarineCoords, setSubmarineCoords] = useState({
        'coords': [50, 40],
        'deep': 0,
        'isMoving': false,
    })
    const [submarineState, setSubmarineState] = useState({

        'max preassure': 12,
        'critical preassure': 20,
        'inner opacity': 0.9,



    }
    );



    //========================================================================================================================================================
    // керування - клавіші вгору вниз
    const [isMovingDown, setIsMovingDown] = useState(false);
    const [isMovingUp, setIsMovingUp] = useState(false);

    useEffect(() => {
        //ф коли натискається клавіша
        const handleKeyDown = (event) => {
            if (event.code === 'ArrowDown') {
                setIsMovingDown(true);//зміна стану  на- [рухається вниз]
            } else if (event.code === 'ArrowUp') {
                setIsMovingUp(true);//зміна стану  на- [рухається вгору]
            }
        };
        //ф коли відпускається клавіша
        const handleKeyUp = (event) => {
            if (event.code === 'ArrowDown') {
                setIsMovingDown(false);//зміна стану  на- [!рухається ]
            } else if (event.code === 'ArrowUp') {
                setIsMovingUp(false);//зміна стану  на- [!рухається ]
            }
        };

        window.addEventListener('keydown', handleKeyDown); //призначаємо прослуховувач подій коли натиснута клавіша
        window.addEventListener('keyup', handleKeyUp); //призначаємо прослуховувач подій коли відпущена клавіша

        return () => {
            window.removeEventListener('keydown', handleKeyDown); // видаляю їх  із хука
            window.removeEventListener('keyup', handleKeyUp); // видаляю їх  із хука
        };
    }, []);
    // Другий аргумент (масив залежностей []) — це масив залежностей, 
    //в якому ви вказуєте значення або змінні, за зміною яких ефект має перезапускатися.
    // Якщо масив порожній[], ефект виконується лише один раз — після первинного рендеру компонента.



    //========================================================================================================================================================
    //? requestAnimationFrame 
    // Використання requestAnimationFrame - для плавності руху субмарини

    useEffect(() => {
        let animationFrameId; // створення змінної для id майбутньої animationFrame, яка потрібна буде для її припинення 

        const updatePosition = () => {
            setSubmarineCoords((prevState) => {
                if (isMovingDown && prevState.deep < 69) {
                    return { ...prevState, deep: prevState.deep + 0.6 };
                } else if (isMovingUp && prevState.deep > 0) {
                    return { ...prevState, deep: prevState.deep - 0.6 };
                }
                return prevState;
            });

            animationFrameId = requestAnimationFrame(updatePosition);
        };

        updatePosition();

        return () => cancelAnimationFrame(animationFrameId);
    }, [isMovingDown, isMovingUp]);// Другий аргумент (масив залежностей []) — це масив залежностей, 
    //в якому ви вказуєте значення або змінні, за зміною яких ефект має перезапускатися.
    // Якщо масив порожній[], ефект виконується лише один раз — після первинного рендеру компонента.

    // function Bubbles({ coords }) {
    //     return <div id="bubble" style={{ top: coords[0], left: coords[1] }}>o</ div>
    // }


    return (
        <div id="world">
            <div id="sky">
                <Statusbar submarineState={submarineState} submarineCoords={submarineCoords} submarineResources={submarineResources} />
                <Manometer maxPreassure={submarineState["max preassure"]} criticalPreassure={submarineState["critical preassure"]} deep={submarineCoords.deep} />
                <div className="clouds"></div>
            </div>
            <Submarine submarineState={submarineState} submarineCoords={submarineCoords} submarineResources={submarineResources} />
            {/* <Bubbles coords={submarineState.coords} /> */}
            <div id="surface"></div>
            <div id="underwater">
                <div id="seabed"></div>
            </div>
        </div>
    );
}
export default World