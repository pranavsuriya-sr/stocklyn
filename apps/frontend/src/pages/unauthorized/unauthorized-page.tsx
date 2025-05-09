import { ShieldAlert } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/seller/signup");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 pt-28">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <ShieldAlert className="mx-auto h-16 w-16 text-red-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-600 mb-4">
          You are not authorized to access the Seller Portal.
        </p>
        <p className="text-gray-600 mb-8">
          Please sign up as a seller to gain access to this area. If you believe
          this is an error, please contact support.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleSignUp}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-150 ease-in-out"
          >
            Sign Up as Seller
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-150 ease-in-out"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
