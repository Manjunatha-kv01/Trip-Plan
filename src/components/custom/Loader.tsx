import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loader = () => {
  return (
    <div className="loader-container">
      <AiOutlineLoading3Quarters className="loader animate-spin" />
    </div>
  );
};

export default Loader;
