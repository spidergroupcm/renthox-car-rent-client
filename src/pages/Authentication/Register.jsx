import {
  Car,
  Eye,
  EyeOff,
  ImageIcon,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../../provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { setUser, createNewUser, handleGoogleLogin, updateUserProfile } =
    useContext(authContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const photo = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");

    if (password.length < 6) {
      toast.error("Password must contain at least 6 characters");
      return;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      toast.error("Password must contain at least one lowercase and one uppercase letter.");
      return;
    }

    createNewUser(email, password)
      .then((result) => {
        updateUserProfile(name, photo)
          .then(() => {
            const updatedUser = {
              ...result.user,
              displayName: name,
              photoURL: photo,
            };
            setUser(updatedUser);
            toast.success("Registration successful! Redirecting to home...");
            navigate("/");
          })
          .catch((err) => toast.error("Profile update failed: " + err.message));
      })
      .catch((error) => {
        toast.error(error.message || "An error occurred during registration");
      });
  };

  const googleLogIngHandler = () => {
    handleGoogleLogin().then(() => {
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-4">
                  <Helmet>
                    <title>Register | Renthox</title>
                    <meta name="description" content="Browse our list of available rental cars sorted by price, date, and type. Book your ideal car now!" />
                  </Helmet>
      <div className="w-full max-w-screen-sm bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="bg-purple-600 p-2 rounded-full text-white shadow-md">
              <Car size={24} />
            </div>
            <span className="text-2xl font-bold text-purple-600">Go Rent</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-600">Join us and start your car rental journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center space-x-1">
              <span>Full Name</span>
              <span className="text-purple-600">*</span>
            </label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter your full name"
                className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="photo" className="text-sm font-medium text-gray-700">Photo URL</label>
            <div className="relative group">
              <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                id="photo"
                name="photo"
                type="url"
                placeholder="Enter photo URL (optional)"
                className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center space-x-1">
              <span>Email Address</span>
              <span className="text-purple-600">*</span>
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center space-x-1">
              <span>Password</span>
              <span className="text-purple-600">*</span>
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Create a strong password"
                className="w-full h-12 pl-10 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-start space-x-2 py-2">
            <input
              id="terms"
              type="checkbox"
              required
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{" "}
              <Link to="/terms" className="text-purple-600 font-medium hover:underline">Terms of Service</Link> and{" "}
              <Link to="/privacy" className="text-purple-600 font-medium hover:underline">Privacy Policy</Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition-all duration-200 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin mr-2" />
                <span>Creating Account...</span>
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="relative py-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-4 text-gray-500">Or register with</span>
          </div>
        </div>

        <button
          type="button"
          onClick={googleLogIngHandler}
          className="w-full h-12 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md transition duration-200 flex items-center justify-center space-x-3 shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="text-center pt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;



