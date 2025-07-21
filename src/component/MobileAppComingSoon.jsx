import React from "react";

const MobileAppComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-tr from-purple-50 to-white relative overflow-hidden px-6">
      <div className="relative max-w-4xl w-full flex flex-col md:flex-row items-center gap-12 z-10">
        {/* Left Content */}
        <div className="text-center md:text-left space-y-6 max-w-md">
          <h1 className="text-5xl text-purple-600 tracking-wide animate-gradient-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 bg-clip-text text-transparent">
            Our Mobile App Coming Soon
          </h1>
          <p className="text-lg text-purple-700/90 leading-relaxed">
            Get ready to experience the future of technology at your fingertips.
            Our app is launching soon, available on both <span className="font-semibold">iOS</span> and <span className="font-semibold">Android</span> devices.
          </p>
        </div>

        {/* Right Image with tilt animation */}
        <div className="flex-shrink-0 animate-tilt">
          <img
            src="https://i.ibb.co/cK2KxckW/cellphone-3100428-1280.png"
            alt="Mobile App Preview"
            className="w-96 select-none"
            draggable={false}
          />
        </div>
      </div>

      {/* Subtle futuristic pulse animation */}
      <div className="w-48 h-48 rounded-full bg-purple-600/20 animate-pulse-slow absolute top-20 right-20 pointer-events-none -z-10"></div>
      <div className="w-64 h-64 rounded-full bg-purple-400/10 animate-pulse-slower absolute bottom-10 left-10 pointer-events-none -z-10"></div>

      <style>
        {`
          @keyframes tilt {
            0%, 100% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(4deg);
            }
            50% {
              transform: rotate(0deg);
            }
            75% {
              transform: rotate(-4deg);
            }
          }
          @keyframes pulse-slow {
            0%, 100% {
              opacity: 0.15;
            }
            50% {
              opacity: 0.3;
            }
          }
          @keyframes pulse-slower {
            0%, 100% {
              opacity: 0.1;
            }
            50% {
              opacity: 0.25;
            }
          }
          @keyframes gradient-text {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-tilt {
            animation: tilt 6s ease-in-out infinite;
            transform-origin: center bottom;
          }
          .animate-pulse-slow {
            animation: pulse-slow 6s ease-in-out infinite;
          }
          .animate-pulse-slower {
            animation: pulse-slower 8s ease-in-out infinite;
          }
          .animate-gradient-text {
            background-size: 200% 200%;
            animation: gradient-text 6s ease infinite;
          }
        `}
      </style>
    </div>
  );
};

export default MobileAppComingSoon;


