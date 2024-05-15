function Counter(){
    const [counter, setCounter] = useState(0);
  
  const handleIncrement = () => {
    setCounter(prevCounter => prevCounter + 1)
  };
  const handleDecrement = () => {
  setCounter(prevCounter => prevCounter - 1)
  };


  return (
    <div> 
      <h1>{counter}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decremenet</button>
    </div>
  );
};

export default Counter;