import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackgroundImg from "../../assets/backgroundTodoApp.png";
import { useNavigate } from "react-router-dom";
export const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="px-7.5 pt-7.5 min-h-screen bg-[#f5f9fa]">
      <h1 className="fixed text-5xl top-12 left-7.5">Todos</h1>
      <div className="w-full h-full min-h-screen  flex justify-center items-center ">
        <div
          className="bg-cover bg-no-repeat bg-center h-70 w-70 mb-7.5"
          style={{ backgroundImage: `url(${BackgroundImg})` }}
        ></div>
      </div>
      <button
        className="fixed bottom-7.5 right-7.5 bg-[#1692ff] text-white px-[23px] py-4.5 shadow-lg rounded-[6px]"
        onClick={() => navigate("/add-todos")}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};
