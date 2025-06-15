import { faAngleDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTodoStore } from "../../store/todoStore";
import { useState, useEffect } from "react";
import { labels, priors } from "../../store/todoStore";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { useNavigate, useLocation } from "react-router-dom";

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
    updateTodoStatus,
  } = useTodoStore();
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const editItem = location.state;

  useEffect(() => {
    if (editItem) {
      setTodoText(editItem.todoText);
      setSelectedLabel(editItem.label);
      setPriority(editItem.priority);
    } else {
      resetTodoState();
    }
  }, [editItem]);

  const showAlert = (type, message) => {
    setAlert({ type, message, visible: true });
    setTimeout(() => setAlert({ ...alert, visible: false }), 3000);
  };

  const handleSubmit = (e) => {
    console.log(todoText, selectedLabel, priority, status);

    if (todoText.trim() === "") {
      showAlert("error", "Todo Name cannot be empty");
      return;
    }

    if (selectedLabel.trim() === "") {
      showAlert("error", "Label cannot be empty");
      return;
    }

    if (editItem) {
      updateTodoStatus(editItem.id, {
        todoText: todoText,
        label: selectedLabel,
        priority: priority,
      });
    } else {
      addTodoJob();
    }
    setIsSubmitting(true);

    showAlert(
      "success",
      `${editItem ? "Edit successfully" : "Create successfully"}`
    );
    setTimeout(() => {
      navigate("/");
    }, 3000);
    resetTodoState();
  };

  return (
    <div className="px-7.5 pt-7.5 min-h-screen flex flex-col justify-between">
      {alert.visible && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md">
          <Collapse in={alert.visible}>
            <Alert
              severity={alert.type}
              onClose={() => setAlert({ ...alert, visible: false })}
            >
              {alert.message}
            </Alert>
          </Collapse>
        </div>
      )}
      <div>
        <div className="flex justify-between">
          <h1 className="mt-4.5 text-5xl">
            {editItem ? "Edit Todo" : "Add Todo"}
          </h1>
          <div className="flex items-start">
            <Link to="/">
              <button className="text-2xl mt-0">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </Link>
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
          disabled={isSubmitting}
          className={`bg-[#1692ff] text-white w-full py-4 rounded-lg shadow-md hover:bg-[#127fd1] ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handleSubmit()}
        >
          {editItem ? "Edit" : "Done"}
        </button>
      </div>
    </div>
  );
};
