import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
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
    <div className="pt-28">
      <div className="flex flex-col justify-center items-center h-5/6 pt-20">
        <h1 className="text-gray-600 font-serif text-3xl p-3">Login</h1>
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onSubmit)}
            className="space-y-4 border-black border rounded-md p-6 w-full max-w-md"
          >
            {loginForm.formState.errors.root && (
              <div className="text-red-500 text-sm">
                {loginForm.formState.errors.root.message}
              </div>
            )}

            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription>This is your Email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} type="password" />
                  </FormControl>
                  <FormDescription>This is your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="flex justify-center items-center bg-green-500 hover:bg-green-400"
              disabled={loginForm.formState.isSubmitting}
            >
              <span className="pb-1">Log In</span>
              <LogIn />
            </Button>
          </form>
        </Form>
        <h1>
          Don't have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up!
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Login;
