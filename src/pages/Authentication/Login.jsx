import { Car, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../../provider/AuthProvider";
import login from "../../assets/logIN.jpg";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { userLogin, handleGoogleLogin } = useContext(authContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setIsLoading(true);
    userLogin(email, password)
      .then(() => {
        const redirectTo = location.state?.from || "/";
        navigate(redirectTo);
        toast.success("Login successful!");
      })
      .catch(() => {
        toast.error("No account found with this email. Please register.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const googleLogIngHandler = () => {
    handleGoogleLogin().then(() => {
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-50 flex items-center justify-center p-4">
                  <Helmet>
                    <title>Login | Renthox</title>
                    <meta name="description" content="Browse our list of available rental cars sorted by price, date, and type. Book your ideal car now!" />
                  </Helmet>
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-stretch rounded-3xl shadow-2xl overflow-hidden bg-white">
        {/* Left Section - Image and Branding */}
        <div className="bg-purple-50 hidden lg:flex flex-col justify-between p-8">
          <div className="space-y-4 text-center">
            {/* <div className="flex justify-center items-center space-x-3">
              <div className="bg-purple-600 p-3 rounded-full text-white shadow-lg">
                <Car size={32} />
              </div>
              <h1 className="text-4xl font-bold text-purple-700">CarRental</h1>
            </div> */}
            <h2 className="text-3xl font-bold text-purple-600">Welcome Back!</h2>
            <p className="text-gray-600 text-lg">
              Login to manage your car rentals.
            </p>
          </div>
          <img
            src={login}
            alt="Car rental"
            className="w-full h-[400px] object-cover rounded-xl shadow-lg border border-purple-200"
          />
        </div>

        {/* Right Section - Login Form */}
        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-md space-y-6">
            {/* Mobile Branding */}
            <div className="lg:hidden flex justify-center items-center space-x-2 mb-4">
              <div className="bg-purple-600 p-2 rounded-full text-white">
                <Car size={24} />
              </div>
              <span className="text-2xl font-bold text-purple-700">CarRental</span>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
              <p className="text-gray-500">Access your account below</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" size={16} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" size={16} />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full h-12 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember and Forgot */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="text-purple-600 rounded border-gray-300" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-purple-600 hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="h-px bg-gray-300 flex-1" />
              <span className="text-gray-400 text-sm">or</span>
              <div className="h-px bg-gray-300 flex-1" />
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={googleLogIngHandler}
              className="w-full h-12 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center space-x-3 transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="text-center pt-4 text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-purple-600 hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

