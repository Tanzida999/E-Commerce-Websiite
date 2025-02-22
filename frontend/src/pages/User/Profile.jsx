import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import AdminMenu from "../Admin/AdminMenu";

const Profile = () => {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpadteProfile }] =
    useProfileMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setUsername(userInfo.userName);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.userName]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          userName,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile Updated Successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-20">
      <AdminMenu />
      <div className="flex justify-center items-center md:flex-row md:space-x-4">
        <div className="md:w-1/3 w-full bg-white shadow-lg p-6 rounded-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Update Profile
          </h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-input p-4 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-input p-4 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-input p-4 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-input p-4 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                type="submit"
                className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 focus:ring-4 focus:ring-pink-300"
              >
                Update
              </button>
              <Link
                to="/user-orders"
                className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:ring-4 focus:ring-pink-300"
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>

        {loadingUpadteProfile && <Loader />}
      </div>
    </div>
  );
};

export default Profile;
