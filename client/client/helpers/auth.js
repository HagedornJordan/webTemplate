import axiosInstance from "../helpers/axios";

export const logout = async () => {
  const res = await axiosInstance.get("/logout");
  if (res.data.status === "SUCCESS") {
    localStorage.removeItem("current_user");
    window.location.reload(false);
  }
};

export default logout;
