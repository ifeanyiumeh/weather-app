import react from "react";
import "./App.css";

const api = {
  key: "cc67e29c72ce022d5d2e962c06bc92c6",
  base: "http://api.openweathermap.org/data/2.5/l",
};

function App() {
  return (
    <div className="App warm">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search Location..."
          />
        </div>
      </main>
    </div>
  );
}

export default App;
