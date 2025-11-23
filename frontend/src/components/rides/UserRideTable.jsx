import FeedbackPage   from "../../pages/FeedbackPage";
import React from "react";

export default function UserRideTable({ rides }) {
  const [FeedBackForm, setShowFeedBackForm] = React.useState(false);
  if (!rides?.length) {
    return (
      <div className="w-full bg-white p-6 rounded-lg shadow text-center text-slate-500">
        No approved rides found.
      </div>
    );
  }

  const showFeedBackForm=()=>{
    setShowFeedBackForm(true) ;
  }

  const onSaveFeedback= async ()=>{
    // alert("Feedback submitted successfully!");
  }

  return (<>
    
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full text-sm text-left text-slate-800">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-2">Driver</th>
            <th className="px-4 py-2">Vehicle</th>
            <th className="px-4 py-2">Pickup</th>
            <th className="px-4 py-2">Drop</th>
            <th className="px-4 py-2">Departure</th>
            <th className="px-4 py-2">Fare</th>
            <th className="px-4 py-2">Seats</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {rides.map((ride) => (
            <tr
              key={ride._id}
              className="border-b hover:bg-blue-50 transition"
            >
              <td className="px-4 py-2">
                {ride.driver?.name || ride.driver?.username || "Unknown"}
              </td>

              <td className="px-4 py-2">
                {ride.vehicle_details?.brand} {ride.vehicle_details?.model}
                <br />
                <span className="text-xs text-slate-500">
                  {ride.vehicle_details?.number_plate}
                </span>
              </td>

              <td className="px-4 py-2">{ride.pickup_location?.address}</td>

              <td className="px-4 py-2">{ride.dropoff_location?.address}</td>

              <td className="px-4 py-2">
                {new Date(ride.departure_time).toLocaleString()}
              </td>

              <td className="px-4 py-2 font-semibold">₹{ride.ride_fare}</td>

              <td className="px-4 py-2">{ride.available_seats}</td>

              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold
                  ${
                    ride.status === "ACTIVE"
                      ? "bg-green-200 text-green-700"
                      : ride.status === "IN_PROGRESS"
                      ? "bg-blue-200 text-blue-700"
                      : ride.status === "RIDE_FINISHED"
                      ? "bg-gray-300 text-gray-700"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {ride.status}
                </span>
              </td>

              <td className="px-4 py-2 text-center">
                <button 
                 onClick={showFeedBackForm} className="bg-blue-600  text-white text-xs px-3 py-1 rounded hover:bg-blue-700 transition cursor-pointer">
                  Give Feedback
                </button>
              </td>
               {FeedBackForm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50" onClick={()=>{
                      setShowFeedBackForm(false);
                    }}>
                      <div className="animate-fadeIn" onClick={(event)=>{
                        event.stopPropagation();
                      }}>
                        <FeedbackPage data={ride} setFeedBackForm ={setShowFeedBackForm} />
                      </div>
                    </div>
                  )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
  </>
  );
}
