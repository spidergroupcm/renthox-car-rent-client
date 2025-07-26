import axios from "axios";
import { useEffect, useState } from "react";
import { Car, DollarSign, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const RecentListing = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/cars/limit`
        );
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };
    fetchCars();
  }, []);

  // Only take 4 cars max
  const displayedCars = cars.slice(0, 4);

  return (
    <div className="w-full py-14 bg-gradient-to-br from-white via-purple-50 to-purple-100">
      <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-10 flex items-center justify-center gap-3 tracking-wide">
        <Car className="text-yellow-500" />
        Latest Cars
      </h2>

      <div className="px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedCars.map((car) => (
            <Card key={car._id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Card = ({ car }) => (
  <div className="bg-white/70 backdrop-blur-lg border border-purple-300 rounded-3xl shadow-xl p-4 transition-all duration-300 hover:scale-[1.02] hover:border-purple-500 hover:shadow-purple-200 group flex flex-col justify-between">
    <div>
      <div className="relative">
        <img
          src={car.images[0]}
          alt={car.carModel}
          className="w-full h-48 object-cover rounded-2xl border border-purple-200 shadow-sm"
        />
      </div>

      <div className="mt-5 space-y-4">
        <h3 className="text-xl font-bold text-purple-700 group-hover:text-purple-900 transition-all">
          {car.carModel}
        </h3>

        <div className="flex items-center gap-2 text-gray-700 text-sm">
          <DollarSign size={18} className="text-purple-600" />
          <span className="font-medium">Daily Price:</span>
          <span className="font-bold text-black">${car.dailyRentalPrice}/Day</span>
        </div>
      </div>
    </div>

    {/* Redirect Button */}
    <div className="mt-6">
      <Link to="/availableCar">
        <button className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 text-white font-semibold hover:bg-yellow-400 hover:text-black transition-all duration-300 border border-white shadow-md">
          View More Cars <ArrowRight size={18} />
        </button>
      </Link>
    </div>
  </div>
);

export default RecentListing;
