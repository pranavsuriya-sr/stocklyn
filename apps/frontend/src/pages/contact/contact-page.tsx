import { Button } from "@/components/ui/button";

const ContactPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="w-[50%] mx-auto flex flex-col ">
        <div className="pt-28 text-5xl font-extralight font-montserrat">
          Contact
        </div>
        <div className="flex justify-between items-center gap-2">
          <input
            className="border border-black mt-10 w-full p-2 rounded-lg bg-gray-100"
            placeholder="Name"
          />
          <input
            className="border border-black mt-10 w-full p-2 rounded-lg bg-gray-100"
            placeholder="Email *"
          />
        </div>
        <div>
          <input
            type="text"
            className="border border-black mt-2 p-2 w-full rounded-lg bg-gray-100"
            placeholder="Phone number"
          />
        </div>
        <div>
          <input
            type="text"
            className="border border-black mt-2 p-10 w-full rounded-lg bg-gray-100"
          />
        </div>
        <Button className="mt-5 w-32" variant={"indigo"}>
          Send
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center mt-32">
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
