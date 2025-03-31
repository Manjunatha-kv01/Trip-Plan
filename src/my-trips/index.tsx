import { firestore } from "@/service/FirebaseConfig";
import { Trip } from "@/types/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCard from "./components/UserTripCard";

const MyTrips = () => {
  const [userTrips, setUserTrips] = useState<Trip[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  const getUserTrips = useCallback(async () => {
    if (!user.email) {
      navigate("/");
      return;
    }

    try {
      const q = query(
        collection(firestore, "AITrips"),
        where("userEmail", "==", user.email)
      );
      const docSnaps = await getDocs(q);

      setUserTrips(docSnaps.docs.map((doc) => doc.data() as Trip));
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  }, [navigate, user.email]);

  useEffect(() => {
    getUserTrips();
    return () => setUserTrips([]); // Clean up on unmount
  }, [getUserTrips]);

  if (!userTrips.length) {
    return (
      <div className="px-[18vw]">
        <h2 className="font-bold text-3xl">My Trips</h2>
        <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div
              key={index}
              className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-[18vw]">
      <h2 className="font-bold text-3xl">My Trips</h2>
      <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
        {userTrips.map((trip: Trip, index: number) => (
          <UserTripCard trip={trip} key={index} />
        ))}
      </div>
    </div>
  );
};

export default MyTrips;
