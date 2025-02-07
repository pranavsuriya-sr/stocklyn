import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 px-4">
      <h1 className="text-9xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8 text-center">
        The page you are looking for could not be found.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 border border-gray-800 text-gray-800 px-6 py-3 rounded hover:bg-gray-100 transition"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Go Back</span>
      </button>
    </div>
  );
};

export default NotFoundPage;
