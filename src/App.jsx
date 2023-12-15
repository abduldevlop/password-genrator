import React, { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);

  const passwordRef = useRef();
  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTOVWXYZabcdefghijklmnopqrstupwxyz";
    if (number) str += "0123456789";
    if (character) str += "@#$%^&*()_+";

    // for loop
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [number, character, setPassword, length]);

  useEffect(() => {
    generatePassword();
  }, [length, number, character, generatePassword]);

  return (
    <div className="bg-black w-full h-screen flex justify-center items-center">
      <div className="w-[500px] mx-auto text-center h-auto px-4 py-6 bg-gray-500 text-white rounded-lg">
        <input
          type="text"
          value={password}
          className="w-[300px] border 1px bg-gray-700 rounded-md px-4 py-2 bg-transparent outline-none text-white"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          className="px-4 py-2 bg-blue-700 text-white rounded-md"
          onClick={copyToClipboard}
        >
          COPY
        </button>

        <div className="mt-5 flex gap-2 items-center justify-center">
          <input
            type="range"
            className="text-blue-800 cursor-pointer"
            min={8}
            max={15}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
          <input
            type="checkbox"
            onClick={() => setNumber((prev) => !prev)}
            defaultChecked={number}
          />
          <label>Numbers</label>
          <input
            type="checkbox"
            onClick={() => setCharacter((prev) => !prev)}
            defaultChecked={character}
          />
          <label>Characters</label>
        </div>
      </div>
    </div>
  );
};

export default App;
