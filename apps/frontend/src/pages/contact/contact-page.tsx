import { sendEmailRoute } from "@/api/api";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

//use RESEND for it

const ContactPage = () => {
  const inputRef = useRef<any>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const HandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const HandleEmailFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sendEmailRoute.post("/contactEmail", formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <form
        className="w-[50%] mx-auto flex flex-col"
        onSubmit={HandleEmailFormSubmit}
      >
        <div className="pt-28 text-5xl font-extralight font-montserrat">
          Contact
        </div>
        <div className="flex justify-between items-center gap-2">
          <input
            className="border border-black mt-10 w-full p-2 rounded-lg bg-gray-100"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={HandleChange}
            ref={inputRef}
          />
          <input
            className="border border-black mt-10 w-full p-2 rounded-lg bg-gray-100"
            placeholder="Email *"
            name="email"
            value={formData.email}
            onChange={HandleChange}
          />
        </div>
        <div>
          <input
            type="text"
            className="border border-black mt-2 p-2 w-full rounded-lg bg-gray-100"
            placeholder="Phone number"
            name="phone"
            value={formData.phone}
            onChange={HandleChange}
          />
        </div>
        <div>
          <textarea
            className="border border-black mt-2 w-full rounded-lg bg-gray-100 h-40 p-2 placeholder:text-gray-500"
            placeholder="Info"
            name="message"
            value={formData.message}
            onChange={HandleChange}
          ></textarea>
        </div>
        <Button className="mt-5 w-32" variant={"indigo"} type="submit">
          Send
        </Button>
      </form>

      <div className="flex flex-col items-center justify-center mt-32 mb-10">
        <div className="text-4xl font-thin ">Contact Details</div>
        <div className="mt-5 text-sm text-gray-600">
          Email : udayraj.vadeghar@gmail.com
        </div>
        <div className="mt-5 text-sm text-gray-600">Phone No: 799310614</div>
      </div>
    </div>
  );
};

export default ContactPage;
