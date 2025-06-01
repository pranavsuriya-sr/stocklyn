import { ArrowLeft, Home, PackageX } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-700 px-4 py-12 font-montserrat">
      <div className="max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <PackageX className="w-32 h-32 text-indigo-400" strokeWidth={1.5} />
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold text-indigo-600 mb-6">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-4">
          Oops! Page Not Found.
        </h2>
        <p className="text-base sm:text-lg text-slate-500 mb-10 leading-relaxed">
          We're sorry, but the page you were looking for doesn't seem to exist
          or may have been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <Home size={20} />
            <span>Go to Homepage</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
