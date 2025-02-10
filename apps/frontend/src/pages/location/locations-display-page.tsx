import { addressRoute } from "@/api/api";
import { useSession } from "@/context/session-context";
import { AddressType } from "@/types/address-type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const LocationsDisplayPage = () => {
  const navigate = useNavigate();
  const { user } = useSession();

  const HandleRemoveAddress = async (id: string) => {
    try {
      await addressRoute.delete(`/delete/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate, isSuccess } = useMutation({
    mutationFn: (id: string) => HandleRemoveAddress(id),
  });

  const { data: addresses } = useQuery({
    queryKey: ["addresses", isSuccess],
    queryFn: () => GetAllAddress(),
  });

  const GetAllAddress = async () => {
    const response = await addressRoute.get(`/getaddress/${user?.id}`);

    return response.data.response;
  };

  return (
    <div className="w-[75%] mx-auto min-h-screen pt-28 font-montserrat">
      <h2 className="text-3xl mb-6">Your Addresses</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className="border-2 border-gray-400 border-dashed flex flex-col items-center justify-center p-4 rounded-lg shadow-md bg-white h-auto min-h-[200px] cursor-pointer hover:bg-gray-100"
          onClick={() => navigate("/addUserAddress")}
        >
          <span className="text-2xl font-semibold">+</span>
          <span className="text-lg">Add Address</span>
        </div>

        {addresses != undefined &&
          addresses.length > 0 &&
          addresses.map((address: AddressType) => (
            <div
              key={address.id}
              className="border p-4 rounded-lg shadow-md bg-white"
            >
              {/* {address.isDefault && (
              <span className="text-sm text-gray-600 font-semibold">
                Default
              </span>
            )} */}
              <h3 className="text-lg font-semibold">{address.name}</h3>
              <p className="text-gray-600">{address.Address1}</p>
              <p className="text-gray-600">{address.city}</p>
              <p className="text-gray-600 font-medium">
                Phone: {address.mobileNumber}
              </p>
              <div className="mt-3 text-sm text-indigo-600 cursor-pointer">
                Add delivery instructions
              </div>

              <div className="flex gap-4 mt-3 text-sm text-indigo-600">
                {/* <span className="cursor-pointer">Edit</span> */}
                <span
                  className="cursor-pointer"
                  onClick={() => mutate(address.id)}
                >
                  Remove
                </span>
                {/* {!address.isDefault && (
                <span className="cursor-pointer">Set as Default</span>
              )} */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LocationsDisplayPage;
