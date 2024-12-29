import { useState } from "react";

const TestState = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <button
        className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        onClick={() => setCount(count + 1)}
      >
        Click me
      </button>
      <p>you clicked me {count} times.</p>
    </>
  );
};

export default TestState;
