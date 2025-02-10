import { addressRoute } from "@/api/api";
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
import { useToast } from "@/hooks/use-toast";
import { AddAddress } from "@/types/address-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const locationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name should have a minimum of 3 characters" })
    .max(30, { message: "Name can have a maximum of 30 characters" }),
  mobileNumber: z
    .string()
    .length(10, { message: "Mobile number must be exactly 10 digits" }),
  state: z.string().min(1, { message: "State cannot be empty" }),
  pincode: z
    .string()
    .length(6, { message: "Pincode must be exactly 6 digits" }),
  city: z.string().min(1, { message: "City cannot be empty" }),
  address1: z
    .string()
    .min(10, { message: "Address should have a minimum of 10 characters" })
    .max(120, { message: "Address can have a maximum of 120 characters" }),
  address2: z.optional(
    z
      .string()
      .min(10, { message: "Address should have a minimum of 10 characters" })
      .max(120, { message: "Address can have a maximum of 120 characters" })
  ),
  landmark: z
    .string()
    .min(10, { message: "Landmark should have a minimum of 10 characters" })
    .max(120, { message: "Landmark can have a maximum of 120 characters" }),
});

const createAddress = async (addressInfo: AddAddress) => {
  // console.log(addressInfo);
  const response = await addressRoute.post("/addAddress", addressInfo);

  return response;
};

const LocationAdd = () => {
  const { user } = useSession();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: createAddress,
    onError: (error) => {
      console.error("Error creating post:", error);
    },
    onSuccess: (data) => {
      console.log("Post created successfully!", data);
      toast({
        title: "Your Location has been saved",
        variant: "success",
      });
      locationForm.reset();
    },
  });

  const locationForm = useForm<z.infer<typeof locationSchema>>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      name: "",
      mobileNumber: "",
      state: "",
      pincode: "",
      city: "",
      address1: "",
      address2: "",
      landmark: "",
    },
  });

  function onSubmit(values: z.infer<typeof locationSchema>) {
    if (user == undefined) {
      return;
    }

    const newAddressInfo = { ...values, userId: user.id };

    mutation.mutate(newAddressInfo);

    // console.log(newAddressInfo);
  }

  return (
    <div className="min-h-screen mt-32 mb-32 border w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold text-center mb-6 font-montserrat">
        Add New Address
      </h2>
      <Form {...locationForm}>
        <form
          onSubmit={locationForm.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Name Field */}
          <FormField
            control={locationForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium text-lg ml-2">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 ml-2" />
              </FormItem>
            )}
          />

          {/* Mobile Number Field */}
          <FormField
            control={locationForm.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium text-lg ml-2">
                  Mobile Number
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 ml-2" />
              </FormItem>
            )}
          />

          <FormField
            control={locationForm.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium text-lg ml-2">
                  State
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 ml-2" />
              </FormItem>
            )}
          />

          <FormField
            control={locationForm.control}
            name="pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium text-lg ml-2">
                  Pincode
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="6 digits [0-9] PIN code"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 ml-2" />
              </FormItem>
            )}
          />

          <FormField
            control={locationForm.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium text-lg ml-2">
                  City
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 ml-2" />
              </FormItem>
            )}
          />

          <FormField
            control={locationForm.control}
            name="address1"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium text-lg ml-2">
                  Flat, House no., Building, Company, Apartment
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 ml-2" />
              </FormItem>
            )}
          />

          <FormField
            control={locationForm.control}
            name="address2"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium text-lg ml-2">
                  Area, Street, Sector, Village
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 ml-2" />
              </FormItem>
            )}
          />

          {/* Landmark Field */}
          <FormField
            control={locationForm.control}
            name="landmark"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium text-lg ml-2">
                  Landmark
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="E.g. near inorbit mall"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 ml-2" />
              </FormItem>
            )}
          />

          <div className="flex justify-center mt-6">
            {mutation.isPending ? (
              <div>Loading</div>
            ) : (
              <Button
                className="px-6 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                variant={"indigo"}
                type="submit"
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LocationAdd;
