import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const locationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name should have minimum of 3 characters" })
    .max(30, { message: "" }),
  mobileNumber: z.string().length(10),
  state: z.string().min(1, { message: "State cannot be empty" }),
  pincode: z.string().length(6),
  city: z.string().min(1, { message: "City cannot be empty" }),
  Address1: z
    .string()
    .min(10, { message: "Address should have minimum of 10 characters" })
    .max(120, { message: "Address can only have a maximum of 120 characters" }),
  Address2: z.optional(
    z
      .string()
      .min(10, { message: "Address should have minimum of 10 characters" })
      .max(120, {
        message: "Address can only have a maximum of 120 characters",
      })
  ),
  Landmark: z
    .string()
    .min(10, { message: "Landmark should have minimum of 10 characters" })
    .max(120, {
      message: "Landmark can only have a maximum of 120 characters",
    }),
});

const LocationAdd = () => {
  const locationForm = useForm<z.infer<typeof locationSchema>>({
    resolver: zodResolver(locationSchema),
  });

  return <div className="min-h-screen pt-28">LocationAdd</div>;
};

export default LocationAdd;
