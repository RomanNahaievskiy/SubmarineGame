import React, { useState, useEffect } from "react";
import "./World.css";
import Submarine from "../Submarine";
import "../Submarine.css";
import Statusbar from "../ Statusbar/Statusbar";
import Manometer from "../Manometer/Manometer";
import "../Manometer/Manometer.css";
import { clear } from "@testing-library/user-event/dist/clear";

function World({ keyEvent }) {
  //WorldData

  //submarineResources
  const [oxigen, setOxigen] = useState(100);
  const [charge, setCharge] = useState(12);
  const [fuel, setFuel] = useState(20);
  const [health, setHealth] = useState(100);

  const [submarineCoords, setSubmarineCoords] = useState({
    coords: [50, 40],
    deep: 0,
    isMoving: false,
    isUnderWater: false,
  });
  const [submarineState, setSubmarineState] = useState({
    "max preassure": 12,
    "critical preassure": 20,
    "inner opacity": 0.9,
  });

  //========================================================================================================================================================
  // керування - клавіші вгору вниз
  const [isMovingDown, setIsMovingDown] = useState(false);
  const [isMovingUp, setIsMovingUp] = useState(false);

  useEffect(() => {
    //ф коли натискається клавіша
    const handleKeyDown = (event) => {
      if (event.code === "ArrowDown") {
        setIsMovingDown(true); //зміна стану  на- [рухається вниз]
        setSubmarineCoords((prevState) => {
          return { ...prevState, isMoving: true };
        });
      } else if (event.code === "ArrowUp") {
        setIsMovingUp(true); //зміна стану  на- [рухається вгору]
        setSubmarineCoords((prevState) => {
          return { ...prevState, isMoving: true };
        });
      }
    };
    //ф коли відпускається клавіша
    const handleKeyUp = (event) => {
      if (event.code === "ArrowDown") {
        setIsMovingDown(false); //зміна стану  на- [!рухається ]
        setSubmarineCoords((prevState) => {
          return { ...prevState, isMoving: false };
        });
      } else if (event.code === "ArrowUp") {
        setIsMovingUp(false); //зміна стану  на- [!рухається ]
        setSubmarineCoords((prevState) => {
          return { ...prevState, isMoving: false };
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown); //призначаємо прослуховувач подій коли натиснута клавіша
    window.addEventListener("keyup", handleKeyUp); //призначаємо прослуховувач подій коли відпущена клавіша

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // видаляю їх  із хука
      window.removeEventListener("keyup", handleKeyUp); // видаляю їх  із хука
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
          if (prevState.deep > 1) {
            prevState.isUnderWater = true;
          }
          return { ...prevState, deep: prevState.deep + 0.6 };
        } else if (isMovingUp && prevState.deep > 0) {
          if (prevState.deep < 1) {
            prevState.isUnderWater = false;
          }
          return { ...prevState, deep: prevState.deep - 0.6 };
        }
        return prevState;
      });

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isMovingDown, isMovingUp]); // Другий аргумент (масив залежностей []) — це масив залежностей,
  //в якому ви вказуєте значення або змінні, за зміною яких ефект має перезапускатися.
  // Якщо масив порожній[], ефект виконується лише один раз — після первинного рендеру компонента.

  // function Bubbles({ coords }) {
  //     return <div id="bubble" style={{ top: coords[0], left: coords[1] }}>o</ div>
  // }

  //Використання кисню
  // якщо субмарина під поверхнею && і в нас ще є кисень то використовувати кисень щосекунди (але не заходити в мінус) інакше
  // якщо субмарина над поверхнею && і в нас кисень не перевищує 100 то поновляти рівень кисню щосекунди (але не більше 100)
  useEffect(() => {
    let oxigenUse;
    if (submarineCoords.isUnderWater && oxigen > 0) {
      oxigenUse = setInterval(() => {
        // console.log("using oxigen");
        setOxigen((oxigen) => Math.max(oxigen - 12, 0));
      }, 1000);
    } else if (!submarineCoords.isUnderWater && oxigen < 100) {
      oxigenUse = setInterval(() => {
        // console.log("refilling oxigen");
        setOxigen((oxigen) => Math.min(oxigen + 12, 100));
      }, 1000);
    }
    return () => clearInterval(oxigenUse);
  }, [submarineCoords.isUnderWater, oxigen]);

  // Використання палива
  /* Якщо (рівень заряду батареї < 100 && і в нас ще є пальне && і субмарина над поверхнею) {
        то запустити дизель-генератор і щосекунди заряджати батарею (але не більше 100)}
    */
  useEffect(() => {
    let fuelUse;
    if (charge < 100 && fuel > 0 && !submarineCoords.isUnderWater) {
      //   console.log("starting disel-generator ra ta ta");
      fuelUse = setInterval((fuel) => {
        setFuel((fuel) => Math.max(fuel - 1, 0));
        // console.log("charging");
        setCharge((charge) => Math.min(charge + 5, 100));
      }, 1000);
    }
    return () => clearInterval(fuelUse);
  }, [submarineCoords.isUnderWater, fuel]);

  // Використання заряду
  /* Якщо (рівень заряду батареї > 0 &&  субмарина рухається ) {
        то щосекунди розряджати батарею (але не нижче 0)}
    */
  useEffect(() => {
    let chargeUse;
    if (charge > 0 && submarineCoords.isMoving) {
      chargeUse = setInterval(() => {
        // console.log("batary charge is using", charge);
        setCharge((charge) => {
          return Math.max(charge - 1, 0);
        });
      }, 500);
    }
    return () => clearInterval(chargeUse);
  }, [submarineCoords.isMoving, charge]);
  return (
    <div id="world">
      <div id="sky">
        <Statusbar
          submarineState={submarineState}
          submarineCoords={submarineCoords}
          submarineResources={{ oxigen, charge, fuel, health }}
        />
        <Manometer
          maxPreassure={submarineState["max preassure"]}
          criticalPreassure={submarineState["critical preassure"]}
          deep={submarineCoords.deep}
        />
        <div className="clouds"></div>
      </div>
      <Submarine
        submarineState={submarineState}
        submarineCoords={submarineCoords}
        submarineResources={{ oxigen, charge, fuel, health }}
      />
      {/* <Bubbles coords={submarineState.coords} /> */}
      <div id="surface"></div>
      <div id="underwater"></div>
      <div id="seabed"></div>
    </div>
  );
}
export default World;
