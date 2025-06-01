import { useNavigate } from "react-router-dom";
import authentication from "../../assets/userIcons/authentication.png";
import contact from "../../assets/userIcons/contact-us.png";
import location from "../../assets/userIcons/location.png";
import orders from "../../assets/userIcons/orders.png";
import UserInfoCard from "./user-info-card";

const UserProfile = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen font-montserrat bg-slate-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl mt-16">
            Your Account
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
            Manage your profile, view your orders, and update your preferences.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 md:gap-x-8 md:gap-y-10">
          <UserInfoCard
            name="Your Addresses"
            description="Edit, remove, or set default shipping addresses."
            imgUrl={location}
            onClick={() => navigate("/editUserAddress")}
          />
          <UserInfoCard
            name="Order History"
            description="Track your current orders, view past purchases, or start a return."
            imgUrl={orders}
            onClick={() => navigate("/orderHistory")}
          />
          <UserInfoCard
            name="Login & Security"
            description="Manage your password, email, and account security settings."
            imgUrl={authentication}
            // onClick={() => navigate("/secureUserAuth")} // Assuming this route exists or will be created
          />
          <UserInfoCard
            name="Contact Us"
            description="Get in touch with our support team for any assistance."
            imgUrl={contact}
            onClick={() => navigate("/contact")}
          />
          {/* You can add more UserInfoCard components here if needed */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
