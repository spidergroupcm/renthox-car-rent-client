import axios from "axios";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendarDate } from "react-icons/ci";
import { LuTrash2 } from "react-icons/lu";
import Swal from "sweetalert2";
import { authContext } from "../provider/AuthProvider";
import { Helmet } from "react-helmet-async";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MyBooking = () => {
  const { user } = useContext(authContext);
  const [cars, setCars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    fetchAllBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchAllBooks = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/books/${user?.email}`,
      { withCredentials: true }
    );
    setCars(data);
  };

  const handleCancel = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/books/${_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              Swal.fire({
                title: "Canceled!",
                text: "Your booking has been canceled successfully.",
                icon: "success",
              });
              const updatedCars = cars.map((car) =>
                car._id === _id ? { ...car, status: "Canceled" } : car
              );
              setCars(updatedCars);
            }
          });
      }
    });
  };

  const openModifyModal = (booking) => {
    if (!booking) return;
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!selectedBooking || !startDate || !endDate) return;

    const updatedData = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: "Confirmed",
    };

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/books/dates/${selectedBooking._id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.modifiedCount > 0) {
        setCars((prevCars) =>
          prevCars.map((car) =>
            car._id === selectedBooking._id ? { ...car, ...updatedData } : car
          )
        );
        Swal.fire({
          title: "Updated!",
          text: "Booking dates updated successfully, and status confirmed.",
          icon: "success",
        });

        setIsModalOpen(false);
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update booking dates.",
        icon: "error",
      });
      console.error(error);
    }
  };

  // chart data
  const chartData = {
    labels: cars.map((car) => car.carModel),
    datasets: [
      {
        label: "Daily Rental Price",
        data: cars.map((car) => car.dailyRentalPrice),
        backgroundColor: "rgba(147, 51, 234, 0.6)", // purple-600 with opacity
        borderColor: "rgba(107, 33, 168, 1)",       // purple-800
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Car Daily Rental Prices",
        color: "#b91c1c", // Dark red for title
      },
    },
  };

  return (
    <div className="w-11/12 mx-auto p-4">
                <Helmet>
                    <title>My Booking | Renthox</title>
                    <meta name="description" content="Browse our list of available rental cars sorted by price, date, and type. Book your ideal car now!" />
                  </Helmet>
      
        <h2 className="text-4xl font-bold text-center text-purple-600 mb-10 flex items-center justify-center gap-2">
        My Bookings
      </h2>

      {/* Booking */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-red-200 rounded-lg overflow-hidden">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="px-4 py-2">Car Image</th>
              <th className="px-4 py-2">Car Model</th>
              <th className="px-4 py-2">Booking Date</th>
              <th className="px-4 py-2">Total Price</th>
              <th className="px-4 py-2">Booking Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((book, i) => (
              <tr key={i}>
                <td className="px-4 py-2 text-center">
                  <img
                    src={book.image}
                    alt={book.carModel}
                    className="w-16 h-16 object-cover rounded-md mx-auto"
                  />
                </td>
                <td className="px-4 py-2 text-center">{book.carModel}</td>
                <td className="px-4 py-2 text-center">
                  {`${new Date(book.startDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })} ${new Date(book.startDate).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })} to ${new Date(book.endDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })} ${new Date(book.endDate).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`}
                </td>
                <td className="px-4 py-2 text-center">
                  ${book.dailyRentalPrice}
                </td>
                <td className="px-4 py-2 text-center">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                      book.status === "Pending" &&
                      "bg-yellow-100/60 text-yellow-500"
                    } ${
                      book.status === "Confirmed" &&
                      "bg-green-100/60 text-green-500"
                    } ${
                      book.status === "Canceled" && "bg-red-100/60 text-red-500"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        book.status === "Pending" && "bg-yellow-500"
                      } ${book.status === "Confirmed" && "bg-green-500"} ${
                        book.status === "Canceled" && "bg-red-500"
                      }`}
                    ></span>
                    <h2 className="text-sm font-normal">{book.status}</h2>
                  </div>
                </td>
                <td className="px-4 py-2 mt-4 flex flex-col md:flex-row items-center justify-center text-center">
                  <button
                    className="bg-purple-600 flex items-center text-white px-2 py-1 rounded-md mr-2 hover:bg-red-700 transition duration-300"
                    onClick={() => openModifyModal(book)}
                  >
                    Modify <CiCalendarDate className="text-xl font-bold" />
                  </button>
                  <button
                    className="bg-red-500 flex items-center text-white px-3 py-1 rounded-md hover:bg-gray-600 transition duration-300"
                    onClick={() => handleCancel(book._id)}
                  >
                    Cancel <LuTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Chart Section */}
      <div className="my-8">
         <h2 className="text-4xl font-bold text-left text-purple-600 mb-10 flex items-center justify-center gap-2">
        Data Visualization
      </h2>
      
        <div className="bg-white p-4 rounded-md shadow-md">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Modify Booking Date</h2>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Start Date</label>
              <DatePicker
                className="border p-2 rounded-md"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">End Date</label>
              <DatePicker
                className="border p-2 rounded-md"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition duration-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm} // Use the red theme for the Confirm button
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-300"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
