
import { useEffect, useState } from 'react';
import './App.css';
import World from './components/World/World'



function App() {
  // створюю змінні для стану (буду перевіряти яку кнопку натиснуто)
  const [keyEvent, setKeyEvent] = useState(null);

  // використання  useEffect потрібно для налаштування прослуховувача подій
  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeyEvent(event);
    };


    // Додаємо обробник події
    window.addEventListener('keydown', handleKeyDown);

    // Очищаємо обробник при розмонтуванні
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, [])

  return (
    <World keyEvent={keyEvent} />

  );
}

export default App;
