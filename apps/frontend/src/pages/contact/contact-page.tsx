import { sendEmailRoute } from "@/api/api";
import { Button } from "@/components/ui/button";
import { useSession } from "@/context/session-context";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

//use RESEND for it

const ContactPage = () => {
  const { user } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    userId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearFormData = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      userId: "",
    });
    toast({
      title: "Message Sent!",
      description: "We'll get back to you soon.",
      variant: "success",
      duration: 2000,
    });
  };

  const handleEmailFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Fields",
        description: "Please fill in your name, email, and message.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    const sendData = { ...formData, userId: user?.id || "" };
    try {
      await sendEmailRoute.post("/add", sendData);
      clearFormData();
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Could not send your message. Please try again.",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const mutation = useMutation({
    mutationFn: handleEmailFormSubmit,
    mutationKey: ["sendEmail"],
  });

  return (
    <div className="min-h-screen bg-white text-gray-800 pt-20 font-montserrat mb-20">
      <header className="bg-gray-50 text-gray-800 py-16 md:py-20 border-b border-gray-200">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4 ">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-600">
            We're here to help and answer any question you might have. We look
            forward to hearing from you!
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Contact Form Section */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8">
              Send us a Message
            </h2>
            <form onSubmit={mutation.mutate} className="space-y-6">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 py-3 px-4 text-base"
                  placeholder="Your Name *"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 py-3 px-4 text-base"
                  placeholder="Your Email *"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 py-3 px-4 text-base"
                  placeholder="Your Phone (Optional)"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 py-3 px-4 text-base"
                  placeholder="Your Message *"
                  required
                ></textarea>
              </div>
              <div>
                <Button
                  type="submit"
                  variant="indigo"
                  className="w-full sm:w-auto px-8 py-3 text-base font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>

          {/* Contact Information Section */}
          <div className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8">
              Our Contact Details
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail
                  size={24}
                  className="text-indigo-600 mr-4 mt-1 flex-shrink-0"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Email Us
                  </h3>
                  <p className="text-gray-600">
                    Get in touch via email for any inquiries.
                  </p>
                  <a
                    href="mailto:udayraj.vadeghar@gmail.com"
                    className="text-indigo-600 hover:text-indigo-700 break-all"
                  >
                    udayraj.vadeghar@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone
                  size={24}
                  className="text-indigo-600 mr-4 mt-1 flex-shrink-0"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Call Us
                  </h3>
                  <p className="text-gray-600">
                    Reach out to us during business hours.
                  </p>
                  <a
                    href="tel:+1234567890"
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    +91 (40) 6650 6650
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin
                  size={24}
                  className="text-indigo-600 mr-4 mt-1 flex-shrink-0"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Our Office
                  </h3>
                  <p className="text-gray-600">
                    No. 133, 1st Cross and 2nd Main, Mindspace, Hyderabad,
                    Telangana, India
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-8 text-sm text-gray-500">
              We typically respond within 24-48 business hours. For urgent
              matters, please call us directly.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
