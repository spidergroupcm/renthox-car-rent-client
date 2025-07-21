import { CalendarClock, MapPin, CarFront, CreditCard } from "lucide-react";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const steps = [
  {
    icon: <MapPin size={36} className="text-yellow-400" />,
    title: "Choose Location",
    desc: "Select your pickup and drop-off points easily.",
    aos: "fade-up-right",
  },
  {
    icon: <CalendarClock size={36} className="text-yellow-400" />,
    title: "Pick Date & Time",
    desc: "Schedule your ride according to your convenience.",
    aos: "fade-up",
  },
  {
    icon: <CarFront size={36} className="text-yellow-400" />,
    title: "Select Your Car",
    desc: "Browse and choose from top-quality vehicles.",
    aos: "fade-up-left",
  },
  {
    icon: <CreditCard size={36} className="text-yellow-400" />,
    title: "Confirm & Pay",
    desc: "Complete your booking with secure payment options.",
    aos: "fade-up",
  },
];

const BookingProcess = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="bg-gradient-to-br from-purple-50 to-purple-100 w-full mx-auto">
      <div className="text-center mb-8" data-aos="fade-down">
        <h2 className="text-4xl font-bold text-purple-700 mb-4">How It Works</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Booking your dream ride is just a few steps away. It's fast, easy, and secure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-4 md:px-10">
        {steps.map((step, idx) => (
          <div
            key={idx}
            data-aos={step.aos}
            className="bg-purple-600/80 backdrop-blur-md text-white rounded-2xl p-8 shadow-xl hover:scale-105 transition-all duration-300"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-purple-100">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookingProcess;
