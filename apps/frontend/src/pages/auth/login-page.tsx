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
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChromeIcon,
  GitCompare,
  Loader2Icon,
  LockIcon,
  LockKeyholeIcon,
  MailIcon,
} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useSession } from "../../context/session-context";

const loginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }).nonempty(),
  password: z
    .string()
    .nonempty()
    .min(6, { message: "password must have at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { login, session } = useSession();

  useEffect(() => {
    // If already logged in, redirect to home
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      await login(values.email, values.password);
      navigate("/");
    } catch (error: any) {
      loginForm.setError("root", {
        message: error.message || "Login failed",
      });
    }
  }

  return (
    <div className="min-h-screen py-28">
      <div className="flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          {/* Animated Header */}
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-4 ">
              <LockKeyholeIcon className="h-8 w-8 text-indigo-600" />
              <h1 className="text-4xl font-bold text-indigo-600 hover:text-indigo-700 ">
                Welcome Back
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Continue your shopping journey
            </p>
          </div>

          {/* Card-like Form Container */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transition-all hover:shadow-2xl">
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {loginForm.formState.errors.root && (
                  <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    ⚠️ {loginForm.formState.errors.root.message}
                  </div>
                )}

                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            placeholder="hello@example.com"
                            {...field}
                            className="pl-10 py-5 rounded-lg"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            className="pl-10 py-5 rounded-lg"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full py-6 rounded-xl  bg-emerald-500 hover:bg-emerald-600  transition-all transform hover:scale-[1.01] shadow-md hover:shadow-lg"
                  disabled={loginForm.formState.isSubmitting}
                >
                  <span className="text-lg font-semibold text-white mr-2">
                    {loginForm.formState.isSubmitting ? (
                      <Loader2Icon className="h-5 w-5 animate-spin" />
                    ) : (
                      "Sign In"
                    )}
                  </span>
                  <ArrowRightIcon className="h-5 w-5 text-white" />
                </Button>
              </form>
            </Form>

            {/* Social Login Divider */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="py-5 rounded-lg border-gray-300 hover:bg-gray-50"
                >
                  <GitCompare className="h-5 w-5 mr-2" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  className="py-5 rounded-lg border-gray-300 hover:bg-gray-50"
                >
                  <ChromeIcon className="h-5 w-5 mr-2" />
                  Google
                </Button>
              </div>
            </div>
          </div>

          {/* Signup Link */}
          <div className="text-center text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors underline underline-offset-4 hover:decoration-2"
            >
              Create one now
              <ArrowUpRightIcon className="h-4 w-4 inline-block ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
