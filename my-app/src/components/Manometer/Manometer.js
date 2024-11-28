// import React from "react";

// function Manometer({ maxPreassure, criticalPreassure }) {


//     // ф виводить список поділок манометра
//     const RenderScale = (minP, maxP, criticalP) => {
//         const ScaleList = []

//         for (let gradePoint = minP; gradePoint <= criticalP; gradePoint += criticalP / maxP) {
//             ScaleList.push(<li key={gradePoint}>{gradePoint.toFixed(0)}</li>);
//         }

//         return <ul>{ScaleList}</ul>;// цей список буде рендеритися але його варто округлити в циклі
//     }


//     return (
//         <div id="manometer">
//             <div id="scale">

//                 {RenderScale(0, maxPreassure, criticalPreassure)}

//             </div>

//         </div>
//     );
// }


import React from "react";

function Manometer({ maxPreassure, criticalPreassure, deep }) {

    const manNeedle = (deep, tickAngle) => {
        const atmosphereP = 1; //атмосферний тиск на поверхні (приблизно 101,325 кПа на рівні моря) 1 bar,
        const densityW = 1025; // густина води (приблизно 1000 кг/м³ для прісної води і 1025 кг/м³ для морської),
        const g = 9.8 // gravity speed acceleration of free fall

        const currentP = atmosphereP + (densityW * g * deep) / 100000; // kPa to Bar
        return <div id="man-needle" style={{ transform: `rotate(${currentP * tickAngle + 55}deg)` }}>{Math.round(currentP)}</div>

    }

    const RenderScale = (minP, maxP, criticalP) => {
        const ScaleList = [];
        const numTicks = 10; // Кількість поділок, можна передати як пропс для гнучкості
        const tickStep = (criticalP - minP) / numTicks;
        const activeAngle = 270; // активний сектор шкали
        const tickAngle = activeAngle / (numTicks - 1);

        for (let i = 0; i < numTicks; i++) {
            const gradePoint = minP + i * tickStep;
            const rotation = activeAngle / 2 + i * tickAngle; // розташування поділки по куту

            ScaleList.push(
                <li
                    key={i}
                    style={{
                        position: 'absolute',
                        transform: `rotate(${rotation}deg) translate(80px)`, // розміщення по колу
                        transformOrigin: 'center center',
                    }}

                >-
                    <span style={{
                        position: 'absolute',
                        transform: `rotate(${-rotation}deg)`,
                        transformOrigin: 'center center',

                    }}>
                        {Math.round(gradePoint)}
                    </span>
                </li >
            );
        }

        return <ul style={{ position: 'relative', listStyle: 'none', padding: 0 }}>{ScaleList}</ul>;
    };

    return (
        <div id="manometer" style={{ position: 'absolute', width: '200px', height: '200px', bottom: '12px' }}>
            <div id="scale" style={{ position: 'absolute', top: 'calc(50% - 7px)', left: 'calc(50% - 7px)', }}>
                {RenderScale(0, maxPreassure, criticalPreassure)}
                {manNeedle(deep, 12.5)}
            </div>
        </div>
    );
}






export default Manometer