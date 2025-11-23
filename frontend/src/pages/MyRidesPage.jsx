import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import UserRideTable from "../components/rides/UserRideTable";
import { useAuthStore } from "../store/authStore";
import { getAllRideDetails } from "../api/feedbackApi";
import Navbar from "../components/Navbar";

export default function MyRidesPage() {
  const user = useAuthStore((state) => state.user);
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await getAllRideDetails();
        setRides(res.data.rides || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRides();
  }, [user]);

  return (
    <>   <Navbar />
    <div className="min-h-screen p-6 bg-slate-100">
      <h1 className="text-2xl font-semibold text-slate-800 mb-4">
        My Approved Rides
      </h1>

      <UserRideTable rides={rides} />

    </div></>
   
  );
}
