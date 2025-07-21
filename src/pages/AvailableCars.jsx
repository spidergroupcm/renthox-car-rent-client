import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {Search, LayoutGrid, LayoutList } from "lucide-react";
import { Helmet } from "react-helmet-async"; 

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/cars?search=${search}&sortBy=${sortBy}&order=${order}`
        );
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
      setLoading(false);
    };
    fetchCars();
  }, [order, search, sortBy]);

  return (
    
    <div className="container py-12 w-11/12 mx-auto">
      
        <Helmet>
        <title>All Car | Renthox</title>
        <meta name="description" content="Browse our list of available rental cars sorted by price, date, and type. Book your ideal car now!" />
      </Helmet>
      <h2 className="text-4xl font-bold text-center text-purple-600 mb-10 flex items-center justify-center gap-2">
        Available Cars
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
        <button
          onClick={() => setView(view === "grid" ? "list" : "grid")}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-transform transform hover:scale-105"
        >
          {view === "grid" ? <LayoutList size={18} /> : <LayoutGrid size={18} />}
          {view === "grid" ? "List View" : "Grid View"}
        </button>

        <div className="flex overflow-hidden border rounded-lg focus-within:ring-2 focus-within:ring-purple-500">
          <input
            className="px-4 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none"
            type="search"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search car model"
            aria-label="Search car model"
          />
          <button className="flex items-center gap-1 px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 transition-colors">
            <Search size={16} />
            Search
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <select
            className="border border-purple-400 text-purple-700 p-2 rounded focus:ring-2 focus:ring-purple-500"
            defaultValue=""
            onChange={(e) => {
              const [field, orderValue] = e.target.value.split("-");
              setSortBy(field);
              setOrder(orderValue);
            }}
          >
            <option value="" disabled>Sort by Date</option>
            <option value="dateAdded-desc">Newest</option>
            <option value="dateAdded-asc">Oldest</option>
          </select>

          <select
            className="border border-purple-400 text-purple-700 p-2 rounded focus:ring-2 focus:ring-purple-500"
            defaultValue=""
            onChange={(e) => {
              const [field, orderValue] = e.target.value.split("-");
              setSortBy(field);
              setOrder(orderValue);
            }}
          >
            <option value="" disabled>Sort by Price</option>
            <option value="dailyRentalPrice-asc">Lowest</option>
            <option value="dailyRentalPrice-desc">Highest</option>
          </select>
        </div>
      </div>

      {cars.length === 0 && !loading && (
        <div className="text-center text-gray-600 text-xl mt-10">
          No cars found matching your criteria.
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600"></div>
        </div>
      ) : (
        <div
          className={`${
            view === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              : "space-y-4"
          } gap-6`}
        >
          {cars.map((car) => (
            <div
              key={car._id}
              className={`${
                view === "grid"
                  ? "bg-white rounded-xl shadow-lg p-4 border border-transparent hover:border-purple-600 transition-transform hover:scale-102"
                  : "flex flex-col md:flex-row items-center space-x-0 md:space-x-6 bg-white shadow-md rounded-xl p-6 border-2 border-transparent hover:border-purple-600 transition-transform"
              }`}
            >
              <img
                src={car.images[0]}
                alt={car.carModel}
                className={`${
                  view === "grid"
                    ? "w-full h-60 object-cover rounded-lg mb-4"
                    : "w-full md:w-1/3 h-64 md:h-52 object-cover rounded-lg mb-4 md:mb-0"
                }`}
              />

              <div className={`${view === "grid" ? "text-start" : "flex-1"}`}>
                <h3 className="text-2xl font-bold text-purple-600 mb-1">
                  {car.carModel}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{car.carType}</p>
                <p className="mb-1">
                  <span className="text-sm font-medium">Daily Price: </span>
                  <span className="text-sm text-yellow-500 font-semibold">
                    ${car.dailyRentalPrice}/Day
                  </span>
                </p>
                <p>
                  <span className="text-sm font-medium">Date Posted:</span>{" "}
                  <span className="text-sm text-gray-600">
                    {new Date(car.dateAdded).toLocaleDateString()}
                  </span>
                </p>
                <p>
                  <span className="text-sm font-medium">Availability:</span>{" "}
                  <span
                    className={
                      car.bookingCount > 0
                        ? "text-red-600 font-bold"
                        : "text-green-600 font-bold"
                    }
                  >
                    {car.bookingCount > 0 ? "Unavailable" : "Available"}
                  </span>
                </p>
                <p>
                  <span className="text-sm font-medium">Location:</span>{" "}
                  <span className="text-sm text-gray-600">{car.location}</span>
                </p>
                <p>
                  <span className="text-sm font-medium">Booking:</span>{" "}
                  <span className="text-sm text-gray-600">
                    {car.bookingCount}
                  </span>
                </p>
                <NavLink to={`/carDetails/${car._id}`}>
                  <button
                    className={`mt-4 w-full text-white py-2 rounded-lg transition-colors ${
                      car.bookingCount > 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700"
                    }`}
                    disabled={car.bookingCount > 0}
                  >
                    {car.bookingCount > 0 ? "Unavailable" : "Book Now"}
                  </button>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableCars;


