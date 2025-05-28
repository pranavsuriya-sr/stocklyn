import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSession } from "@/context/session-context";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  Eye,
  EyeOff,
  Loader2Icon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const signupSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .min(3, { message: "Name must have at least 3 characters" })
    .max(20, { message: "Name must have at most 20 characters" }),
  email: z
    .string()
    .email({ message: "Enter a valid email" })
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must have at least 6 characters" }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignUpPage = () => {
  const { session, SignUp } = useSession();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session) {
      navigate("/");
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [session, navigate]);

  async function onSubmit(userInfo: SignupFormValues) {
    const { name, email, password } = userInfo;

    try {
      await SignUp(name, email, password);
      navigate("/");
    } catch (error: any) {
      signupForm.setError("root", {
        message: error.message || "Sign up failed. Please try again.",
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-gray-100 p-4 sm:p-6 md:p-8 mt-16">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden mt-5 mb-16">
        <div className="w-full md:w-1/2 hidden md:flex flex-col justify-center items-start px-10 py-8 bg-slate-50">
          <h1 className="text-3xl font-medium text-gray-800 mb-6">
            Join Maalelo Today!
          </h1>
          <p className="text-base text-gray-600 mb-6 leading-relaxed">
            Create your account to explore a world of opportunities and connect
            with our community.
          </p>

          <div className="space-y-5 w-full">
            <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <h3 className="text-lg font-medium text-indigo-700 mb-3">
                Already a Member?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                If you already have an account, sign in to continue.
              </p>
              <Button
                onClick={() => navigate("/login")}
                variant="outline"
                className="w-full h-11 px-6 rounded-lg border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium text-sm shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] flex items-center justify-center"
              >
                Sign In Here <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Button>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <h3 className="text-lg font-medium text-amber-700 mb-3">
                Want to Sell?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Join our platform as a seller and reach thousands of customers.
              </p>
              <Button
                onClick={() => navigate("/seller/signup")}
                className="w-full h-11 px-6 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] flex items-center justify-center"
              >
                Become a Seller <ArrowUpRightIcon className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
          <p className="mt-8 text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Maalelo. All rights reserved.
          </p>
        </div>

        <div className="w-full md:w-1/2 px-10 py-8 flex flex-col justify-center bg-white relative overflow-hidden">
          <div className="w-full max-w-md space-y-8 mx-auto">
            <div className="text-left">
              <h2 className="text-2xl font-medium text-gray-800">
                Create Your Account
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Fill in the details below to get started.
              </p>
            </div>

            <Form {...signupForm}>
              <form
                onSubmit={signupForm.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {signupForm.formState.errors.root && (
                  <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 mr-2 flex-shrink-0"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{signupForm.formState.errors.root.message}</span>
                  </div>
                )}

                <FormField
                  control={signupForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="signup-name"
                        className="text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative mt-1">
                          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                          <Input
                            id="signup-name"
                            placeholder="Your full name"
                            {...field}
                            className="w-full pl-10 pr-4 py-3 h-11 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:ring-opacity-75 transition-all duration-150 ease-in-out"
                            ref={inputRef}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-600 text-xs mt-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="signup-email"
                        className="text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative mt-1">
                          <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                          <Input
                            id="signup-email"
                            placeholder="you@example.com"
                            {...field}
                            className="w-full pl-10 pr-4 py-3 h-11 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:ring-opacity-75 transition-all duration-150 ease-in-out"
                            autoComplete="email"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-600 text-xs mt-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="signup-password"
                        className="text-sm font-medium text-gray-700"
                      >
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative mt-1 flex items-center">
                          <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            {...field}
                            className="w-full pl-10 pr-12 py-3 h-11 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:ring-opacity-75 transition-all duration-150 ease-in-out"
                            autoComplete="new-password"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none rounded-md hover:bg-gray-100 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-600 text-xs mt-1" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-11 px-6 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-[1.01] flex items-center justify-center"
                  disabled={signupForm.formState.isSubmitting}
                >
                  {signupForm.formState.isSubmitting ? (
                    <Loader2Icon className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    "Create Account"
                  )}
                  {!signupForm.formState.isSubmitting && (
                    <ArrowRightIcon className="h-5 w-5 ml-2" />
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-8 text-center text-xs text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition-colors duration-150 ease-in-out"
              >
                Sign In
              </button>
            </div>
          </div>
          <BorderBeam
            duration={6}
            size={300}
            className="from-transparent via-orange-600 to-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
