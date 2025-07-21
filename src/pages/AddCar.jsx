import axios from "axios";
import { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authContext } from "../provider/AuthProvider";
import { imageUpload } from "../api/utils";
 import { Helmet } from "react-helmet-async"; 

const AddCar = () => {
  const navigate = useNavigate();
  const { user } = useContext(authContext);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedImages((prevImages) => [...prevImages, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemoveImage = (index) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    const form = e.target;
    const carModel = form.carModel.value;
    const dailyRentalPrice = form.dailyRentalPrice.value;
    const availability = form.availability.value;
    const vehicleRegNumber = form.vehicleRegNumber.value;
    const features = form.features.value;
    const description = form.description.value;
    const location = form.location.value;

    let uploadedUrls = [];
    try {
      uploadedUrls = await Promise.all(uploadedImages.map(imageUpload));
      setImageUrls(uploadedUrls);
    } catch (err) {
      toast.error("Image upload failed");
      return;
    }

    const addCar = {
      carModel,
      dailyRentalPrice,
      availability,
      vehicleRegNumber,
      features,
      description,
      images: uploadedUrls,
      location,
      bookingCount: 0,
      name: user?.displayName,
      email: user?.email,
      dateAdded: new Date().toISOString(),
      bookingStatus: "pending",
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/add-car`, addCar);
      form.reset();
      setUploadedImages([]);
      setImageUrls([]);
      toast.success("Car added successfully!");
      navigate("/myCar");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-purple-50 rounded-xl shadow-2xl my-8">

      
              <Helmet>
              <title>Add Car | Renthox</title>
              <meta name="description" content="Browse our list of available rental cars sorted by price, date, and type. Book your ideal car now!" />
            </Helmet>

      <h2 className="text-4xl font-bold text-center text-purple-600 mb-10 flex items-center justify-center gap-2">
        Add Car
      </h2>
     

      <form onSubmit={handleAddCar} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Car Model */}
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">
              Car Model
            </label>
            <input
              type="text"
              name="carModel"
              className="mt-1 p-3 w-full border border-purple-300 rounded-md shadow-sm"
              placeholder="Enter Car Model"
              required
            />
          </div>

          {/* Daily Rental Price */}
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">
              Daily Rental Price
            </label>
            <input
              type="number"
              name="dailyRentalPrice"
              className="mt-1 p-3 w-full border border-purple-300 rounded-md shadow-sm"
              placeholder="Enter Daily Rental Price"
              required
            />
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">
              Availability
            </label>
            <select
              name="availability"
              className="mt-1 p-3 w-full border border-purple-300 rounded-md shadow-sm"
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          {/* Vehicle Registration Number */}
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">
              Vehicle Registration Number
            </label>
            <input
              type="text"
              name="vehicleRegNumber"
              className="mt-1 p-3 w-full border border-purple-300 rounded-md shadow-sm"
              placeholder="Enter Registration Number"
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">
              Features
            </label>
            <select
              name="features"
              className="mt-1 p-3 w-full border border-purple-300 rounded-md shadow-sm"
            >
              <option value="GPS">GPS</option>
              <option value="AC">AC</option>
              <option value="Heated Seats">Heated Seats</option>
              <option value="Bluetooth">Bluetooth</option>
              <option value="Backup Camera">Backup Camera</option>
              <option value="Sunroof">Sunroof</option>
              <option value="All Wheel Drive">All Wheel Drive</option>
              <option value="Cruise Control">Cruise Control</option>
              <option value="Lane Assist">Lane Assist</option>
              <option value="Blind Spot Monitor">Blind Spot Monitor</option>
              <option value="Leather Seats">Leather Seats</option>
              <option value="Apple CarPlay">Apple CarPlay</option>
              <option value="Android Auto">Android Auto</option>
              <option value="Remote Start">Remote Start</option>
              <option value="Keyless Entry">Keyless Entry</option>
            </select>
          </div>

          
          {/* Location */}
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-1">
                Location
              </label>
              <select
                name="location"
                className="mt-1 p-3 w-full border border-purple-300 rounded-md shadow-sm"
                required
              >
                <option value="" disabled selected>Select Location</option>
                <option value="Dhanmondi">Dhanmondi</option>
                <option value="Gulshan">Gulshan</option>
                <option value="Banani">Banani</option>
                <option value="Mirpur">Mirpur</option>
                <option value="Mohammadpur">Mohammadpur</option>
                <option value="Uttara">Uttara</option>
                <option value="Badda">Badda</option>
                <option value="Tejgaon">Tejgaon</option>
                <option value="Rampura">Rampura</option>
                <option value="Baridhara">Baridhara</option>
                <option value="Motijheel">Motijheel</option>
                <option value="Shahbagh">Shahbagh</option>
                <option value="Jatrabari">Jatrabari</option>
                <option value="Shyamoli">Shyamoli</option>
                <option value="Malibagh">Malibagh</option>
                <option value="Wari">Wari</option>
                <option value="Khilgaon">Khilgaon</option>
                <option value="Khilkhet">Khilkhet</option>
                <option value="Azimpur">Azimpur</option>
                <option value="Lalbagh">Lalbagh</option>
                <option value="Demra">Demra</option>
                <option value="Savar">Savar</option>
                <option value="Keraniganj">Keraniganj</option>
                <option value="Nawabganj">Nawabganj</option>
                <option value="Dohar">Dohar</option>
              </select>
            </div>
                      
          </div>
          
        
        

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-purple-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            className="mt-1 p-3 w-full border border-purple-300 rounded-md shadow-sm"
            placeholder="Enter Description"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-purple-700 mb-1">
            Images
          </label>
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-purple-300 rounded-lg p-6 bg-purple-100 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 transition"
          >
            <input {...getInputProps()} />
            <div className="text-center">
              {isDragActive ? (
                <p className="text-purple-700 font-semibold">Drop the files here...</p>
              ) : (
                <p className="text-purple-600">Drag 'n' drop files here, or click to select</p>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="mt-4">
            {uploadedImages.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {uploadedImages.map((file, index) => (
                  <div
                    key={index}
                    className="relative w-32 h-32 border border-purple-300 rounded-lg overflow-hidden shadow-md"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveImage(index);
                      }}
                      className="absolute top-1 right-1 bg-purple-600 text-white px-2 py-1 rounded-full text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full p-4 bg-purple-600 text-white font-bold text-lg rounded-md hover:bg-purple-700 transition duration-300"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;

