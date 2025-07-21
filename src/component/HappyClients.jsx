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
  ];

  return (
    <section className="bg-gradient-to-bl from-purple-50 to-white py-16 w-11/12 mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-purple-700">Happy Clients</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((client, index) => (
          <div
            key={index}
            className="bg-white border border-purple-100 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
                <UserRound size={28} className="text-purple-600" />
              </div>
            </div>
            <p className="text-gray-700 text-sm italic">"{client.quote}"</p>
            <h4 className="mt-4 font-semibold text-purple-700">{client.name}</h4>
            <span className="text-yellow-500 text-sm">★★★★★</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HappyClients;
