import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

import { setName } from "../redux/slices/profileSlice";

const Profilepage = () => {
  const { name, email, profilePic, role } = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleClick = () => {
    setEdit((prev) => !prev);
    document.getElementById("name").focus();
  };

  const handleSubmit = () => {
    if (newName === "") {
      return toast.error("Name cannot be empty");
    } else {
      setEdit(false);
      dispatch(setName(newName));
      localStorage.setItem("name", JSON.stringify(newName));
      toast.success("Saved changes");
    }
  };

  // Todo: upload image button and functionality and api call to the backend

  return (
    <div className="min-h-full w-full px-2 flex flex-col gap-2">
      <h2 className="text-2xl font-semibold">Profile</h2>
      <div className="flex flex-col gap-2 items-center md:items-start">
        <Avatar className={"size-48"}>
          <AvatarImage
            className={"object-cover"}
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
            readonly={"true"}
            value={email}
            className={"w-fit"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={"role"}>Role</Label>
          <Input
            id={"role"}
            type={"text"}
            readonly={"true"}
            value={role}
            className={"w-fit"}
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!edit}
          className={"bg-primary px-16 md:px-12 cursor-pointer"}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default Profilepage;
