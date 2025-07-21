import axios from "axios";
import { useEffect, useState } from "react";
import {
  Car,
  CalendarClock,
  MapPin,
  DollarSign,
  Eye,
} from "lucide-react";

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

  // Split cars array for different screen sizes
  const smCars = cars.slice(0, 1);
  const mdCars = cars.slice(0, 4);

  return (
    <div className="w-full py-10 bg-gradient-to-br from-white via-purple-50 to-purple-100">
      <h2 className="text-4xl font-bold text-center text-purple-700 mb-5 flex items-center justify-center gap-3">
        <Car className="text-yellow-500" />
        Latest Cars
      </h2>

      <div className="px-6 md:px-12">
        {/* Small screens: show 1 card */}
        <div className="grid grid-cols-1 gap-8 md:hidden">
          {smCars.map((car) => (
            <Card key={car._id} car={car} />
          ))}
        </div>

        {/* Medium and up: show 4 cards */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          {mdCars.map((car) => (
            <Card key={car._id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Extracted card component
const Card = ({ car }) => (
  <div className="bg-white/70 backdrop-blur-md border border-purple-600 rounded-2xl shadow-lg p-2 transition-transform hover:scale-[1.01] hover:shadow-xl duration-200">
    <img
      src={car.images[0]}
      alt={car.carModel}
      className="w-full h-56 object-cover rounded-xl border border-purple-100"
    />

    <div className="mt-5 text-gray-800 space-y-3">
      <h3 className="text-2xl font-bold text-purple-700">{car.carModel}</h3>

      <p className="flex items-center gap-2 text-sm">
        <DollarSign size={16} className="text-purple-600" />
        <span className="font-medium">Daily Price:</span> ${car.dailyRentalPrice}/Day
      </p>

      <p className="flex items-center gap-2 text-sm">
        <CalendarClock size={16} className="text-purple-600" />
        <span className="font-medium">Posted:</span>{" "}
        {new Date(car.dateAdded).toLocaleDateString()}
      </p>

      <p className="flex items-center gap-2 text-sm">
        <MapPin size={16} className="text-purple-600" />
        <span className="font-medium">Location:</span> {car.location}
      </p>

      <p className="flex items-center gap-2 text-sm">
        <Eye size={16} className="text-purple-600" />
        <span className="font-medium">Booking:</span> {car.bookingCount}
      </p>

      <div className="text-sm">
        <span className="font-medium">Availability:</span>{" "}
        <span
          className={`font-bold ${
            car.bookingCount > 0 ? "text-red-500" : "text-green-600"
          }`}
        >
          {car.bookingCount > 0 ? "Unavailable" : "Available"}
        </span>
      </div>
    </div>
  </div>
);

export default RecentListing;


