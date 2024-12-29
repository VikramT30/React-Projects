import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const calculate = (operation) => {
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);
    if (isNaN(num1) || isNaN(num2)) {
      setError("Please enter valid numbers");
      setResult("");
      return;
    }
    setError("");
    switch (operation) {
      case "+":
        setResult(num1 + num2);
        break;
      case "-":
        setResult(num1 - num2);
        break;
      case "*":
        setResult(num1 * num2);
        break;
      case "/":
        if (num2 === 0) {
          setError("A number can't be divisible by 0");
          setResult("");
          return;
        }
        setResult(num1 / num2);
        break;

      default:
        setError("Invalid operation");
        setResult("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-[720px] mx-auto">
        <div className="relative flex flex-col text-gray-700 bg-white shadow-xl w-96  rounded-xl bg-clip-border">
          <div className="flex flex-col gap-4 p-6">
            <h1 className="text-gray-700 text-center text-xl font-extrabold">
              Simple Calculator
            </h1>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                type="number"
                aria-label="Enter the first number"
                placeholder=" "
                value={number1}
                onChange={(e) => setNumber1(e.target.value)}
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Number 1
              </label>
            </div>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                type="number"
                aria-label="Enter the Second number"
                placeholder=" "
                value={number2}
                onChange={(e) => setNumber2(e.target.value)}
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Number 2
              </label>
            </div>
          </div>
          <div className="p-6 pt-0">
            <button
              className="bg-gray-500 hover:bg-blue-700 active:bg-blue-900 text-white font-bold py-2 px-4 rounded-full"
              type="button"
              onClick={() => calculate("+")}
            >
              +
            </button>
            <button
              className="bg-gray-500 hover:bg-blue-700 active:bg-blue-900 text-white font-bold py-2 px-4 rounded-full"
              type="button"
              onClick={() => calculate("-")}
            >
              -
            </button>
            <button
              className="bg-gray-500 hover:bg-blue-700 active:bg-blue-900 text-white font-bold py-2 px-4 rounded-full"
              type="button"
              onClick={() => calculate("*")}
            >
              X
            </button>
            <button
              className="bg-gray-500 hover:bg-blue-700 active:bg-blue-900 text-white font-bold py-2 px-4 rounded-full"
              type="button"
              onClick={() => calculate("/")}
            >
              /
            </button>
            <button
              className="bg-gray-500 hover:bg-blue-700 active:bg-blue-900 text-white font-bold py-2 px-4 rounded-full"
              type="button"
              onClick={() => {
                setNumber1("");
                setNumber2("");
                setResult("");
                setError("");
              }}
            >
              reset
            </button>
            <p
              className={`flex justify-center mt-6 font-sans text-sm antialiased  leading-normal text-inherit text-red-500`}
            >
              {error}
            </p>
            <p
              className={`flex justify-center mt-6 font-sans text-sm antialiased  leading-normal text-inherit text-green-500`}
            >
              Result : {result}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
