import { useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  googleLogout,
  TokenResponse,
  useGoogleLogin,
} from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Header() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [openDialog, setOpenDialog] = useState(false);
  const logout = () => {
    googleLogout();
    localStorage.removeItem("user");
    window.location.reload();
  };

  const logIn = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const getUserProfile = (tokenInfo: TokenResponse) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
      })
      .catch((e) => console.log(`Error : ${e}`));
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5 sticky top-0 z-10 bg-[#F5F5F5]">
      <a href="/">
        <img src="/logo.svg" alt="Logo" />
      </a>
      <div>
        {user.picture ? (
          <div className="flex items-center gap-5">
            <a href="/create-trip">
              <Button variant={"outline"} className="rounded-full ">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant={"outline"} className="rounded-full ">
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user.picture}
                  alt="userProfile"
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={logout}>
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <>
            <Button onClick={() => setOpenDialog(true)}>Sign In</Button>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogDescription>
                    <img src="/logo.svg" alt="Logo" />
                    <h2 className="font-bold text-lg mt-7">
                      Sign In With Google
                    </h2>
                    <p>
                      Sign in to the app with Google Autentication securely.
                    </p>
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
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
