import { Trip } from "@/types/types";
import { Link } from "react-router-dom";

function UserTripCard({ trip }: { trip: Trip }) {
  return (
    <Link to={`/view-trip/${trip.id}`}>
      <div className="hover:scale-105 transition-all ">
        <img
          src="/placeholder.jpg"
          alt="place image"
          className="object-cover rounded-xl h-[220px] w-full"
        />
        <div>
          <h2 className="font-bold text-lg">{trip?.userSelection?.location}</h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noOfDays} days trip with{" "}
            {trip?.userSelection?.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCard;
