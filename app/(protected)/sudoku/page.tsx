"use client";

import { useState } from "react";
import { presetBoard, isValidSudoku } from "./sudoku-logic";

export default function Sudoku() {
  const [board, setBoard] = useState<(number | string)[][]>(() => {
    return presetBoard.map((row) => [...row]);
  });
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    message: string;
  } | null>(null);

  const handleChange = (rowIndex: number, colIndex: number, value: string) => {
    // Reset validation state on change
    if (validationResult) setValidationResult(null);
    if (value !== "" && !/^\d$/.test(value)) return;

    const newBoard = board.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        if (rIdx === rowIndex && cIdx === colIndex) {
          return value === "" ? 0 : parseInt(value);
        }
        return cell;
      }),
    );
    setBoard(newBoard);
  };

  const validateSudoku = () => {
    const valid = isValidSudoku(board);
    setValidationResult({
      isValid: valid,
      message: valid
        ? "✅ Sudoku is valid! Great job!"
        : "❌ Sudoku is invalid. Keep trying!",
    });
  };

  const resetBoard = () => {
    setBoard(presetBoard.map((row) => [...row]));
    setValidationResult(null);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 py-12 font-sans dark:bg-black text-zinc-900 dark:text-zinc-100">
      <main className="flex w-full max-w-lg flex-col items-center gap-8 rounded-2xl bg-white p-8 shadow-xl dark:bg-zinc-900/50 dark:ring-1 dark:ring-white/10 sm:p-12 transition-all">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 text-center w-full">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Sudoku Validator
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-xs">
              Fill in the 4x4 grid with numbers 1-4. Each row, column, and 2x2
              subgrid must contain unique numbers.
            </p>
          </div>
        </div>

        {/* Sudoku Board */}
        <div className="relative p-1 bg-zinc-900 dark:bg-zinc-700 rounded-lg shadow-2xl">
          <div className="grid grid-cols-4 gap-0.5 bg-zinc-900 dark:bg-zinc-700 rounded-md overflow-hidden border-2 border-zinc-900 dark:border-zinc-700">
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const isPrefilled = presetBoard[rowIndex][colIndex] !== 0;

                // Determine if the entered value is invalid for a 4x4 sudoku (i.e. > 4 or < 1 but 0 is empty)
                // Note: cell is 0 if empty.
                const cellValue =
                  typeof cell === "string" ? parseInt(cell) : cell;
                const isInvalidNumber =
                  !isPrefilled &&
                  cellValue !== 0 &&
                  (cellValue < 1 || cellValue > 4);

                // Determine logic for 2x2 subgrid visual separation
                // We can add extra margin or border to simulate the thicker lines
                const isRightBorder =
                  (colIndex + 1) % 2 === 0 && colIndex !== 3;
                const isBottomBorder =
                  (rowIndex + 1) % 2 === 0 && rowIndex !== 3;

                // Construct styles dynamically
                let cellClasses =
                  "relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center transition-colors duration-200 ";

                if (isPrefilled) {
                  cellClasses += "bg-zinc-100 dark:bg-zinc-800 ";
                } else if (isInvalidNumber) {
                  cellClasses += "bg-red-50 dark:bg-red-900/40 ";
                } else {
                  cellClasses += "bg-white dark:bg-zinc-900 ";
                }

                const borderClasses = `
                    ${isRightBorder ? "border-r-2 border-r-zinc-800 dark:border-r-zinc-500" : "border-r border-r-zinc-200 dark:border-r-zinc-800"}
                    ${isBottomBorder ? "border-b-2 border-b-zinc-800 dark:border-b-zinc-500" : "border-b border-b-zinc-200 dark:border-b-zinc-800"}
                `;

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`
                      ${cellClasses}
                      ${borderClasses}
                      ${colIndex === 3 ? "border-r-0" : ""}
                      ${rowIndex === 3 ? "border-b-0" : ""}
                    `}
                  >
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={cell === 0 ? "" : cell.toString()}
                      onChange={(e) =>
                        handleChange(rowIndex, colIndex, e.target.value)
                      }
                      readOnly={isPrefilled}
                      className={`
                        h-full w-full bg-transparent text-center text-2xl font-bold outline-none font-mono
                        ${
                          isPrefilled
                            ? "text-zinc-900 dark:text-zinc-400 cursor-default"
                            : isInvalidNumber
                              ? "text-red-600 dark:text-red-400"
                              : "text-blue-600 dark:text-blue-400 focus:bg-blue-50/50 dark:focus:bg-blue-900/20"
                        }
                      `}
                    />
                  </div>
                );
              }),
            )}
          </div>
        </div>

        {/* Validation Status */}
        {validationResult && (
          <div
            className={`flex w-full items-center justify-center rounded-xl p-4 font-medium animate-in fade-in slide-in-from-top-2 duration-300 ${
              validationResult.isValid
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:ring-emerald-800"
                : "bg-red-50 text-red-700 ring-1 ring-red-200 dark:bg-red-900/20 dark:text-red-300 dark:ring-red-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">
                {validationResult.isValid ? "🎉" : "⚠️"}
              </span>
              {validationResult.message}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex w-full gap-4">
          <button
            onClick={resetBoard}
            className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 transition-all active:scale-[0.98]"
          >
            Reset Board
          </button>
          <button
            onClick={validateSudoku}
            className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all active:scale-[0.98]"
          >
            Check Solution
          </button>
        </div>
      </main>
    </div>
  );
}
