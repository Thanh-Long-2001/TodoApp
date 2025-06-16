import { faPlus, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackgroundImg from "../../assets/backgroundTodoApp.png";
import { Link } from "react-router-dom";
import { todoStatus, useTodoStore } from "../../store/todoStore";
import { priors } from "../../store/todoStore";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import dayjs from "dayjs";
import "./Homepage.css";

const getLabelPrior = (value) => {
  const item = priors.find((item) => item.value === value);
  return item.label;
};

const checkDeadline = (value) => {
  if (dayjs(value) < dayjs()) {
    return "border-[2px] border-red-600 border-blink ";
  }
};

const setBgPrior = (value) => {
  if (value === "High") {
    return "bg-red-200  text-red-600 border-red-600 max-md:text-xs text-nowrap";
  } else if (value === "Low") {
    return "bg-blue-300 text-blue-600 border-blue-600 max-md:text-xs text-nowrap";
  } else {
    return "max-md:text-xs text-nowrap";
  }
};

export const Homepage = () => {
  const { todoAllJob, removeTodoJob, updateTodoStatus } = useTodoStore();
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });
  const location = useLocation();
  useEffect(() => {
    if (location.state?.alert) {
      setAlert({
        ...location.state.alert,
        visible: true,
      });

      setTimeout(() => setAlert({ ...alert, visible: false }), 3000);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const allJobTodo = todoAllJob
    ?.filter((item) => item.status === todoStatus.Todo)
    .sort((a, b) => b.id - a.id);

  // console.log(allJobTodo);

  const allJobDone = todoAllJob
    ?.filter((item) => item.status === todoStatus.Done)
    .sort((a, b) => b.id - a.id);

  console.log(todoAllJob);

  return (
    <div className="px-7.5 h-screen  bg-[#f5f9fa]">
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
      <div className="sticky w-full h-23 top-7.5 left-7.5 flex justify-center">
        <h1 className="text-4xl italic text-blink text-nowrap">
          BEST TODO APP
        </h1>
      </div>
      {todoAllJob.length === 0 && (
        <div className="w-full h-[80%] overflow-hidden flex justify-center items-center ">
          <div
            className="bg-cover bg-no-repeat bg-center h-70 w-70"
            style={{ backgroundImage: `url(${BackgroundImg})` }}
          ></div>
        </div>
      )}
      <div
        className={`h-[80%] overflow-hidden overflow-y-auto custom-scroll ${
          todoAllJob.length > 0 ? "" : "hidden"
        }`}
      >
        <div className="">
          {allJobTodo.length > 0 && (
            <div className=" w-full flex flex-col">
              <div className=" gap-2 flex flex-col">
                {allJobTodo.map((item) => (
                  <div
                    className={`grid grid-cols-8 bg-white w-full py-4 rounded-[10px] shadow-lg ${checkDeadline(
                      item.deadline
                    )}`}
                  >
                    <div className="col-span-1 flex justify-center">
                      <div
                        className="w-5 h-5 rounded-full border-1 flex justify-center items-center mt-0.5"
                        onClick={() => removeTodoJob(item.id)}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </div>
                    </div>
                    <Link
                      to="edit-todo"
                      state={item}
                      className="col-span-6 flex flex-col gap-5"
                    >
                      <div className="flex flex-col gap-2 font-normal">
                        <p className="text-3xl font-medium leading-none break-words">
                          {item.todoText}
                        </p>
                        <span className="text-base leading-[100%] text-gray-400">
                          {item.label}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 ">
                        <div
                          className={`px-2 py-1 rounded-[4px] border-[1px] w-fit ${setBgPrior(
                            getLabelPrior(item.priority)
                          )}`}
                        >
                          <span>{getLabelPrior(item.priority)}</span>
                        </div>
                        <div
                          className={` w-fit ${setBgPrior(
                            getLabelPrior(item.priority)
                          )} bg-transparent`}
                        >
                          {item.assignee}
                        </div>
                        <div
                          className={`${setBgPrior(
                            getLabelPrior(item.priority)
                          )} bg-transparent`}
                        >
                          <span>
                            {dayjs(item.deadline).format("DD/MM/YYYY")}
                          </span>
                          <span>{` - ${dayjs(item.deadline).format(
                            "HH:mm"
                          )}`}</span>
                        </div>
                      </div>
                    </Link>
                    <div className="col-span-1 flex justify-center">
                      <div
                        className="w-5 h-5 rounded-[2px] border-1 flex justify-center items-center mt-0.5"
                        onClick={() =>
                          updateTodoStatus(item.id, { status: todoStatus.Done })
                        }
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {allJobDone.length > 0 && (
            <div className=" w-full flex flex-col">
              {allJobDone.length > 0 && allJobTodo.length > 0 && (
                <div className="w-full border-t-[1px] my-10 border-[#b2d7e0]"></div>
              )}
              <div
                className={`${
                  allJobTodo.length === 0 ? "mt-7.5" : ""
                } gap-2 flex flex-col`}
              >
                {allJobDone.map((item) => (
                  <div className="relative">
                    <div className="absolute inset-0 z-1 bg-white opacity-70 cursor-not-allowed rounded-[10px] shadow-lg"></div>
                    <div className="grid grid-cols-8 bg-white w-full py-4 rounded-[10px]">
                      <div className="col-span-1 flex justify-center">
                        <div className="w-5 h-5 rounded-full border-1 flex justify-center items-center mt-0.5">
                          <FontAwesomeIcon icon={faXmark} />
                        </div>
                      </div>
                      <div className="col-span-6 flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                          <p className="text-3xl font-medium leading-none break-words">
                            {item.todoText}
                          </p>
                          <span className="text-base leading-[100%] text-gray-400">
                            {item.label}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-5">
                          <div
                            className={`px-2 py-1 rounded-[4px] border-[1px] w-fit ${setBgPrior(
                              getLabelPrior(item.priority)
                            )}`}
                          >
                            <span>{getLabelPrior(item.priority)}</span>
                          </div>
                          <div
                            className={`${setBgPrior(
                              getLabelPrior(item.priority)
                            )} bg-transparent`}
                          >
                            <span
                              className="${setBgPrior(
                              getLabelPrior(item.priority)
                            )"
                            >
                              {item.assignee}
                            </span>
                          </div>
                          <div
                            className={` ${setBgPrior(
                              getLabelPrior(item.priority)
                            )} bg-transparent`}
                          >
                            <span className="">
                              {dayjs(item.deadline).format("DD/MM/YYYY")}
                            </span>
                            <span>{` - ${dayjs(item.deadline).format(
                              "HH:mm"
                            )}`}</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <div className="w-5 h-5 rounded-[2px] border-1 flex justify-center items-center bg-blue-600 text-white mt-0.5">
                          <FontAwesomeIcon icon={faCheck} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Link to="add-todos">
        <div className="sticky bottom-7.5 z-10 w-full flex justify-end">
          <button className=" bg-[#1692ff] text-white px-[23px] py-4.5 shadow-lg rounded-[6px] ">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </Link>
    </div>
  );
};
