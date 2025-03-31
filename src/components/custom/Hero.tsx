import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-[18vw] gap-9">
      <h1 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[#f56551]">
          Discover Your Next Adventure with AI:{" "}
        </span>
        Personalised Itineraries at Your Fingertips
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Your Personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and hobbies.
      </p>
      <Link to="/create-trip">
        <Button>Get Started, It's free</Button>
      </Link>
      <img src="/landing.png" className="object-cover -m-20 mt-0" />
    </div>
  );
}

export default Hero;
