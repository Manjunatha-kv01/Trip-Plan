import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import { Trip } from "@/types/types";
import { useCallback, useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }: { trip: Trip | undefined }) {
  const GetPlacePhotos = useCallback(async () => {
    const data = {
      textQuery: trip?.userSelection?.location,
    };
    await GetPlaceDetails(data)
      .then((resp) => {
        const PhotoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          resp.data.places[0].photos[3].name
        );

        setPhotoUrl(PhotoUrl);
      })
      .catch((e) => console.log("error: ", e));
  }, [trip?.userSelection?.location]);
  useEffect(() => {
    if (trip) GetPlacePhotos();
  }, [GetPlacePhotos, trip]);

  const [photoUrl, setPhotoUrl] = useState("");

  return (
    <div>
      <img
        src={photoUrl ? photoUrl : "/placeholder.jpg"}
        alt="trip image"
        className="h-[340px] object-cover w-full rounded-xl shadow-md"
      />
      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">{trip?.userSelection?.location}</h2>
        <div className="flex justify-between items-center">
          <div className="flex flex-row gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text:xs md:text-md">
              📅 {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text:xs md:text-md">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text:xs md:text-md">
              🧑 No. of traveller: {trip?.userSelection?.travellers}
            </h2>
          </div>
          <Button>
            <IoIosSend />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
