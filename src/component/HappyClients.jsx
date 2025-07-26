import { UserRound } from "lucide-react";

const HappyClients = () => {
  const testimonials = [
    {
      name: "Sarah Ahmed",
      quote:
        "Amazing experience! The booking was smooth and the car was spotless. Will definitely rent again!",
    },
    {
      name: "Rafiul Islam",
      quote:
        "Great service and very affordable. The 24/7 support came in clutch when I had a flat tire!",
    },
    {
      name: "Nusrat Jahan",
      quote:
        "The luxury car I rented made our anniversary road trip unforgettable. Highly recommended!",
    },
    {
      name: "Tanvir Hossain",
      quote:
        "Top-notch service and super user-friendly process. I'm impressed with the quality and customer support!",
    },
  ];

  return (
    <section className="bg-white py-5 w-11/12 mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold  text-purple-700 tracking-wide">
          Happy Clients
        </h2>
        <p className="mt-2 text-gray-600 text-sm md:text-base">
          What our satisfied clients say about us
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {testimonials.map((client, index) => (
          <div
            key={index}
            className="bg-white/60 border border-purple-200 rounded-3xl shadow-lg backdrop-blur-md p-6 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center shadow-inner">
                <UserRound size={30} className="text-purple-600" />
              </div>
            </div>

            <p className="text-gray-700 text-sm italic text-center leading-relaxed">
              “{client.quote}”
            </p>

            <div className="mt-6 text-center">
              <h4 className="font-semibold text-lg text-purple-700">
                {client.name}
              </h4>
              <div className="text-yellow-500 text-base mt-1">★★★★★</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HappyClients;

