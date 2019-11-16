import React, { Component } from 'react';
import Board from './Board';
import Scoreboard from './Scoreboard';
import WinnerAlert from './WinnerAlert';

const POSSIBLE_WINS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: new Array(9).fill(''),
      currentPlayer: true,
      winner: null,
      playerXScore: 0,
      playerOScore: 0,
      winnerMessage: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { winner, playerOScore, playerXScore, board, winnerMessage } = this.state;
    if(winner === 'X') {
      this.setState({
        playerXScore: playerXScore + 1,
        winnerMessage: 'PLAYER X WINS!!',
        winner: null
      });
    } else if (winner === 'O') {
      this.setState({
        playerOScore: playerOScore + 1,
        winnerMessage: "PLAYER 0 WINS!!",
        winner: null
      });
    } else if (!board.includes("") && winnerMessage.length === 0) {
      this.setState({
        winnerMessage: 'GAME TIED!!!'
      });
    }
  };

  checkForWin = () => {
    let board = this.state.board;
    let winner = null;
    POSSIBLE_WINS.filter(w => {
      if (w.every(idx => board[idx] === 'X')) { winner = 'X' }
      if (w.every(idx => board[idx] === 'O')) { winner = 'O' }
      return winner;
    });
    return winner;
  }

  handleResetClick = () => {
    this.setState({
      winner: null,
      winnerMessage: '',
      currentPlayer: true,
      board: new Array(9).fill('')
    })
  }

  handleClick = (cell, idx) => {
    if(cell.length === 0) {
      this.setState((state) => {
        let winner = this.checkForWin();
        let board = this.state.board.map((cell, i) => {
          if(i === idx) {
            cell = this.state.currentPlayer ? "X" : "O";
          }
          return cell;
        });
        return {
          board,
          winner,
          currentPlayer: !this.state.currentPlayer,
        }
      });
    }
  };

  render() {
    const { board, playerXScore, playerOScore, winnerMessage } = this.state;
    return (
      <div className="container">
        {winnerMessage &&
          <WinnerAlert
          winner={winnerMessage}
          handleReset={this.handleResetClick}/>
        }
        <div className="game_container">
          <Scoreboard xWins={playerXScore} yWins={playerOScore} />
          <Board board={board} onClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

export default Game;

