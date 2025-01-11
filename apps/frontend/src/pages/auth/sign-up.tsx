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
import { supabaseClient } from "@/utils/supabase-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "@supabase/supabase-js";
import axios from "axios";
import Cookies from "js-cookie";
import { CornerDownRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  name: z
    .string()
    .nonempty()
    .min(3, { message: "name must have at least 3 characters" })
    .max(20, { message: "name must have at most 20 characters" }),
  email: z.string().email({ message: "Enter a valid email" }).nonempty(),
  password: z
    .string()
    .nonempty()
    .min(6, { message: "password must have at least 6 characters" }),
});

const SignUp = () => {
  const navigate = useNavigate();

  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        navigate("/");
      }
    });
  }, [session]);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(userInfo: z.infer<typeof loginSchema>) {
    const { name, email, password } = userInfo;

    const user = await axios.post(
      "http://localhost:5000/auth/signup",
      {
        name,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    console.log(user);
  }

  console.log(Cookies.get("authToken"));

  if (!session) {
    return (
      <div className="pt-28">
        <div className="flex flex-col justify-center items-center h-auto pt-10">
          <h1 className="text-gray-600 font-serif text-3xl p-3">Sign Up</h1>
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(onSubmit)}
              className="space-y-4 border-black border rounded-md p-6 w-full max-w-md "
            >
              <FormField
                control={loginForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl ">Display Name</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl ">Email</FormLabel>
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
                      <Input
                        placeholder="password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormDescription>This is your password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="flex justify-center items-center bg-green-500 hover:bg-green-400"
              >
                <span className="pb-0.5">SignUp</span>
                <CornerDownRight />
              </Button>
            </form>
          </Form>
          <h1>
            Already have an account?{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login!
            </span>
          </h1>
        </div>
      </div>
    );
  }
};

export default SignUp;
