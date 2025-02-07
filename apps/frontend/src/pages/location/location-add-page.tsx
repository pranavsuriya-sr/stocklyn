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
import { useForm } from "react-hook-form";
import { z } from "zod";

const locationSchema = z.object({
  Name: z
    .string()
    .min(3, { message: "Name should have a minimum of 3 characters" })
    .max(30, { message: "Name can have a maximum of 30 characters" }),
  MobileNumber: z
    .string()
    .length(10, { message: "Mobile number must be exactly 10 digits" }),
  State: z.string().min(1, { message: "State cannot be empty" }),
  Pincode: z
    .string()
    .length(6, { message: "Pincode must be exactly 6 digits" }),
  City: z.string().min(1, { message: "City cannot be empty" }),
  Address1: z
    .string()
    .min(10, { message: "Address should have a minimum of 10 characters" })
    .max(120, { message: "Address can have a maximum of 120 characters" }),
  Address2: z.optional(
    z
      .string()
      .min(10, { message: "Address should have a minimum of 10 characters" })
      .max(120, { message: "Address can have a maximum of 120 characters" })
  ),
  Landmark: z
    .string()
    .min(10, { message: "Landmark should have a minimum of 10 characters" })
    .max(120, { message: "Landmark can have a maximum of 120 characters" }),
});

const LocationAdd = () => {
  const locationForm = useForm<z.infer<typeof locationSchema>>({
    resolver: zodResolver(locationSchema),
  });

  function onSubmit(values: z.infer<typeof locationSchema>) {
    console.log(values);
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
            name="Name"
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
            name="MobileNumber"
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
            name="State"
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
            name="Pincode"
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

          {/* City Field */}
          <FormField
            control={locationForm.control}
            name="City"
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

          {/* Address1 Field */}
          <FormField
            control={locationForm.control}
            name="Address1"
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

          {/* Address2 Field */}
          <FormField
            control={locationForm.control}
            name="Address2"
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
            name="Landmark"
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
            <Button
              className="px-6 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              variant={"indigo"}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LocationAdd;
