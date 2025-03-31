import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOption,
  SelectTravelersList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
const CityDataWrapper = lazy(
  () => import("@/components/custom/CityDataWrapper")
);
import { FormData } from "@/types/types";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/service/FirebaseConfig";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/custom/Loader";

const CreateTrip = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    budget: "",
    travellers: "",
    location: "",
    noOfDays: "",
  });

  const handleInputChange = useCallback(
    (key: string, value: string) => {
      if (parseInt(formData.noOfDays) > 5) return;
      setFormData((prevData) => ({ ...prevData, [key]: value }));
    },
    [formData.noOfDays]
  );

  const navigate = useNavigate();

  useEffect(
    () => handleInputChange("location", searchTerm),
    [handleInputChange, searchTerm]
  );

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      (!(parseInt(formData.noOfDays) > 5) && !formData.location) ||
      !formData.budget ||
      !formData.travellers
    ) {
      toast("Please fill all details");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData.location)
      .replace("{totalDays}", formData.noOfDays)
      .replace("{budget}", formData.budget)
      .replace("{traveler}", formData.travellers);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    const tripData = result.response.text();
    setLoading(false);
    saveAITrip(tripData);
  };
  const logIn = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const getUserProfile = async (tokenInfo: TokenResponse) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data));
      setOpenDialog(false);
      onGenerateTrip();
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  const saveAITrip = async (tripData: string) => {
    setLoading(true);
    const docId: string = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    await setDoc(doc(firestore, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail: user.email,
      id: docId,
    });
    setLoading(false);
    navigate(`/view-trip/${docId}`);
  };

  return (
    <div className="px-[18vw] mt-10 flex flex-col justify-center align-middle mx-auto">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🚙
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <div>
            <Suspense fallback={<Loader />}>
              <CityDataWrapper
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </Suspense>
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>

          <Input
            placeholder={"e.g. 3"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOption.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData.budget == item.title && "shadow-lg border-black"
                }`}
                onClick={() => handleInputChange("budget", item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelersList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData.travellers == item.people && "shadow-lg border-black"
                }`}
                onClick={() => handleInputChange("travellers", item.people)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-3 flex justify-end">
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the app with Google Autentication securely.</p>
              <Button
                className="w-full mt-5 flex gap-4 items-center"
                onClick={() => logIn()}
              >
                <FcGoogle className="w-7 h-7" /> Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
