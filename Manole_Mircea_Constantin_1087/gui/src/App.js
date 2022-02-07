import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Meeting } from "./components/Meeting";
import { Participant } from "./components/Participant";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/meeting" exact element={<Meeting />}></Route>
          <Route path="/participant" exact element={<Participant />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
