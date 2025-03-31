import { TripPlan } from "@/types/types";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }: { place: TripPlan }) {
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`}
      target="_blank"
    >
      <div className="rounded-xl border p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-sm cursor-pointer">
        <img
          className="w-[130px] h-[130px] rounded-xl"
          src="/placeholder.jpg "
          alt="place"
        />
        <div>
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-400">{place.placeDetails}</p>
          <h2 className="mt-2">🚕 {place.travel}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
