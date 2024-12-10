import {
  EyeSlashIcon,
  LockClosedIcon,
  LockOpenIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { TextField } from "../components";

const Experimental = () => {
  return (
    <div className="flex flex-col gap-4 max-w-4xl mt-2">
      <TextField.Root>
        <TextField.Input />
        <TextField.Slot className="h-[16px] w-[16px]">
          <EyeSlashIcon />
        </TextField.Slot>
      </TextField.Root>

      <TextField.Root size="large" className="bg-white">
        <TextField.Slot className="h-[16px] w-[16px]">
          <LockOpenIcon />
        </TextField.Slot>
        <TextField.Input />
        <TextField.Slot className="h-[16px] w-[16px]">
          <LockClosedIcon />
        </TextField.Slot>
        <TextField.Slot className="h-[16px] w-[16px]">
          <SunIcon />
        </TextField.Slot>
      </TextField.Root>

      <TextField.Root className="h-28 bg-lime-500 text-6xl">
        <TextField.Slot>
          <SunIcon className="w-10 h-10" />
        </TextField.Slot>
        <TextField.Input />
      </TextField.Root>
    </div>
  );
};

export default Experimental;
