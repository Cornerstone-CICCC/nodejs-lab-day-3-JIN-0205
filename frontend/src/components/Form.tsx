import { useState } from "react";
import { socket } from "../socket";
const Form = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    socket.timeout(5000).emit("create-something", value, () => {
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        className="border-2 border-black"
        onChange={(e) => setValue(e.target.value)}
      />

      <button
        className="border-2 border-black"
        type="submit"
        disabled={isLoading}
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
