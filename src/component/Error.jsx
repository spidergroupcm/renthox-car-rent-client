import React from "react";
import { Link } from "react-router-dom";
import { Car, ArrowLeftCircle } from "lucide-react";

const Error = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-purple-600 text-white px-6 overflow-hidden">
      <div className="text-center max-w-xl animate-fade-in">
        <div className="flex justify-center mb-6">
          <Car className="h-20 w-20 animate-bounce text-yellow-400 drop-shadow-xl" />
        </div>
        <h1 className="text-[90px] font-extrabold tracking-widest drop-shadow-md animate-pulse">
          404
        </h1>
        <p className="text-2xl font-semibold mt-4 mb-2 animate-fade-in-delayed">
          Uh-oh! Wrong turn detected.
        </p>
        <p className="text-yellow-100 text-lg mb-8 animate-fade-in-delayed2">
          This road doesn't lead anywhere. But don’t worry — we’ll get you back on track!
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-yellow-400 text-purple-900 font-bold px-6 py-3 rounded-full shadow-lg transform hover:scale-105 hover:bg-yellow-300 transition-all duration-300 animate-slide-up"
        >
          <ArrowLeftCircle className="w-5 h-5" />
          Drive Back Home
        </Link>
      </div>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
          }
          .animate-fade-in-delayed {
            animation: fadeIn 1.5s ease-out forwards;
          }
          .animate-fade-in-delayed2 {
            animation: fadeIn 2s ease-out forwards;
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-up {
            animation: slideUp 2.2s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Error;

