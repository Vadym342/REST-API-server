import { useEffect } from "react";
import { getInfoFromLocalStorage } from "./helpers/localstorage.helper";
import { AuthService } from "./features/UserCreation/api/auth.service";
import { useAppDispatch } from "./store/hooks";
import { logOut, login } from "./features/UserCreation/slice/auth.slice";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

function App() {
  const dispatch = useAppDispatch();

  const checkIsUserAuthorized = async () => {
    const token = getInfoFromLocalStorage("token");

    try {
      if (token) {
        const data = await AuthService.isAuthorizedUser();

        data ? dispatch(login(data)) : dispatch(logOut());
      }
    } catch (error) {}
  };

  useEffect(() => {
    checkIsUserAuthorized();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
