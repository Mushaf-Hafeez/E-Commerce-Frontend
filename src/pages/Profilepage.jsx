import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import { useSelector, useDispatch } from "react-redux";

const Profilepage = () => {
  const { name, email, profilePic, role } = useSelector(
    (state) => state.profile
  );

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
        <div className="flex flex-col gap-2">
          <Label htmlFor={"name"}>Name</Label>
          <Input
            id={"name"}
            type={"text"}
            readonly={"true"}
            value={name}
            className={"w-fit"}
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
      </div>
    </div>
  );
};

export default Profilepage;
