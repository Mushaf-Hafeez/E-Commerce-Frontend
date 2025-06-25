import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

import { Pencil, Camera } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

import { setName, setProfilePic } from "../redux/slices/profileSlice";
import { updateProfile } from "../services/profile";

const Profilepage = () => {
  const { name, email, profilePic, role } = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newProfilePic, setNewProfilePic] = useState(profilePic);

  // handle function to change the edit state
  const handleClick = () => {
    setEdit((prev) => !prev);
    document.getElementById("name").focus();
  };

  // handle function to upload file
  const handleChange = (e) => {
    setNewProfilePic(e.target.files[0]);
  };

  // handle function to update the data in state and the database
  // const handleSubmit = async () => {
  //   if (newName === "" && Object.keys(newProfilePic).length === 0) {
  //     return toast.error("Invalid changes");
  //   } else {
  //     setEdit(false);
  //     dispatch(setName(newName));
  //     Object.keys(newProfilePic).length !== 0 &&
  //       dispatch(setProfilePic(URL.createObjectURL(newProfilePic)));
  //     localStorage.setItem("name", JSON.stringify(newName));
  //     const formData = new FormData();
  //     newName && formData.append("name", newName);
  //     Object.keys(newProfilePic).length !== 0 &&
  //       formData.append("profilePic", newProfilePic);
  //     const response = await updateProfile(formData);
  //     if (response.success) {
  //       toast.success("Saved changes");
  //     } else {
  //       toast.error(response.message);
  //     }
  //   }
  // };

  // claude generated function
  const handleSubmit = async () => {
    // Check if there are any actual changes
    if (newName === "" && !(newProfilePic instanceof File)) {
      return toast.error("Invalid changes");
    } else {
      const toastId = toast.loading("loading...");
      setEdit(false);
      dispatch(setName(newName));

      // Only create object URL if newProfilePic is actually a File
      if (newProfilePic instanceof File) {
        dispatch(setProfilePic(URL.createObjectURL(newProfilePic)));
      }

      // Remove localStorage usage for Claude.ai compatibility
      // localStorage.setItem("name", JSON.stringify(newName));

      const formData = new FormData();
      newName && formData.append("name", newName);

      // Only append file if it's actually a File object
      if (newProfilePic instanceof File) {
        formData.append("profilePic", newProfilePic);
      }

      const response = await updateProfile(formData);
      if (response.success) {
        toast.success("Saved changes", { id: toastId });
      } else {
        toast.error(response.message);
      }
    }
  };

  // Todo: api call to the backend

  return (
    <div className="min-h-full w-full px-2 flex flex-col gap-2">
      <h2 className="text-2xl font-semibold">Profile</h2>
      <div className="flex flex-col gap-2 items-center md:items-start">
        <Avatar className={"relative size-48 overflow-visible"}>
          <Label htmlFor={"image"} className={"absolute top-32 right-0 z-50"}>
            <Camera
              className="size-12 bg-primary dark:text-black p-3 rounded-full cursor-pointer"
              size={"28"}
            />
          </Label>
          <Input
            className={"hidden"}
            id="image"
            type={"file"}
            onChange={handleChange}
          />
          <AvatarImage
            className={"object-cover rounded-full"}
            src={profilePic}
          ></AvatarImage>
          <AvatarFallback className={"text-9xl bg-zinc-900 text-white"}>
            {name.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <div className="relative flex flex-col gap-2">
          <Label htmlFor={"name"}>Name</Label>
          <Input
            id={"name"}
            type={"text"}
            readOnly={!edit}
            maxLength="25"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className={"w-fit"}
          />
          <Pencil
            onClick={handleClick}
            size={"14"}
            className="absolute right-2 bottom-3 cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={"email"}>Email</Label>
          <Input
            id={"email"}
            type={"text"}
            readOnly={true}
            value={email}
            className={"w-fit"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={"role"}>Role</Label>
          <Input
            id={"role"}
            type={"text"}
            readOnly={true}
            value={role}
            className={"w-fit"}
          />
        </div>
        <Button
          onClick={handleSubmit}
          className={"bg-primary mt-2 px-24 md:px-20 cursor-pointer"}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Profilepage;
