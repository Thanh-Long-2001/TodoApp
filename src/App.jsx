import { Homepage } from "./components/home/Homepage";
import { AddTodo } from "./components/Pages/AddTodo";
import { Route } from "react-router-dom";
import { Routes } from "react-router";
import "./App.css";
function App() {
  return (
    <div className="max-w-[640px] w-full mx-auto">
      <div className="w-full ">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/add-todos" element={<AddTodo />} />
          <Route path="/edit-todo" element={<AddTodo />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
