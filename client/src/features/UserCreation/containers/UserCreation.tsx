import { FC } from "react";
import { useAppSelector } from "../../../store/hooks";
import { CreateUserForm } from "../components/UserForms/CreateUserForm";
import { AuthorizationUserForm } from "../components/UserForms/AuthorizationUserForm";

export const UserCreation: FC = () => {
  const { checkerForm } = useAppSelector((state) => state.auth);

  return <>{checkerForm ? <AuthorizationUserForm /> : <CreateUserForm />}</>;
};
