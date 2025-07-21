import { FaFacebook, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-white to-purple-50 text-gray-800 py-14 mt-10 rounded-t-3xl shadow-inner">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Contact */}
        <div>
          <div className="flex items-center gap-2 mb-4">
             <h1 className="text-4xl md:5xl font-bold text-blue-600">Renthox</h1>
           
          </div>
          <p>57 Hollow Tower, Dhaka</p>
          <p className="mt-2">spidergroupcm@gmail.com</p>
          <p className="mt-2">+88 01789711089</p>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold text-lg text-purple-600 mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            {["About Us", "Gallery", "Our Team", "Pricing", "Contact"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-yellow-500 transition">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Community */}
        <div>
          <h4 className="font-semibold text-lg text-purple-600 mb-4">Community</h4>
          <ul className="space-y-2 text-sm">
            {["Area Details", "Blog Grid", "FAQ", "Service Areas", "Testimonials"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-yellow-500 transition">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold text-lg text-purple-600 mb-4">Subscribe Newsletter</h4>
          <p className="mb-4 text-gray-600 text-sm">
            Get exclusive deals and updates. 
          </p>
          <form className="flex flex-col">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-purple-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-3"
            />
            <button className="bg-yellow-400 text-purple-900 font-semibold py-2 rounded-md hover:bg-yellow-300 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-purple-100 mt-10 pt-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2024 <span className="text-purple-600 font-semibold">Renthox</span>. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-purple-600 hover:text-yellow-400 text-xl transition">
              <FaFacebook />
            </a>
            <a href="#" className="text-purple-600 hover:text-yellow-400 text-xl transition">
              <FaTwitter />
            </a>
            <a href="#" className="text-purple-600 hover:text-yellow-400 text-xl transition">
              <RiInstagramFill />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



