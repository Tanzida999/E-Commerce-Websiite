import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";

const Profile = () => {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpadteProfile }] =
    useProfileMutation();

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
        toast.success("Profile Updated SuccessFully");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  const dispatch = useDispatch();
  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-black mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-input p-4 rounded-sm w-full"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-black mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-input p-4 rounded-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-input p-4 rounded-sm w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Passpord"
                className="form-input p-4 rounded-sm w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-pink-500 text-black py-2 px-4 rounded hover:bg-pink-6000"
                type="submit"
              >
                Update
              </button>
              <Link
                to="/user-orders"
                className="bg-pink-600 text-black py-2 px-4 rounded hover:bg-pink-700"
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
