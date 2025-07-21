import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What documents do I need to rent a car?",
    answer:
      "You’ll need a valid driver’s license, national ID or passport, and a credit or debit card.",
  },
  {
    question: "Is there a mileage limit on rentals?",
    answer:
      "Most rentals offer unlimited mileage, but some may have limits. Check the car's listing details.",
  },
  {
    question: "Do I need to refuel before returning the car?",
    answer:
      "Yes, return the car with the same fuel level as when picked up unless you chose prepaid fuel.",
  },
  {
    question: "Are there age restrictions for renting a car?",
    answer:
      "Yes, the minimum age is typically 21. Drivers under 25 may incur a young driver surcharge.",
  },
  {
    question: "Can I add an additional driver?",
    answer:
      "Absolutely! You can add extra drivers during booking. Each must provide a valid license.",
  },
  {
    question: "What happens if I return the car late?",
    answer:
      "Late returns may incur additional charges. Always notify us if you're running behind schedule.",
  },
  {
    question: "Is insurance included in the rental?",
    answer:
      "Basic coverage is included, but we recommend adding full protection for complete peace of mind.",
  },
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-tr from-purple-50 to-white w-full">
      <div className="text-center mb-14">
       <h2 className="text-4xl font-bold text-purple-700">Frequently Asked Questions</h2>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          Everything you need to know before hitting the road.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {faqData.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white/70 backdrop-blur-lg border border-purple-200 rounded-2xl shadow-md hover:shadow-xl transition-all"
          >
            <button
              onClick={() => toggleIndex(idx)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none transition duration-300"
            >
              <h3 className="text-lg md:text-xl font-semibold text-purple-700">
                {faq.question}
              </h3>
              <ChevronDown
                size={24}
                className={`text-purple-600 transition-transform duration-300 ${
                  activeIndex === idx ? "rotate-180" : ""
                }`}
              />
            </button>
            {activeIndex === idx && (
              <div className="px-6 pb-5 pt-1 text-gray-700 text-sm md:text-base border-t border-purple-100">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

    </section>
  );
};

export default FaqSection;


