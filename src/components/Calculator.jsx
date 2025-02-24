import { useState } from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import useSound from "use-sound";
import clickSound from "../assets/click.mp3"; // Ensure this file exists

const Calculator = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [playClick] = useSound(clickSound);

  const handleClick = (value) => {
    playClick();

    if (value === "=") {
      try {
        const result = eval(input).toString();
        setHistory([...history, `${input} = ${result}`]);
        setInput(result);
      } catch {
        setInput("Error");
      }
    } else if (value === "C") {
      setInput("");
    } else if (value === "⌫") { // Backspace Functionality
      setInput(input.slice(0, -1));
    } else {
      setInput(input + value);
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className={`p-6 rounded-lg shadow-xl w-80 transition-all duration-300 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        
        {/* Theme Toggle */}
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="mb-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition flex justify-center items-center w-10 h-10"
        >
          {darkMode ? <FiSun size={22} /> : <FiMoon size={22} />}
        </button>

        {/* Display */}
        <div className={`mb-4 p-3 rounded text-right text-2xl transition-all duration-300 ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}>
          {input || "0"}
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-2">
          {["(", ")", "C", "⌫", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", ".", "0", "="].map((item) => (
            <motion.button
              key={item}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleClick(item)}
              className={`p-4 rounded-lg text-xl font-semibold transition-all duration-200 
                ${darkMode ? "bg-gray-600 text-white hover:bg-gray-500" : "bg-gray-200 text-black hover:bg-gray-300"}`}
            >
              {item}
            </motion.button>
          ))}
        </div>

        {/* Calculation History */}
        <div className={`p-4 rounded-lg mt-4 ${darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"}`}>
          <h3 className="text-lg font-bold mb-2">History</h3>
          {history.map((entry, index) => (
            <p key={index} className="text-sm">{entry}</p>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Calculator;
