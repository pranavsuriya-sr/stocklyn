import { useSession } from "@/context/session-context";

const Home = () => {
  const { session } = useSession();

  return <div>{}</div>;
};

export default Home;
