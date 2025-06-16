import { faAngleDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTodoStore } from "../../store/todoStore";
import { useState, useEffect } from "react";
import {
  labels,
  priors,
  todoStatus,
  listAssignee,
} from "../../store/todoStore";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { useNavigate, useLocation } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import dayjs from "dayjs";

const getValidDay = (deadline) => {
  if (typeof deadline === "string") {
    return dayjs(deadline);
  } else {
    return deadline;
  }
};
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
    updateTodoStatus,
    deadline,
    setDeadline,
    formatDeadlineToDay,
    setFormatDeadline,
    todoAllJob,
    assignee,
    setAssignee,
  } = useTodoStore();
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });
  const [checkValidForm, setValidForm] = useState(true);
  let [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const editItem = location.state;

  useEffect(() => {
    if (editItem) {
      setTodoText(editItem.todoText);
      setSelectedLabel(editItem.label);
      setIsSubmitting(true);
      setPriority(editItem.priority);
      setDeadline(editItem.deadline);
      setFormatDeadline(editItem.deadline);
      setAssignee(editItem.assignee);
    } else {
      resetTodoState();
    }
  }, [editItem || null]);

  // check valid day
  const checkValidDay = (deadline) => {
    if (dayjs(deadline) < dayjs()) {
      setFormatDeadline(dayjs().add(2, "hour").toISOString());
      setDeadline(dayjs().add(2, "hour").toISOString());
    }
  };

  // check allow submit
  if (todoText && selectedLabel && assignee) {
    isSubmitting = true;
  } else if (!todoText || !selectedLabel || !assignee) {
    isSubmitting = false;
  }

  const showAlert = (type, message) => {
    setAlert({ type, message, visible: true });
    setTimeout(() => setAlert({ ...alert, visible: false }), 3000);
  };

  // check valid form
  const checkValidInputBlur = (type) => {
    if (!type) {
      setValidForm(false);
      return;
    }
  };

  const handleSubmit = () => {
    //check existed todo
    const existedTodo = todoAllJob.find((i) => {
      if (editItem) {
        return (
          i.todoText === todoText &&
          i.status === todoStatus.Todo &&
          i.label === selectedLabel &&
          i.assignee === assignee &&
          i.id !== editItem.id
        );
      } else {
        return (
          i.todoText === todoText &&
          i.status === todoStatus.Todo &&
          i.label === selectedLabel &&
          i.assignee === assignee
        );
      }
    });

    if (existedTodo) {
      showAlert("error", "Todo Existed");
      return;
    }

    if (editItem) {
      updateTodoStatus(editItem.id, {
        todoText: todoText,
        label: selectedLabel,
        priority: priority,
        deadline: deadline,
        formatDeadlineToDay: deadline,
        assignee: assignee,
      });
    } else {
      addTodoJob();
    }

    navigate("/", {
      state: {
        alert: {
          type: "success",
          message: `${editItem ? "Edit successfully" : "Create successfully"}`,
        },
      },
    });
    resetTodoState();
    setIsSubmitting(false);
  };
  return (
    <div className="px-7.5 py-7.5 h-screen flex flex-col justify-between">
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
              <button
                className="text-2xl mt-0"
                onClick={() => resetTodoState()}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </Link>
          </div>
        </div>

        <form className="w-full mt-10 flex flex-col gap-6 ">
          <div className="">
            <label
              htmlFor="labelSelect"
              className=" mb-2 text-gray-700 flex flex-col"
            >
              <span>Deadline</span>
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimeField
                value={getValidDay(formatDeadlineToDay, editItem)}
                onBlur={() => checkValidDay(formatDeadlineToDay)}
                onChange={(value) => {
                  setFormatDeadline(value);
                  setDeadline(value.toISOString());
                }}
                format="L HH:mm"
                sx={{
                  width: "100%",
                  height: "42px",
                  "& .MuiPickersSectionList-root": {
                    paddingTop: "9.5px",
                    paddingBottom: "9.5px",
                    paddingLeft: "2px",
                  },
                }}
              />
            </LocalizationProvider>
          </div>
          <div>
            <label
              htmlFor="labelSelect"
              className=" mb-2 text-gray-700 flex flex-col"
            >
              <span>To-do</span>
            </label>
            <input
              type="text"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              onBlur={() => checkValidInputBlur(todoText)}
              placeholder="What needs to be done?"
              className="border w-full  border-gray-300 rounded-lg px-4 h-10.5 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            />
            <span
              className={`text-sm text-red-500 ${
                !checkValidForm && !todoText ? "" : "hidden"
              }`}
            >
              Todo is required
            </span>
          </div>

          <div>
            <label
              htmlFor="labelSelect"
              className=" mb-2 text-gray-700 flex flex-col"
            >
              <span>Label</span>
            </label>

            <div
              className="w-full border border-gray-300 rounded-lg h-11 flex justify-between items-center text-gray-400 relative "
              // onBlur={() => checkValidInputBlur()}
            >
              <select
                id="labelSelect"
                value={selectedLabel}
                onChange={(e) => setSelectedLabel(e.target.value)}
                onBlur={() => checkValidInputBlur(selectedLabel)}
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
            <span
              className={`text-sm text-red-500 ${
                !checkValidForm && !selectedLabel ? "" : "hidden"
              }`}
            >
              Label is required
            </span>
          </div>
          <div>
            <label htmlFor="labelSelect" className="block mb-2 text-gray-700">
              Priority
            </label>
            <Box sx={{ width: "100%" }}>
              <Slider
                aria-label="Always visible"
                defaultValue={priors[0].value}
                value={priority}
                onChange={(e, newValue) => setPriority(newValue)}
                step={1}
                marks={priors}
                min={0}
                max={2}
                sx={{
                  color: "#ccc",

                  "& .MuiSlider-mark": {
                    width: 8,
                    height: 8,
                    backgroundColor: "#fff !important",
                    border: "1px solid #1692ff",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  },
                  '& [data-index="0"].MuiSlider-mark': {
                    transform: "translate(0%, -50%)",
                  },
                  '& [data-index="2"].MuiSlider-mark': {
                    top: "50%",
                    transform: "translate(-100%, -50%)",
                  },
                  "& .MuiSlider-thumb": {
                    transform:
                      priority === 0
                        ? "translate(0%, -50%)"
                        : priority === 1
                        ? "translate(-50%, -50%)"
                        : "translate(-100%, -50%)",
                  },
                  '& [data-index="0"].MuiSlider-markLabel': {
                    transform: "translateX(1px)",
                  },
                  '& [data-index="2"].MuiSlider-markLabel': {
                    transform: "translateX(-28px)",
                  },
                }}
              />
            </Box>
          </div>
          <div className="">
            <label
              htmlFor="labelSelect"
              className=" mb-2 text-gray-700 flex flex-col"
            >
              <span>Assignee</span>
            </label>
            <div className="w-full border border-gray-300 rounded-lg h-11 flex justify-between items-center text-gray-400 relative">
              <select
                id="labelSelect"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                onBlur={() => checkValidInputBlur(assignee)}
                className="appearance-none w-full h-full px-4 text-gray-700 focus:outline-none"
              >
                <option hidden className="flex justify-between">
                  Choose
                </option>
                {listAssignee.map((opt, index) => (
                  <option key={index} value={opt} className="">
                    {opt}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
            </div>
            <span
              className={`text-sm text-red-500 ${
                !checkValidForm && !assignee ? "" : "hidden"
              }`}
            >
              Assignee is required
            </span>
          </div>
        </form>
      </div>

      <div className="w-full">
        <button
          type="submit"
          disabled={!isSubmitting}
          className={`bg-[#1692ff] text-white w-full py-4 rounded-lg shadow-md hover:bg-[#127fd1] ${
            !isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handleSubmit()}
        >
          {editItem ? "Edit" : "Done"}
        </button>
      </div>
    </div>
  );
};
