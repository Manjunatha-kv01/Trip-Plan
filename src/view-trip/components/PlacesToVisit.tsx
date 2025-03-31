import { Trip, TripPlan } from "@/types/types";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }: { trip: Trip | undefined }) {
  return (
    <div>
      <h2 className="font-bold text-lg mt-5">Places to Visit</h2>
      <div>
        {trip?.tripData.itinerary.map((itinerary, index) => (
          <div className="mt-5" key={index + itinerary.day}>
            <h2 className="font-medium text-lg">{itinerary.day}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {itinerary.plan.map((place: TripPlan, index: number) => (
                <div key={index + place.time}>
                  <h2 className="font-medium text-sm text-orange-600">
                    {place.time}
                  </h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
