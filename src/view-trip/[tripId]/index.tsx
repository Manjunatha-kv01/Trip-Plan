import { firestore } from "@/service/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/infoSection";
import Hotels from "../components/Hotels";
import { Trip } from "@/types/types";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

const ViewTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip>();
  const getTripData = useCallback(async () => {
    const docRef = await doc(firestore, "AITrips", tripId || "");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setTrip(docSnap.data() as Trip);
    } else {
      console.log("No trip Found");
      toast(`No trip found with ID : ${tripId}`);
    }
  }, [tripId]);
  useEffect(() => {
    getTripData();
  }, [getTripData, tripId]);

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56 ">
      <InfoSection trip={trip} />
      <Hotels trip={trip} />
      <PlacesToVisit trip={trip} />
      <Footer />
    </div>
  );
};

export default ViewTrip;
