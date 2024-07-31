import React, { useState } from "react";
import "./App.css";

function App() {
  const [names, setNames] = useState([]);
  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [result, setResult] = useState(null);

  const addName = () => {
    if (names.includes(name)) {
      alert("이미 이름이 존재합니다.");
      return;
    }

    if (name && !names.includes(name)) {
      setNames([...names, name]);
      setName("");
    }
  };

  const removeName = (removeName) => {
    setNames(names.filter((name) => name !== removeName));
  };

  const startSelection = () => {
    if (names.length <= count) {
      alert("참여 인원 수가 입력된 인원 보다 같거나 적습니다.");
      return;
    }

    const participationCount = Math.min(parseInt(count, 10), names.length);
    const shuffled = [...names].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, participationCount);
    const unselected = shuffled.slice(participationCount);
    setResult({ selected, unselected });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addName();
    }
  };

  return (
    <div className="App">
      <h1>❤️종필짱❤️을 위한 🩷🩷랜덤 뽑기🩷🩷</h1>
      <div className="input-container">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="이름을 입력하세요"
          />
          <button onClick={addName}>추가</button>
        </div>

        <div>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            placeholder="참여 인원 수"
          />
          <button
            style={{
              backgroundColor: "#FD8FAA",
              color: "white",
              fontWeight: "bold",
              border: "1px solid #FFC2D2",
            }}
            onClick={startSelection}
          >
            시작
          </button>
        </div>
      </div>

      <div style={{ width: "50%" }}>
        {names.length > 0 && <h3>입력된 인원</h3>}
        <ul style={{ width: "100%" }}>
          {names.map((name, index) => (
            <li key={index} onClick={() => removeName(name)}>
              {name}
            </li>
          ))}
        </ul>
      </div>

      {result && (
        <div style={{ width: "50%" }}>
          <h2>참 인원</h2>
          <ul>
            {result.selected.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
          <h2>불참 인원</h2>
          <ul>
            {result.unselected.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
