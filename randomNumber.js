#!/usr/bin/node

// function allNewDice() {
//     const dice = []
//     for (let i = 0; i < 10; i++) {
//         const randomNumbers = Math.ceil(Math.random() * 6);
//         dice.push(randomNumbers);
//     }
//     console.log(dice);
// }

// allNewDice()

const allNewDice = () => {
    const dice = []
    for (let i = 0; i < 10; i++) {
        const randomNumbers = Math.ceil(Math.random() * 6);
        dice.push(randomNumbers);
    }
    console.log(dice);
}

allNewDice()
