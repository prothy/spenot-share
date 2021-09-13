import React, { useEffect, useState } from 'react'
import './App.css';

function App() {
  const [test, setTest] = useState({})

  useEffect(() => {
    fetch('/api/react-test')
    .then(res => res.json())
    .then(data => setTest(data))
  }, [])

  return (
    <div className="App">
      {console.log(test)}
    </div>
  );
}

export default App;
