import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


const Button = ({index, board, func}) => {
  return <button className='square' onClick={func} >{board[index]}</button>
}

const combos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]



function App() {
  const [count, setCount] = useState(0)
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(undefined);
  const turn = count % 2 == 0 ? "×" : "o"

  function checkWin(){
    for (const combo of combos) {
    const [a, b, c] = combo
    if (board[a] && board[a] == board[b] && board[a] == board[c]) {
        setWinner(board[a])
      }  
    }
  }
  function reset(){
    setCount(0)
    const newBoard = Array(9).fill(null);
    setBoard(newBoard)
    setWinner(undefined)
  }

  const determineTurn = () => {
    useEffect( () => {checkWin()})
    if (winner) return <p>GANADOR: {winner}</p>
    else if (count == 9) return <p>EMPATE</p>
    return <p>TURNO DE: {turn}</p>
  }

  return (
    <body>
      <main>
        <h1>TA TE TI
        </h1>
        <button onClick={reset}>REINICIAR PARTIDA</button>
        <div className="flexContainer">
          <section className="game">
            {
              board.map((el, index) => {
                function handleClick() {
                  if (!board[index] && !winner) {
                    const newBoard = [... board]
                    newBoard[index] = turn 
                    setBoard(newBoard)
                    
                    setCount(count + 1)
                  }
                }  
                return <Button func={handleClick} key={index} index={index} board={board}></Button>    
              })
            }
          </section>
        </div>
        <section>
          {determineTurn()} 
        </section>
      </main>
    </body>
  )
}

export default App
