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
            window.removeEventListener('keydown', handleKeyDown); // повертаємо їх  із хука
            window.removeEventListener('keyup', handleKeyUp); // повертаємо їх  із хука
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
            setSubmarineState((prevState) => {
                if (isMovingDown && prevState.deep < 69) {
                    return { ...prevState, deep: prevState.deep + 0.1 };
                } else if (isMovingUp && prevState.deep > 0) {
                    return { ...prevState, deep: prevState.deep - 0.1 };
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