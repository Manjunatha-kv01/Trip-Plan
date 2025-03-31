import { HotelOption } from "@/types/types";
import { Link } from "react-router-dom";

function HotelCardItem({ hotel }: { hotel: HotelOption }) {
  return (
    <Link
      key={hotel.hotelName}
      to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName}, ${hotel.hotelAddress}`}
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
          src="/placeholder.jpg"
          alt="hotel image  "
          className="rounded-xl shadow-md h-[180px] w-full object-cover"
        />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{hotel.hotelName}</h2>
          <h2 className="font-xs text-gray-500">🗺️ {hotel.hotelAddress}</h2>
          <h2 className="text-sm">💳 {hotel.price}</h2>
          <h2 className="text-sm">⭐ {hotel.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
