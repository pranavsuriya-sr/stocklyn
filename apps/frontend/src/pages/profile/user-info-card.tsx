interface UserInfoCardProps {
  name: string;
  description: string;
  imgUrl: string;
  onClick?: () => void;
}

const UserInfoCard = ({
  name,
  description,
  imgUrl,
  onClick,
}: UserInfoCardProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out h-48 w-full cursor-pointer"
      onClick={onClick}
    >
      <img src={imgUrl} alt={name} className="w-16 h-16 mb-4" />
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-1">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default UserInfoCard;
