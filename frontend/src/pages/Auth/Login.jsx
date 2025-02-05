import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  // Select the userInfo from the Redux store
  const { userInfo } = useSelector((state) => state.auth || {});

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  // Update navigation if user is logged in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in both fields");
      return;
    }

    try {
      console.log("Submitting login form...");

      const res = await login({ email, password }).unwrap();
      console.log("Login Response:", res);

      if (res && res._id) {
        dispatch(setCredentials(res));
        console.log("Credentials Dispatched:", res); // Confirm the dispatched action
      } else {
        throw new Error("Login failed or response does not contain user info");
      }

      if (res && res.userName) {
        navigate(redirect);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-5rem">
          <h1 className="text-3xl font-semibold mb-4">Sign In</h1>
          <form
            action=""
            className="container w-[40rem]"
            onSubmit={submitHandler}
          >
            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-sm font-semibold">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label htmlFor="password" className="block text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[2rem]"
            >
              {isLoading ? "Signing In...." : " Sign In"}
            </button>
            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p className="text-black">
              New Customer ?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        <img src="/pexels-sarika-630844.jpg" alt="" />
      </section>
    </div>
  );
};

export default Login;
