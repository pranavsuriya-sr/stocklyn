import { api } from "@/api/api";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useSession } from "../../context/session-context";

const ResetAuthPage = () => {
  const { user } = useSession();
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: nameChangeData } = useMutation({
    mutationFn: () => api.get(`/auth/nameChange?id=${user?.id}&name=${name}`),
    onSuccess: () => {
      toast({
        title: "Name changed successfully",
        description: "Your name has been changed successfully",
      });
    },
    onError: () => {
      toast({
        title: "Name change failed",
        description: "Please try again",
      });
    },
  });

  const { mutate: passwordChangeData } = useMutation({
    mutationFn: async () => {
      if (newPassword.length < 6) {
        toast({
          variant: "destructive",
          title: "Password Too Short",
          description: "Your new password must be at least 6 characters long.",
        });
        throw new Error("Password too short");
      }

      if (newPassword !== confirmPassword) {
        toast({
          variant: "destructive",
          title: "Passwords Do Not Match",
          description:
            "Please ensure the new password and confirm password fields are identical.",
        });
        throw new Error("Passwords do not match");
      }
      return api.post(
        `/auth/resetPassword`,
        {
          id: user?.id,
          password: currentPassword,
          newPassword: newPassword,
        },
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Password changed successfully",
        description: "Your password has been changed successfully",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Password change failed",
        description: "Please check your current password or try again.",
        duration: 3000,
      });
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-16 font-montserrat mt-16">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
            Account Settings
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Manage your personal information and password.
          </p>
        </header>

        <section className="bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-100">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-1">
                Update Your Name
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Change the name associated with your account.
              </p>
            </div>
            <div>
              <label
                htmlFor="newName"
                className="block text-sm font-medium text-slate-600 mb-1.5"
              >
                Full Name
              </label>
              <input
                id="newName"
                name="newName"
                type="text"
                autoComplete="name"
                required
                placeholder="Enter your full name"
                className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm placeholder-slate-400 transition duration-150 ease-in-out"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2.5 px-6 border border-transparent shadow-md text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
                onClick={() => nameChangeData()}
              >
                Save Name
              </button>
            </div>
          </form>
        </section>

        <section className="mt-10 bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-100">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-1">
                Change Your Password
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Choose a strong password that you haven't used elsewhere.
              </p>
            </div>
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-slate-600 mb-1.5"
              >
                Current Password
              </label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                autoComplete="current-password"
                required
                value={currentPassword}
                placeholder="Enter your current password"
                className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm placeholder-slate-400 transition duration-150 ease-in-out"
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-slate-600 mb-1.5"
              >
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                required
                value={newPassword}
                placeholder="Enter your new password"
                className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm placeholder-slate-400 transition duration-150 ease-in-out"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium text-slate-600 mb-1.5"
              >
                Confirm New Password
              </label>
              <input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                placeholder="Confirm your new password"
                className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm placeholder-slate-400 transition duration-150 ease-in-out"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2.5 px-6 border border-transparent shadow-md text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
                onClick={() => passwordChangeData()}
              >
                Update Password
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ResetAuthPage;
