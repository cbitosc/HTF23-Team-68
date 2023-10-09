import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Student = () => {
  const navigate = useNavigate();
  const [equipmentList, setEquipmentList] = useState([]);
  const [selectedSport, setSelectedSport] = useState(""); // To store the selected sport

 

  const fetchUser = async () => {
    const user = await axios.post(
      "http://localhost:8000/getAdminUser",
      {},
      {
        headers: {
          token: Cookie.get("token"),
        },
      }
    );
    return user;
  };

  const onChange = (e) => {
    setSelectedSport(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/bookings/${selectedSport}`,
        {},
        {
          headers: {
            token: Cookie.get("token"),
          },
        }
      );
      console.log(response.data);
      // Handle the response or navigate to a different page as needed
    } catch (error) {
      console.error(error);
      // Handle errors if any
    }
  };

  const { data, isLoading } = useQuery({
    queryFn: fetchUser,
    queryKey: ["user"],
  });
  const reqs = useQuery({
    queryFn: getPastReq,
    queryKey: ["pastreq"],
  });

  const handleLogout = () => {
    Cookie.remove("token");
    navigate("/");
  };

  useEffect(() => {
    // Define a function to fetch all equipment sports
    const getAllEquipmentSports = async () => {
      try {
        // Make a GET request to fetch all equipment sports
        const response = await axios.get("http://localhost:8000/getallequipment"); // Replace with your API endpoint
        const equipmentSports = response.data.map((equipment) => equipment.sport);
        setEquipmentList(equipmentSports);
      } catch (error) {
        console.error("Error fetching equipment sports:", error);
      }
    };

    // Call the function to fetch equipment sports when the component mounts
    getAllEquipmentSports();
  }, []);

  return (
    <>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <div className="mx-2 flex flex-row justify-between items-center">
            <p className="font-bold text-xl">Welcome {data.data.name}</p>
            <div className="mt-3">
              <button
                className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-800"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
          <form className="flex items-center justify-center" onSubmit={handleSubmit}>
            <select
              name="sport"
              className="bg-gray-500 text-white rounded-md px-5 py-2"
              onChange={onChange}
              value={selectedSport} // Set the value to selectedSport to control the select
            >
              <option value="" disabled>Select an Equipment</option>
              {equipmentList.map((sport) => (
                <Link key={sport} to = {"/booking"} state={{from: sport}}><option  value={sport}>
                  {sport}
                </option>
                </Link>
              ))}
            </select>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-2"
            >
              Find
            </button>
          </form>

          <div className="font-sans p-4 rounded-lg shadow-md">
            {reqs.isLoading ? (
              <div className="text-center text-lg text-gray-600">Loading...</div>
            ) : (
              reqs.data.map((slot) => {
                return (
                  <div
                    key={slot._id}
                    className="mt-4 p-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-md text-white transition-transform duration-300 ease-in hover:transform hover:scale-95"
                  >
                    <strong className="text-lg font-bold mb-2 block">Equipment Name: </strong>
                    {slot.sport}
                    <br />
                    <div className="text-sm">
                      <strong>From:</strong> {slot.timeSlot.startTime} <br />
                      <strong>To:</strong> {slot.timeSlot.endTime}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Student;
