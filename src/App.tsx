import { useState } from "react";
import "./App.css";
import Button from "./components/Button";

function App() {
  const [count, setCount] = useState(0) 
  return (
    <main className="main-container">
      <img src='/openmodelhub.svg' width={50} />
      <div className='mt-10'>
        <h1 className='text-xl font-bold'>Welcome to openmodelhub!</h1>
        <p>This project is WIP. You are currently seeing the initial codebase preview.</p>
      </div>

      <br/>
      <p className='mb-2'>Example Component</p>
      <Button label={`Clicked ${count} times`} onClick={() => setCount((x) => x+1)} />
    </main>
  );
}

export default App;
