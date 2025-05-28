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
  Eye,
  EyeOff,
  HomeIcon,
  Loader2Icon,
  LockIcon,
  MailIcon,
  StoreIcon,
  UserIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  name: z
    .string()
    .nonempty()
    .min(3, { message: "Name must have at least 3 characters" })
    .max(20, { message: "Name must have at most 20 characters" }),
  email: z.string().email({ message: "Enter a valid email" }).nonempty(),
  password: z
    .string()
    .nonempty()
    .min(6, { message: "Password must have at least 6 characters" }),
});

const SellerSignUp = () => {
  const { session, sellerSignUp } = useSession();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<any>();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session) {
      navigate("/seller/dashboard");
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [session, navigate]);

  async function onSubmit(userInfo: z.infer<typeof loginSchema>) {
    const { name, email, password } = userInfo;

    try {
      await sellerSignUp(name, email, password);
      navigate("/seller/onBoarding");
    } catch (error: any) {
      loginForm.setError("root", {
        message: error.message || "Sign up failed",
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-gray-100 p-4 sm:p-6 md:p-8 mt-16">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden mt-5 mb-16">
        <div className="w-full md:w-1/2 hidden md:flex flex-col justify-center items-start px-10 py-8 bg-slate-50">
          <div className="flex items-center mb-6">
            <StoreIcon className="h-8 w-8 text-indigo-600 mr-2" />
            <h1 className="text-3xl font-medium text-gray-800">
              Become a Seller
            </h1>
          </div>
          <p className="text-base text-gray-600 mb-6 leading-relaxed">
            Join Maalelo's marketplace and start selling your products to a wide
            audience.
          </p>

          <div className="space-y-5 w-full">
            <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <h3 className="text-lg font-medium text-indigo-700 mb-3">
                Already a Seller?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                If you have a seller account, sign in to your dashboard.
              </p>
              <Button
                onClick={() => navigate("/seller/login")}
                variant="outline"
                className="w-full h-11 px-6 rounded-lg border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium text-sm shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] flex items-center justify-center"
              >
                Seller Sign In <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Button>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <h3 className="text-lg font-medium text-amber-700 mb-3">
                Back to Main Site?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Return to our main platform to browse and shop.
              </p>
              <Button
                onClick={() => navigate("/")}
                className="w-full h-11 px-6 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] flex items-center justify-center"
              >
                Go to Maalelo.com <HomeIcon className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
          <p className="mt-8 text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Maalelo Seller Program. All rights
            reserved.
          </p>
        </div>

        <div className="w-full md:w-1/2 px-10 py-8 flex flex-col justify-center bg-white relative overflow-hidden">
          <div className="w-full max-w-md space-y-8 mx-auto">
            <div className="text-left">
              <h2 className="text-2xl font-medium text-gray-800">
                Create Seller Account
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Fill in the details to register as a seller.
              </p>
            </div>

            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {loginForm.formState.errors.root && (
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
                    <span>{loginForm.formState.errors.root.message}</span>
                  </div>
                )}

                <FormField
                  control={loginForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="signup-name"
                        className="text-sm font-medium text-gray-700"
                      >
                        Your Name / Store Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative mt-1">
                          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                          <Input
                            id="signup-name"
                            placeholder="e.g., John Doe or My Awesome Store"
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
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="signup-email"
                        className="text-sm font-medium text-gray-700"
                      >
                        Business Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative mt-1">
                          <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                          <Input
                            id="signup-email"
                            placeholder="yourbusiness@example.com"
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
                  control={loginForm.control}
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
                            placeholder="Create a strong password for your store"
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
                  disabled={loginForm.formState.isSubmitting}
                >
                  {loginForm.formState.isSubmitting ? (
                    <Loader2Icon className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    "Register as Seller"
                  )}
                  {!loginForm.formState.isSubmitting && (
                    <ArrowRightIcon className="h-5 w-5 ml-2" />
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-8 text-center text-xs text-gray-600">
              Already a seller on Maalelo?{" "}
              <button
                onClick={() => navigate("/seller/login")}
                className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition-colors duration-150 ease-in-out"
              >
                Login to Seller Portal
              </button>
            </div>
          </div>
          <BorderBeam
            duration={6}
            size={300}
            className="from-transparent via-yellow-600 to-green-600"
          />
        </div>
      </div>
    </div>
  );
};

export default SellerSignUp;
