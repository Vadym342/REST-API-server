import { ChangeEvent, FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { emailRegex, phoneRegex } from "../../constants/constants";
import { toast } from "react-toastify";
import { UserDataType } from "../../types/user.types";
import { useAppDispatch } from "../../../../store/hooks";
import { setCheckerForm } from "../../slice/auth.slice";

import { PasswordVisibleSVG } from "../../../../assets/ShowPassword/passwordVisibleSVG";
import { PasswordUnVisibleSVG } from "../../../../assets/ShowPassword/passwordUnVisibleSVG";

import { Button } from "../../../../shared/components/buttons/buttons";
import { UserFormBodyContainer } from "./UserFormBody/UserFormBody";
import { UserFormHeader } from "./UserFormHeader/AuthHeader";
import { PositionService } from "../../api/position.service";
import { PositionType } from "../../types/position.types";
import { UploadFileSVG } from "../../../../assets/File/uploadFIleSVG";
import { UserService } from "../../api/user.service";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  email: string;
  name: string;
  phone: string;
  positionId: number;
  photo: any;
  password: string;
}

export const CreateUserForm: FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [listPositions, setListPositions] = useState<PositionType[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [phone, setPhone] = useState<string>("+380");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleSwitchForm = () => {
    dispatch(setCheckerForm(true));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setPhotoFile(file || null);
  };

  const handleRedirectToUserList = (e: any) => {
    navigate("/users");
  };

  const handleGetPositions = async () => {
    try {
      const response = await PositionService.getAllPositions();

      if (response?.errors?.length) {
        toast.error(response?.errors[0].message);
      }

      setListPositions([...listPositions, ...response.data]);
    } catch (err: any) {
      toast.error(err);
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data: UserDataType) => {
    try {
      const response = await UserService.createUser({
        ...data,
        positionId: +selectedPosition,
        phone,
        photo: photoFile,
      });

      if (response?.status) {
        toast.success("User has been created");
        navigate("/users");
      }

      if (response?.errors?.length) {
        toast.error(response?.errors[0].message);
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  useEffect(() => {
    handleGetPositions();
  }, []);

  return (
    <UserFormBodyContainer>
      <UserFormHeader />

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block text-gray-700 text-sm font-bold">Email</label>
        <input
          {...register("email", {
            required: true,
            maxLength: 96,
            pattern: emailRegex,
          })}
          className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Email"
        />
        {errors.email && (
          <div className="-mt-2 text-red-500 text-sm">
            <span>
              {errors.email.type === "required" && "This field is required"}
              {errors.email.type === "maxLength" && "Max length 96 symbols"}
              {errors.email.type === "pattern" &&
                "Should be in email format 'someEmail@gmail.com'"}
            </span>
          </div>
        )}

        <label className="block text-gray-700 text-sm font-bold">
          Name (without FE validation)
        </label>
        <input
          {...register("name", { required: false })}
          className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Name"
        />

        <label className="block text-gray-700 text-sm font-bold">Phone</label>
        <input
          {...register("phone", {
            required: true,
            maxLength: 13,
            pattern: phoneRegex,
          })}
          className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />
        {errors.phone && (
          <div className="-mt-2 text-red-500 text-sm">
            <span>
              {errors.phone.type === "required" && "This field is required"}
              {errors.phone.type === "maxLength" && "Max length 13 symbols"}
              {errors.phone.type === "pattern" &&
                "Allowed only numbers '+380123456789'"}
            </span>
          </div>
        )}

        <label className="block text-gray-700 text-sm font-bold">
          Position
        </label>
        <select
          {...register("positionId", {
            required: true,
          })}
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
          className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option />
          {listPositions.map((position: PositionType, index) => (
            <option key={index} value={position.id}>
              {position.name}
            </option>
          ))}
        </select>
        {errors.positionId && (
          <div className="-mt-2 text-red-500 text-sm">
            <span>
              {errors.positionId.type === "required" &&
                "This field is required"}
            </span>
          </div>
        )}

        <div className="relative container">
          <label className="block text-gray-700 text-sm font-bold">
            Password
          </label>
          <input
            type={isPasswordVisible ? "text" : "password"}
            {...register("password", {
              required: true,
              minLength: 5,
              maxLength: 20,
            })}
            className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
          />
          <button
            className="mt-3 absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
            onClick={(e) => togglePasswordVisibility(e)}
          >
            {isPasswordVisible ? (
              <PasswordVisibleSVG />
            ) : (
              <PasswordUnVisibleSVG />
            )}
          </button>
          {errors.password && (
            <div className="-mt-2 text-red-500 text-sm">
              <span>
                {errors.password.type === "required" &&
                  "This field is required"}
                {errors.password.type === "minLength" && "Max length 5 symbols"}
                {errors.password.type === "maxLength" &&
                  "Max length 20 symbols"}
              </span>
            </div>
          )}
        </div>

        <div>
          <label className="bg-white text-black text-base rounded w-80 h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
            <UploadFileSVG />
            Upload Photo
            <input type="file" className="hidden" onChange={handleFileChange} />
            <p className="text-xs text-gray-400 mt-2">JPG, JPEG are Allowed.</p>
            {photoFile && <p>Selected File: {photoFile.name}</p>}
          </label>
        </div>

        <div className="mb-5 pb-1 pt-1 text-center">
          <div className="w-full">
            <Button type="submit" children="Create" btnStyle="secondary" />
          </div>
        </div>

        <div className="flex items-center justify-between pb-6">
          <p className="mb-0 mr-2">Authorized user?</p>
          <div>
            <button
              onClick={handleRedirectToUserList}
              type="button"
              className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            >
              User List
            </button>
          </div>
          <div>
            <button
              onClick={handleSwitchForm}
              type="button"
              className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            >
              Authorize
            </button>
          </div>
        </div>
      </form>
    </UserFormBodyContainer>
  );
};
