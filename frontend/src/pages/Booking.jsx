import { useState, useEffect } from "react";
import axios from "axios";
const Booking = () => {

  const sport = "basketball";
  const [selectedDate, setSelectedDate] = useState(null);
  const [initialTimeSlots] = useState([
    { startTime: "2023-10-10T09:00:00.000Z", status: false },
    { startTime: "2023-10-10T09:30:00.000Z", status: false },
    { startTime: "2023-10-10T10:00:00.000Z", status: false },
    { startTime: "2023-10-10T10:30:00.000Z", status: false },
    { startTime: "2023-10-10T11:00:00.000Z", status: false },
    { startTime: "2023-10-10T11:30:00.000Z", status: false },
    { startTime: "2023-10-10T12:00:00.000Z", status: false },
    { startTime: "2023-10-10T12:30:00.000Z", status: false },
    { startTime: "2023-10-10T13:00:00.000Z", status: false },
    { startTime: "2023-10-10T13:30:00.000Z", status: false },
    { startTime: "2023-10-10T14:00:00.000Z", status: false },
    { startTime: "2023-10-10T14:30:00.000Z", status: false },
    { startTime: "2023-10-10T15:00:00.000Z", status: false },
    { startTime: "2023-10-10T15:30:00.000Z", status: false },
  ]);
  const [timeSlots, setTimeSlots] = useState([...initialTimeSlots]);
  const [selectedSlots, setSelectedSlots] = useState([]); // Step 1: State to store selected slots as an array
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [success, setSuccess] = useState(false)
  // Generate an array of 10 selectable dates (for demonstration purposes, starting from today)
  const selectableDates = Array.from({ length: 10 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return date.toISOString().split("T")[0];
  });

  function formatDateToAMPM(dateTimeString) {
    console.log(dateTimeString);
    const date = new Date(dateTimeString);
    const hours = new Date(date).getUTCHours();
    const minutes = new Date(date).getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for AM/PM format
    const formattedMinutes = minutes.toString().padStart(2, '0'); // Add leading zero to minutes if needed
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setSelectedQuantity(newQuantity);
  };
  const handleSlotSelection = (slot) => {
    if (selectedSlots.includes(slot)) {
      // If the slot is already selected, remove it
      setSelectedSlots(selectedSlots.filter((selectedSlot) => selectedSlot !== slot));
    } else {
      // If the slot is not selected, add it
      setSelectedSlots([...selectedSlots, slot]);
    }
  };
  const handleBookClick = () => {
    // Create an array of objects with the selected quantity and time slot data
    const bookingData = timeSlots.map((slot) => ({
      timeStamps: {
        startTime: slot.startTime,
        endTime: slot.endTime,
      },
      sport: sport,
      quantity: selectedQuantity,
    }));
    console.log(bookingData);
    // Make a POST request to book the time slots with the selected quantity
    axios
      .post("http://localhost:8000/book", bookingData)
      .then((response) => {
        console.log("Booking successful:", response.data);
        // Handle any success actions here
        setSuccess(true);
      })
      .catch((error) => {
        console.error("Error booking slots:", error);
        // Handle errors here
        setSuccess(false);
      });
  };

  useEffect(() => {

      
    
     // Define the function to fetch time slots
     const getTimeSlotsForSport = async (sport) => {
        try {
          // Make an Axios GET request to retrieve time slots
          const response = await axios.get(
            `http://localhost:8000/getslots/${sport}`
          );
        //   console.log(response.data[0].timeSlot.startTime);
          // Extract the time slots from the response data
          const updatedTimeSlots = timeSlots.map((curr) => {
            const matchingSlot = response.data.find((slot) =>
              (slot.timeSlot.startTime) === curr.startTime
            );
      
            if (matchingSlot) {
              return { ...curr, status: true };
            }
      
            return curr;
          });
      
          setTimeSlots(updatedTimeSlots); // Update the state with the new times
          return updatedTimeSlots
        } catch (error) {
          console.error("Error fetching time slots:", error);
          throw error;
        }
      };
      
  
      // Fetch time slots for the specified sport when the component mounts or when selectedDate changes
      if (selectedDate) {
        getTimeSlotsForSport(sport) 
          .then((data) => {
            // Filter the data based on the selectedDate
            console.log(selectedDate);
            const newData = data.filter((slot) => {
              const slotStartTime = slot;
              console.log(slotStartTime); // Format the slot startTime
              return new Date(slotStartTime.startTime).toISOString().split("T")[0] === selectedDate;
            });
      
            // Update state with the filtered data
            setTimeSlots(newData);
          })
          .catch((error) => {
            console.error("Error fetching time slots:", error);
          });
      }
    }, [selectedDate, sport]);
  

  return (
    <div className="w-3/4 container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{`Select a Date for ${sport}`}</h1>
      <div className="overflow-x-auto mb-4">
        <div className="flex space-x-2">
          {selectableDates.map((date) => (
            <button
              key={date}
              className={`rounded-lg border  p-2 whitespace-nowrap ${
                selectedDate === date ? "bg-blue-500 text-white" : ""
              } hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out`}
              onClick={() => handleDateChange(date)}
            >
              {date}
            </button>
          ))}
        </div>
      </div>
      {selectedDate && (
        <div>
          <h2 className="text-xl font-bold mb-2">Select a Time Slot</h2>
          <div className="grid grid-cols-4 gap-4">
            {timeSlots.map((slot) => (
              <button
              key={slot.startTime}
              className={`rounded-lg border p-2 ${
                (!slot.status)
                  ? selectedSlots.includes(slot) // Check if the slot is selected
                    ? "bg-green-500 text-white" // If selected, make it green
                    : "bg-gray-300 text-gray-600" // If not selected, make it gray
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              } hover:bg-green-500 hover:text-white transition-all duration-300 ease-in-out`}
              onClick={() => {
                if (slot.status) {
                    handleSlotSelection(slot);
                    console.log(`Booking for ${selectedDate} at ${slot.startTime}`);
                }
              }}
              disabled={!slot.status} // Disable the button when not available
            >
                {formatDateToAMPM(slot.startTime)}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <label className="mr-2">Quantity:</label>
            <input
              type="number"
              value={selectedQuantity}
              onChange={handleQuantityChange}
              min="1" // Set a minimum value
              className="border rounded-lg p-2"
            />
            <button
              className="bg-blue-500 text-white rounded-lg p-2 ml-2"
              onClick={handleBookClick}
            >
              Book
            </button>
            {success && <p>Success!</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
