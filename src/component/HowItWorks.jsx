import { Search, Calendar, CreditCard, SteeringWheel } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    { icon: Search, title: "Browse Cars", desc: "Find the perfect car for your trip." },
    { icon: Calendar, title: "Choose Dates", desc: "Select rental period that suits you." },
    { icon: CreditCard, title: "Secure Payment", desc: "Easy and secure online payments." },
    { icon: SteeringWheel, title: "Drive Away", desc: "Pickup and enjoy your ride." },
  ];

  return (
    <section className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-10">
        How It Works
      </h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 px-6">
        {steps.map(({ icon: Icon, title, desc }, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center p-6 bg-purple-50 rounded-xl shadow hover:shadow-md transition-shadow duration-300"
          >
            <Icon className="text-yellow-400 w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold text-purple-700 mb-2">{title}</h3>
            <p className="text-gray-600">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
