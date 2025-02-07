import { useNavigate } from "react-router-dom";
import authentication from "../../assets/userIcons/authentication.png";
import contact from "../../assets/userIcons/contact-us.png";
import location from "../../assets/userIcons/location.png";
import orders from "../../assets/userIcons/orders.png";
import UserInfoCard from "./user-info-card";

const UserProfile = () => {
  const navigate = useNavigate();
  return (
    <div className="pt-20 h-screen font-montserrat">
      <div className="p-4 mt-5 text-3xl flex justify-center items-center ">
        <div className="text-4xl ">Your Account </div>
      </div>
      <div className="w-[90%] mx-auto pt-5">
        <div className="grid grid-cols-3 gap-2 ">
          <UserInfoCard
            name="Location"
            description="Edit Addresses for orders and gifts"
            imgUrl={location}
            onClick={() => navigate("/editUserAddress")}
          />
          <UserInfoCard
            name="Orders"
            description="Track , Return or Buy again"
            imgUrl={orders}
            onClick={() => navigate("/orderHistory")}
          />
          <UserInfoCard
            name="Authentication"
            description="Edit login , name , email , password"
            imgUrl={authentication}
            onClick={() => navigate("/secureUserAuth")}
          />
          <UserInfoCard
            name="Contact Us"
            description="Contact our service by email"
            imgUrl={contact}
            onClick={() => navigate("/contact")}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
