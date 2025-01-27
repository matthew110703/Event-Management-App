import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import { showAlert } from "../../store/alertSlice";

// API Service
import { verifyUser } from "../../lib/apiServices";

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const { token: authToken, isGuest } = useSelector((state) => state.auth);
  const localToken = localStorage.getItem("token");

  useEffect(() => {
    const validateUser = async () => {
      try {
        if (!authToken && localToken) {
          const res = await verifyUser(localToken);

          if (res) {
            const { name, email, _id: id } = res;
            dispatch(setUser({ user: { name, email, id }, token: localToken }));
          } else {
            throw new Error(res.error || "Invalid token.");
          }
        } else if (!authToken && !isGuest) {
          navigate("/");
        }
      } catch (error) {
        localStorage.clear();
        console.error(error);
        dispatch(
          showAlert({
            message: error.message || "An error occurred.",
            type: "error",
          }),
        );
        navigate("/");
      }
    };

    validateUser();
  }, [authToken, isGuest, dispatch, localToken, navigate]);

  return authToken || isGuest ? children : null;
};

export default Protected;
