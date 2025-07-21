import { ShieldCheck } from "lucide-react";

const TrustedPartners = () => {
  const partners = [
    {
      name: "Tesla",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
    },
    {
      name: "BMW",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
    },
    {
      name: "Toyota",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg",
    },
    {
      name: "Mercedes-Benz",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
    },
    {
      name: "Ford",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg",
    },
  ];

  // Duplicate logos to make the loop seamless
  const repeatedPartners = [...partners, ...partners];

  return (
    <div className="py-16 bg-gradient-to-b from-white via-purple-50 to-purple-100 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-700 flex items-center justify-center gap-2">
          <ShieldCheck className="text-yellow-500" />
          Trusted by Industry Leaders
        </h2>
        <p className="mt-2 text-gray-600">
          We proudly partner with some of the world’s most iconic car brands.
        </p>
      </div>

      {/* Scrolling container */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-scroll flex w-max gap-12 px-6">
          {repeatedPartners.map((partner, idx) => (
            <div
              key={idx}
              className="min-w-[100px] flex-shrink-0 grayscale hover:grayscale-0 transition duration-300 ease-in-out"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 md:h-14 object-contain mx-auto"
                title={partner.name}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind custom animation */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default TrustedPartners;

