import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState("olive");
  // function changeColor(color) {
  //   setColor(color);
  // }
  return (
    <div
      className="w-full h-screen duration-200"
      style={{ backgroundColor: color }}
    >
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
          <button style={{ backgroundColor: 'red' }}
           onClick={() => setColor('red')}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
          >
            Red
          </button>
          <button style={{ backgroundColor: 'green' }}
           onClick={() => setColor('green')}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
          >
            Green
          </button>
          <button style={{ backgroundColor: 'blue' }}
           onClick={() => setColor('blue')}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
          >
            Blue
          </button>
          <button style={{ backgroundColor: '#ff9933' }}
           onClick={() => setColor('#ff9933')}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
          >
            Saffron
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
