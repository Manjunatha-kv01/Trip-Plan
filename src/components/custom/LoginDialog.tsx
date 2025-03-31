import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogClose,
} from "@radix-ui/react-dialog";
import { DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function LoginDialog({
  openDialog,
  setOpenDialog,
  setIsProcessing,
}: {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  setIsProcessing: (value: boolean) => void;
}) {
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
        setIsProcessing(true);
      })
      .catch((e) => console.log(`Error : ${e}`));
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogOverlay />
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <img src="/logo.svg" alt="Logo" />
            <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
            <p>Sign in to the app with Google Authentication securely.</p>
            <Button
              className="w-full mt-5 flex gap-4 items-center"
              onClick={() => logIn()}
            >
              <FcGoogle className="w-7 h-7" /> Sign In with Google
            </Button>
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <Button>Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
