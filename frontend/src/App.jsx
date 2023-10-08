import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <nav className="flex flex-row justify-between items-center mt-4">
          <p className="font-bold text-3xl ml-3">Equippy</p>
          <div className="flex flex-row gap-5 mr-3">
            <Link to={"/login"}>
              <button className="bg-gray-700 rounded-md hover:bg-gray-800 px-4 py-2">
                Login
              </button>
            </Link>
            <Link to={"/register"}>
              <button className="bg-gray-700 rounded-md hover:bg-gray-800 px-4 py-2">
                Register
              </button>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

export default App;