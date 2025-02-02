import { z } from "zod";

const userUpdateForm = z.object({
  username: z.string().min(2).max(6),
  password: z.string().min(6, {
    message: "The password should be atleast 6 characters long",
  }),
});

const UserProfile = () => {
  // const form = useForm<z.infer<typeof userUpdateForm>({
  //   resolver:zodResolver(userUp dateForm),
  //   defailtValues:{

  //   }
  // });

  return <div className="pt-20 h-screen">UserProfile</div>;
};

export default UserProfile;
