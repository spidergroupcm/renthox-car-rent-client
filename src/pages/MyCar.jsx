import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { authContext } from "../provider/AuthProvider";
import {
  Car,
  Pencil,
  Trash2,
  CalendarClock,
  DollarSign,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const MyCar = () => {
  const { user } = useContext(authContext);
  const [cars, setCars] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const navigate = useNavigate();

  const fetchCars = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/myCars?email=${user.email}&sortBy=${sortBy}&order=${order}`,
      { withCredentials: true }
    );
    setCars(data);
  };

  useEffect(() => {
    fetchCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.email, sortBy, order]);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/cars/${_id}`, {
          method: "DELETE",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your car has been deleted.", "success");
              const remaining = cars.filter((car) => car._id !== _id);
              setCars(remaining);
            }
          });
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/updateCar/${id}`);
  };

  return (
    <div className="p-6 w-11/12 mx-auto">
                <Helmet>
                    <title>My Car | Renthox</title>
                    <meta name="description" content="Browse our list of available rental cars sorted by price, date, and type. Book your ideal car now!" />
                  </Helmet>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-purple-600 flex items-center gap-2">
          <Car className="text-yellow-400" /> Manage Your Cars
        </h1>

        <div className="flex gap-4 items-center">
          <select
            className="border border-purple-300 text-purple-700 p-2 rounded focus:ring-2 focus:ring-purple-500"
            defaultValue=""
            onChange={(e) => {
              const [field, orderValue] = e.target.value.split("-");
              setSortBy(field);
              setOrder(orderValue);
            }}
          >
            <option value="" disabled>
              <CalendarClock size={14} /> Sort by Date
            </option>
            <option value="dateAdded-desc">Newest</option>
            <option value="dateAdded-asc">Oldest</option>
          </select>

          <select
            className="border border-purple-300 text-purple-700 p-2 rounded focus:ring-2 focus:ring-purple-500"
            defaultValue=""
            onChange={(e) => {
              const [field, orderValue] = e.target.value.split("-");
              setSortBy(field);
              setOrder(orderValue);
            }}
          >
            <option value="" disabled>
              <DollarSign size={14} /> Sort by Price
            </option>
            <option value="dailyRentalPrice-asc">Lowest</option>
            <option value="dailyRentalPrice-desc">Highest</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full border border-purple-200 rounded overflow-hidden">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="px-4 py-3 border border-purple-300">Image</th>
              <th className="px-4 py-3 border border-purple-300">Model</th>
              <th className="px-4 py-3 border border-purple-300">Price/Day</th>
              <th className="px-4 py-3 border border-purple-300">Status</th>
              <th className="px-4 py-3 border border-purple-300">Posted On</th>
              <th className="px-4 py-3 border border-purple-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr
                key={car._id}
                className={`${
                  index % 2 === 0 ? "bg-purple-50" : "bg-white"
                } hover:bg-purple-100 transition`}
              >
                <td className="px-4 py-3 text-center border border-purple-100">
                  <img
                    src={car.images[0]}
                    alt="Car"
                    className="w-24 h-16 object-cover mx-auto rounded-md border border-purple-300 shadow"
                  />
                </td>
                <td className="px-4 py-2 text-center font-semibold text-purple-700">
                  {car.carModel}
                </td>
                <td className="px-4 py-2 text-center text-yellow-500 font-bold">
                  ${car.dailyRentalPrice}/Day
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`font-bold ${
                      car.bookingCount > 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {car.bookingCount > 0 ? "Unavailable" : "Available"}
                  </span>
                </td>
                <td className="px-4 py-2 text-center text-gray-600">
                  {new Date(car.dateAdded).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-center flex justify-center gap-2">
                  <button
                    onClick={() => handleUpdate(car._id)}
                    className="flex items-center gap-1 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
                  >
                    <Pencil size={16} /> Update
                  </button>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="flex items-center gap-1 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {cars.length === 0 && (
          <p className="text-center text-purple-600 font-semibold text-xl mt-6 p-8 bg-purple-50 rounded-lg">
            You haven’t added any cars yet!{" "}
            <a
              href="/addCar"
              className="text-yellow-500 underline hover:text-yellow-600"
            >
              Add Your First Car
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default MyCar;

