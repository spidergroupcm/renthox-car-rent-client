import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { BadgePercent, Crown, UserCheck, Truck } from "lucide-react";

const SpecialOffer = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  const offers = [
    {
      icon: <BadgePercent size={40} className="text-yellow-400 mb-3" />,
      title: "15% Off Weekend Rentals",
      desc: "Book your ride for the weekend and save big on your trip.",
      btn: "Learn More",
      aos: "zoom-in-up",
    },
    {
      icon: <Crown size={40} className="text-yellow-400 mb-3" />,
      title: "Luxury Cars at $99/day",
      desc: "Experience premium vehicles at an unbeatable daily rate.",
      btn: "Book Now",
      aos: "flip-left",
    },
    {
      icon: <UserCheck size={40} className="text-yellow-400 mb-3" />,
      title: "Exclusive Member Discounts",
      desc: "Join our club to unlock special offers and priority service.",
      btn: "Join Now",
      aos: "zoom-in-up",
    },
    {
      icon: <Truck size={40} className="text-yellow-400 mb-3" />,
      title: "Free Delivery & Pickup",
      desc: "Enjoy hassle-free delivery and pickup for selected cars.",
      btn: "Get Started",
      aos: "fade-up",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-purple-100 w-full mx-auto">
      <div className="container mx-auto text-center max-w-7xl px-8">
        {/* Heading without animation */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-purple-700 mb-6">Special Offers</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Unlock exclusive deals and drive your dream car today!
          </p>
        </div>

        {/* Grid with gaps and wider cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
          {offers.map((offer, idx) => (
            <div
              key={idx}
              data-aos={offer.aos}
              className="relative bg-purple-100/30 border border-purple-300 backdrop-blur-xl rounded-3xl p-10 text-white shadow-2xl transition-transform transform hover:scale-105 hover:shadow-yellow-400/50 max-w-md mx-auto"
            >
              <div className="absolute inset-0 bg-purple-700/60 rounded-3xl z-0"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                {offer.icon}
                <h3 className="text-xl font-semibold mb-3 text-white">{offer.title}</h3>
                <p className="text-sm text-purple-200 mb-6">{offer.desc}</p>
                <button className="px-8 py-3 bg-yellow-400 text-purple-900 font-semibold rounded-full hover:bg-yellow-300 transition duration-300 shadow-md">
                  {offer.btn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;

