"use client";

import { useState } from "react";
import styles from "./sudoku.module.css";
import { presetBoard, isValidSudoku } from "./sudoku-logic";

export default function Sudoku() {
  const [board, setBoard] = useState<(number | string)[][]>(() => {
    return presetBoard.map((row) => [...row]);
  });

  const handleChange = (rowIndex: number, colIndex: number, value: string) => {
    if (value.length > 1) return;

    const newBoard = board.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        if (rIdx === rowIndex && cIdx === colIndex) {
          return value;
        }
        return cell;
      }),
    );
    setBoard(newBoard);
  };

  const validateSudoku = () => {
    const valid = isValidSudoku(board);

    if (valid) {
      alert("✅ Sudoku is valid!");
    } else {
      alert("❌ Sudoku is invalid!");
    }
  };

  return (
    <div className={styles.container}>
      <h1>4x4 Sudoku Validator</h1>
      <table id="sudoku-board">
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => {
                const isPrefilled = presetBoard[rowIndex][colIndex] !== 0;

                let val = "";
                if (cell !== 0 && cell !== "." && cell !== "") {
                  val = cell.toString();
                }

                return (
                  <td
                    key={colIndex}
                    className={isPrefilled ? styles.prefilled : ""}
                  >
                    <input
                      type="text"
                      maxLength={1}
                      value={val}
                      onChange={(e) =>
                        handleChange(rowIndex, colIndex, e.target.value)
                      }
                      readOnly={isPrefilled}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={validateSudoku}>Validate</button>
    </div>
  );
}
