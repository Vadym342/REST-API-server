import { FC, useEffect, useState } from "react";
import { UserService } from "../../UserCreation/api/user.service";
import { UserDataType } from "../../UserCreation/types/user.types";
import { toast } from "react-toastify";
import { Button } from "../../../shared/components/buttons/buttons";
import { useNavigate } from "react-router-dom";

export const UserList: FC = () => {
  const [listOfUsers, setListOfUsers] = useState<UserDataType[]>([]);
  const navigate = useNavigate();

  const handleGetListOfUsers = async () => {
    try {
      const guests = await UserService.getAllUsers();

      if (guests) {
        setListOfUsers(guests.data);
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  const handleRedirectToCreationUser = () => {
    navigate("/user");
  };

  useEffect(() => {
    handleGetListOfUsers();
  }, []);

  return (
    <div>
      <h3 className="my-10 text-4xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-400 to-orange-500">
        USER LIST
      </h3>
      <Button
        handler={handleRedirectToCreationUser}
        type="submit"
        children="Create User"
        btnStyle="secondary"
      />

      <ul className="grid grid-flow-row px-10">
        {listOfUsers?.map((user, index: number) => (
          <li
            key={index}
            className="mt-1 shadow-lg bg-green-10 font-bold text-center rounded-lg"
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
