import { useTheme } from "../hooks/useTheme";

function Home() {
  const { toggleTheme } = useTheme();
  return (
    <div>
      <button
        onClick={toggleTheme}
        className="p-2  rounded m-2  cursor-pointer hover:bg-gray-400 transition border border-gray-500"
      >
        Change Theme
      </button>
    </div>
  );
}

export default Home;
