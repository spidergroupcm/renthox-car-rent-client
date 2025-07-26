import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Banner = () => {
  return (
    <div
      className="relative w-full bg-cover bg-center lg:h-[80vh] flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-16 py-10"
      style={{
        backgroundImage: `url('https://i.ibb.co/1tWnmYJM/pp3.png')`,
      }}
    >
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-950 via-purple-700/70 to-transparent z-0"></div>

      {/* Text Content */}
      <div className="relative z-10 max-w-xl text-center lg:text-left">
        <h1 className="relative inline-block text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-lg animate-fadeLeft font-orbitron">
          <span className="relative z-10">Drive Your Dreams.</span>
        </h1>

        <p className="text-white text-xl md:text-2xl mt-4 animate-fadeRight font-hand">
          Turn your dream ride into reality. Enjoy luxury, power, and style without breaking the bank.
        </p>

        <div className="mt-6 flex justify-center md:justify-start">
          <Link to="/availableCar">
            <button className="px-6 py-3 bg-purple-600 hover:bg-yellow-400 hover:text-black transition-all duration-300 ease-in-out text-white font-semibold  rounded-full flex items-center gap-2 shadow-lg border border-2 border-white">
              View Available Cars <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      </div>

      {/* Car Image with Animation */}
      <div className="relative z-10 max-w-md md:max-w-lg lg:max-w-xl mb-10 lg:mb-0">
        <img
          src="https://i.ibb.co/rgWf0CG/pp1.png"
          alt="Luxury Car"
          className="w-full drop-shadow-2xl animate-carMove hover:scale-105 transition-transform duration-500 ease-in-out"
        />
      </div>
    </div>
  );
};

export default Banner;

