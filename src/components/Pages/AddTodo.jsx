import { faAngleDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useTodoStore } from "../../store/todoStore";
import { useState } from "react";
import { labels, priors } from "../../store/todoStore";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

export const AddTodo = () => {
  const {
    todoText,
    setTodoText,
    selectedLabel,
    setSelectedLabel,
    priority,
    setPriority,
    addTodoJob,
    resetTodoState,
    status,
    todoAllJob,
  } = useTodoStore();
  console.log(todoAllJob);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log(todoText, selectedLabel, priority, status);

    if (todoText.trim() === "") return;
    addTodoJob();
    resetTodoState();
  };

  return (
    <div className="px-7.5 pt-7.5 min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex justify-between">
          <h1 className="mt-4.5 text-5xl">Add Todo</h1>
          <div className="flex items-start">
            <button className="text-2xl mt-0" onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
        <form className="w-full mt-10 flex flex-col gap-6 ">
          <div>
            <label htmlFor="labelSelect" className="block mb-2 text-gray-700">
              To-do
            </label>
            <input
              type="text"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              placeholder="What needs to be done?"
              className="border w-full  border-gray-300 rounded-lg px-4 h-11 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            />
          </div>
          <div>
            <label htmlFor="labelSelect" className="block mb-2 text-gray-700">
              Label
            </label>
            <div className="w-full border border-gray-300 rounded-lg h-11 flex justify-between items-center text-gray-400 relative">
              <select
                id="labelSelect"
                value={selectedLabel}
                onChange={(e) => setSelectedLabel(e.target.value)}
                className="appearance-none w-full h-full px-4 text-gray-700 focus:outline-none"
              >
                <option hidden className="flex justify-between">
                  Select label
                </option>
                {labels.map((opt) => (
                  <option key={opt.name} value={opt.name} className="">
                    {opt.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="labelSelect" className="block mb-2 text-gray-700">
              Priority
            </label>
            <Box sx={{ width: "100%" }}>
              <Slider
                aria-label="Always visible"
                defaultValue={priors[0].value}
                onChange={(e, newValue) => setPriority(newValue)}
                // getAriaValueText={valuetext}
                step={1}
                marks={priors}
                // valueLabelDisplay="on"
                min={0}
                max={2}
                sx={{
                  color: "#ccc",
                  "& .MuiSlider-mark": {
                    width: 8,
                    height: 8,
                    border: "1px solid #1692ff",
                    borderRadius: "50%",
                  },
                  "& .css-1xcmt9q-MuiSlider-thumb": {
                    backgroundColor: "#fff !important",
                    border: "1px solid #1692ff",
                  },
                }}
              />
            </Box>
          </div>
        </form>
      </div>

      <div className="w-full mb-7.5">
        <button
          type="submit"
          className="bg-[#1692ff] text-white w-full py-4 rounded-lg shadow-md hover:bg-[#127fd1]"
          onClick={() => handleSubmit()}
        >
          Done
        </button>
      </div>
    </div>
  );
};
