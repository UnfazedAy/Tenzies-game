import { useEffect, useState } from "react";
import Die from "./components/Die";
import Confetti from 'react-confetti';
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const isTenzies = tenzies ? 'New Game' : 'Roll'

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      const randomNumbers = generateNewDice();
      newDice.push(randomNumbers);
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice(prevDice => prevDice.map((die) => {
        return die.isHeld ? die : generateNewDice();
      }));
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((prevDice) => prevDice.map((die) => {
      return id === die.id ? {...die, isHeld: !die.isHeld} : die;
    }));
}

  const diceElement = dice.map((die) => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => {holdDice(die.id)}} />
  ));

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every((die) => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice]);

  return (
    <div className="App">
      {tenzies && <Confetti />}
      <main className="tenzies-container">
        <div className="intro">
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        <div className="dice-container">{diceElement}</div>
        <button onClick={rollDice} className="btn">
          {isTenzies}
        </button>
      </main>
    </div>
  );
}
