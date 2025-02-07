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
      className="flex border p-4 w-96 h-28 mt-5 hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="basis-[30%]">
        <img src={imgUrl} alt={name} className="w-16" />
      </div>
      <div className="flex-1">{description}</div>
    </div>
  );
};

export default UserInfoCard;
