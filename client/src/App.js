import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

export async function searchAnimals() {

    console.log(`*** searchAnimals`)
  return await fetch(`/animals`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
      .then((response) => {
        // If request is not successful, display error message
        if (!response.ok) {
          throw new Error("HTTP status " + response.status);
        }

        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
}



function App() {
    const [animals, setAnimals] = useState([])
    useEffect(() => {
        console.log(`*** useEffect`)
        searchAnimals().then(r => {
            console.log(r)
            console.log(`*** r: ${JSON.stringify(r)}`)
            setAnimals(r)
        })
    }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>  {animals?
          <ul>
              {animals.map(animal => <li>animal: {animal.name}</li>)}

          </ul>
          : "Loading..." }
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
