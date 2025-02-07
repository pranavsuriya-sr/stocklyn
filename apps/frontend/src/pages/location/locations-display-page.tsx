const LocationsDisplayPage = () => {
  const addresses = [
    {
      id: 1,
      name: "Uday",
      address:
        "loremas askndaksndkankldn naln klsna klan kln klank naslk nklsan lknklans kld",
      city: "HYDERABAD, TELANGANA 500050",
      phone: "8812912800",
      isDefault: true,
    },
  ];

  return (
    <div className="w-[75%] mx-auto min-h-screen pt-28 font-montserrat">
      <h2 className="text-3xl mb-6">Your Addresses</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border-2 border-gray-400 border-dashed flex flex-col items-center justify-center p-4 rounded-lg shadow-md bg-white h-auto min-h-[200px] cursor-pointer hover:bg-gray-100">
          <span className="text-2xl font-semibold">+</span>
          <span className="text-lg">Add Address</span>
        </div>

        {/* Address Cards */}
        {addresses.map((address) => (
          <div
            key={address.id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            {address.isDefault && (
              <span className="text-sm text-gray-600 font-semibold">
                Default
              </span>
            )}
            <h3 className="text-lg font-semibold">{address.name}</h3>
            <p className="text-gray-600">{address.address}</p>
            <p className="text-gray-600">{address.city}</p>
            <p className="text-gray-600 font-medium">Phone: {address.phone}</p>
            <div className="mt-3 text-sm text-indigo-600 cursor-pointer">
              Add delivery instructions
            </div>

            <div className="flex gap-4 mt-3 text-sm text-indigo-600">
              <span className="cursor-pointer">Edit</span>
              <span className="cursor-pointer">Remove</span>
              {!address.isDefault && (
                <span className="cursor-pointer">Set as Default</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsDisplayPage;
