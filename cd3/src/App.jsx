import React, { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [updatedValue, updater] = useState([]);
  const [isSave, setIsSave] = useState(true);
  const [storeIndex, setStoreIndex] = useState(null);
  const [isLineOver, setLineOver] = useState([]); // Tracks line-through for each item

  const inputValue = (event) => {
    setValue(event.target.value);
  };

  const addItem = () => {
    if (value.trim() !== "") {
      updater((prev) => [...prev, value]);
      setLineOver((prev) => [...prev, false]); // Add false for the new item's line-through state
      setValue("");
    }ls

  };

  const remove = (index) => {
    updater((prev) => prev.filter((_, i) => i !== index));
    setLineOver((prev) => prev.filter((_, i) => i !== index)); // Remove line-through state
  };

  const removeAll = () => {
    updater([]);
    setLineOver([]);
  };

  const editBtn = (elem, index) => {
    setIsSave(false);
    setValue(elem);
    setStoreIndex(index);
  };

  const setBool = () => {
    setIsSave(true);
    updater((prev) => {
      prev[storeIndex] = value;
      return [...prev];
    });
    setValue("");

    
    // setStoreIndex(null);
  };

  const toggleLineOver = (index) => {
    setLineOver((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>To Do List</h1>
      </div>
      <div className="form">
        <input type="text"
         onChange={inputValue} 
         value={value} 
         
         style={{
          margin: "7px",
         backgroundColor: Colorcode[index]
            ? "yellow"
            : "none",
        }}
         
         
         
         /> 
        {isSave ? (
          <button onClick={addItem}>
            <span>Add</span>
          </button>
        ) : (
          <button onClick={setBool}>Edit & Save</button>
        )}
      </div>
      <div>
        <ul>
          {updatedValue.map((item, index) => (
            <div key={index} style={{ margin: "7px" }}>
              <li>
                <button onClick={() => toggleLineOver(index)}>
                  {isLineOver[index] ? "✔" : "."}
                </button>
                <span
                  style={{
                    margin: "7px",
                    textDecoration: isLineOver[index]
                      ? "line-through"
                      : "none",
                  }}
                >
                  {item}
                </span>
                <button
                  onClick={() => remove(index)}
                  className="remove-btn"
                  style={{ marginLeft: "auto" }}
                >
                  Delete
                </button>
                <button    style={{ marginLeft: "5px" }} onClick={() => editBtn(item, index)}>Edit</button>
              </li>
            </div>
          ))}
        </ul>
      </div>
      <button
        style={{
          margin: "17px",
          textAlign: "center",
          marginLeft: "230px",
        }}
        onClick={removeAll}
      >
        Remove All
      </button>
    </div>
  );
}

export default App;
