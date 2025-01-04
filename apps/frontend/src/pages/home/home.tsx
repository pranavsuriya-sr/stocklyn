import { useSession } from "@/context/session-context";

const Home = () => {
  const context = useSession();

  const displayName = context?.session?.user.user_metadata.display_name;

  return <div>{displayName}</div>;
};

export default Home;
