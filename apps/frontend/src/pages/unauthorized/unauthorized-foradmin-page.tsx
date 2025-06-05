import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

const UnauthorizedAdminPage = () => {
  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center text-center p-4">
      <ShieldAlert size={64} className="text-red-500 mb-6" />
      <h1 className="text-4xl font-bold text-white mb-4 font-poppins">
        Access Denied
      </h1>
      <p className="text-lg text-neutral-300 mb-8 max-w-md font-poppins">
        You do not have the necessary permissions to access the Admin Portal.
        Please contact your administrator if you believe this is an error.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 transition-colors duration-200 font-poppins"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default UnauthorizedAdminPage;
