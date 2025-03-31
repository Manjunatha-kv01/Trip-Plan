import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="mt-7">
      <h2 className="text-center text-gray-400">
        Created By{" "}
        <Link
          target="_blank"
          className="cursor-pointer hover:underline hover:text-blue-400"
          to="https://amansharma193.netlify.app/"
        >
          Aman Sharma
        </Link>
      </h2>
    </div>
  );
}

export default Footer;
