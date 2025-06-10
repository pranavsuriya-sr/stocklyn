import { useSession } from "@/context/session-context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { adminLogin, session } = useSession();

  useEffect(() => {
    if (session) {
      navigate("/admin/dashboard");
    }
  }, [session, navigate]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await adminLogin(email, password);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-montserrat bg-cover bg-center mt-16"
      style={{
        backgroundImage:
          "url('https://5etc1h1k7l.ufs.sh/f/yirKWcY4mxCceqlp4PgEaBkC5fhUSGXzrNRWiV0mM9eIYn3A')",
      }}
    >
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Admin Portal Access
          </h1>
          <p className="mt-2 text-center text-sm text-slate-200">
            Please sign in to manage the platform.
          </p>
        </div>

        <div className="rounded-xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-lg space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-200 mb-1.5"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="block w-full px-4 py-3 rounded-lg border-white/30 bg-white/20 text-white shadow-sm focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300 sm:text-sm placeholder-slate-300 transition duration-150 ease-in-out"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-200 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="block w-full px-4 py-3 rounded-lg border-white/30 bg-white/20 text-white shadow-sm focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300 sm:text-sm placeholder-slate-300 transition duration-150 ease-in-out"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150 ease-in-out"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
        <p className="mt-8 text-center text-xs text-slate-300">
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
