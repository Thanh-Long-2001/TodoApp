import { faPlus, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackgroundImg from "../../assets/backgroundTodoApp.png";
import { Link } from "react-router-dom";
import { todoStatus, useTodoStore } from "../../store/todoStore";
import { priors } from "../../store/todoStore";

const getLabelPrior = (value) => {
  const item = priors.find((item) => item.value === value);
  return item.label;
};

const setBgPrior = (value) => {
  if (value === "High") {
    return "bg-red-200  text-red-600 border-red-600";
  } else if (value === "Low") {
    return "bg-blue-300 text-blue-600 border-blue-600";
  }
};

export const Homepage = () => {
  const { todoAllJob, removeTodoJob, updateTodoStatus } = useTodoStore();
  const allJobTodo = todoAllJob
    ?.filter((item) => item.status === todoStatus.Todo)
    .sort((a, b) => b.id - a.id);
  const allJobDone = todoAllJob
    ?.filter((item) => item.status === todoStatus.Done)
    .sort((a, b) => b.id - a.id);
  console.log(todoAllJob);
  return (
    <div className="px-7.5 pt-7.5 min-h-screen bg-[#f5f9fa]">
      <h1 className=" text-5xl left-7.5">Todos</h1>
      {todoAllJob.length === 0 && (
        <div className="w-full h-full min-h-screen  flex justify-center items-center ">
          <div
            className="bg-cover bg-no-repeat bg-center h-70 w-70 mb-7.5"
            style={{ backgroundImage: `url(${BackgroundImg})` }}
          ></div>
        </div>
      )}
      <div className="mt-7.5 w-full flex flex-col gap-2">
        {allJobTodo.length > 0 &&
          allJobTodo.map((item) => (
            <div className="grid grid-cols-8 bg-white w-full py-4 rounded-[10px]">
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
                <div
                  className={`px-2 py-1 rounded-[4px] border-[1px] w-fit ${setBgPrior(
                    getLabelPrior(item.priority)
                  )}`}
                >
                  {getLabelPrior(item.priority)}
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

      <div className="w-full flex flex-col gap-2">
        {allJobDone.length > 0 && allJobTodo.length > 0 && (
          <div className="w-full border-t-[1px] my-10 border-[#b2d7e0]"></div>
        )}
        {allJobDone &&
          allJobDone.map((item) => (
            <div className="relative">
              <div className="absolute inset-0 z-1 bg-white opacity-70 cursor-not-allowed rounded-[10px]"></div>
              <div className="grid grid-cols-8 bg-white w-full py-4 rounded-[10px]">
                <div className="col-span-1 flex justify-center">
                  <div
                    className="w-5 h-5 rounded-full border-1 flex justify-center items-center mt-0.5"
                    // onClick={() => removeTodoJob(item.id)}
                  >
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
                  <div
                    className={`px-2 py-1 rounded-[4px] border-[1px] w-fit ${setBgPrior(
                      getLabelPrior(item.priority)
                    )}`}
                  >
                    {getLabelPrior(item.priority)}
                  </div>
                </div>
                <div className="col-span-1 flex justify-center">
                  <div
                    className="w-5 h-5 rounded-[2px] border-1 flex justify-center items-center bg-blue-600 text-white mt-0.5"
                    // onClick={() => updateTodoStatus(item.id, todoStatus.Done)}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <Link to="add-todos">
        <button className="fixed bottom-7.5 right-7.5 bg-[#1692ff] text-white px-[23px] py-4.5 shadow-lg rounded-[6px] z-10">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </Link>
    </div>
  );
};
