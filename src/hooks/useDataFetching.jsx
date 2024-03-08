import axios from "axios";
import { useSharedState } from "@/context/sharedContext";
import { REQUEST_TOKEN, MAIN_URL } from "../utils/constants";
import { toast } from "react-toastify";

const useDataFetching = () => {
  const {
    state: { token, difficulty },
    dispatch,
  } = useSharedState();

  const notifyError = (message) => toast.error(message);

  const API_URL = `${MAIN_URL}?amount=10&category=9&difficulty=${difficulty}&type=multiple`;

  const fetchData = async () => {
    try {
      const userToken = await axios.get(REQUEST_TOKEN);
      const { token, response_code, response_message } = userToken.data;

      if (response_code !== 0) {
        notifyError(response_message);
        dispatch({ type: "SET_TOKEN", payload: "" });
        dispatch({ type: "LOADING_FALSE" });
        dispatch({ type: "SET_DATA", payload: [] });
        return;
      }

      dispatch({ type: "SET_TOKEN", payload: token });

      const res = await axios.get(`${API_URL}&token=${token}`);
      dispatch({ type: "SET_DATA", payload: res.data.results });
      dispatch({ type: "LOADING_FALSE" });
    } catch (error) {
      notifyError(error.message);
    } finally {
      dispatch({ type: "LOADING_FALSE" });
    }
  };

  const handleFetch = async () => {
    try {
      dispatch({ type: "LOADING_TRUE" });

      const res = await axios.get(`${API_URL}&token=${token}`);
      dispatch({ type: "SET_DATA", payload: res.data.results });
      console.log(res.data.results, "result");

      dispatch({ type: "LOADING_FALSE" });
    } catch (error) {
      notifyError(error.message);
      dispatch({ type: "LOADING_FALSE" });
    }
  };

  return { handleFetch, fetchData };
};

export default useDataFetching;
