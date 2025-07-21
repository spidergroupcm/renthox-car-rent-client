import {
  Car,
  DollarSign,
  CalendarClock,
  Headset,
} from "lucide-react";

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-100 via-white to-purple-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-center text-purple-600 mb-5 flex items-center justify-center gap-3">Why Choose Us?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card Template */}
          {[
            {
              icon: <Car size={48} />,
              title: "Wide Variety of Cars",
              desc: "From budget-friendly to luxury vehicles—choose what suits you best.",
            },
            {
              icon: <DollarSign size={48} />,
              title: "Affordable Prices",
              desc: "Enjoy competitive daily rates and flexible pricing plans.",
            },
            {
              icon: <CalendarClock size={48} />,
              title: "Easy Booking",
              desc: "Book your perfect ride in just a few simple clicks.",
            },
            {
              icon: <Headset size={48} />,
              title: "24/7 Support",
              desc: "We're here to help you any time, day or night.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-purple-100/30 backdrop-blur-md border border-purple-200 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="text-purple-700 mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-purple-800 mb-2">{item.title}</h3>
              <p className="text-sm text-purple-900/80">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

