import { z } from "zod";

const userUpdateForm = z.object({
  username: z.string().min(2).max(6),
  password: z.string().min(6, {
    message: "The password should be atleast 6 characters long",
  }),
});

const UserProfile = () => {
  return <div className="pt-20">UserProfile</div>;
};

export default UserProfile;
