import React, { useState, useEffect } from 'react';

const Contador = () => {
const initialCount = parseInt(localStorage.getItem('contador') || '0', 10);
const [count, setCount] = useState(initialCount);

useEffect(() => {
    localStorage.setItem('contador', count);
}, [count]);

const increment = () => {
    setCount(count + 1);
};

const decrement = () => {
    setCount(count - 1);
};

return (
    <div>
    <h1>Contador</h1>
    <p>Valor actual: {count}</p>
    <button onClick={increment}>Incrementar</button>
    <button onClick={decrement}>Decrementar</button>
    </div>
);
};

export default Contador;
