import { Link } from "react-router-dom";
import { useState } from "react";
import PaymentComponent from "../payment/payment";

function Header() {
  const [showPayment, setShowPayment] = useState(false);

  const handleServicesClick = () => {
    setShowPayment(true);
  };


  return (
    <header className="relative overflow-hidden bg-transparent h-16">
      {/* Moving Jordanian flag background */}
      <div className="absolute inset-0 z-0">
        <div className="animate-slide-rtl flex h-full">
          {[0, 1].map((index) => (
            <div
              key={index}
              className="flex-none w-full h-full flex flex-col relative"
            >
              <div className="flex-1 bg-jordan-black"></div>
              <div className="flex-1 bg-jordan-white"></div>
              <div className="flex-1 bg-jordan-green"></div>
              <div
                className="absolute -top-4 -left-3 w-0 h-0 
                          border-t-[3rem] border-t-transparent
                          border-b-[3rem] border-b-transparent
                          border-l-[4rem] border-l-jordan-red"
              ></div>
              {/* Seven-pointed star */}
              <div className="absolute top-[1.2rem] left-[0.2rem] w-7 h-7 text-white">
                <svg
                  viewBox="0 0 51 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M25.5 0L31.4019 18.3647H50.7275L35.1628 29.7205L41.0647 48.0853L25.5 36.7295L9.93534 48.0853L15.8372 29.7205L0.272499 18.3647H19.5981L25.5 0Z"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Semi-transparent overlay to ensure navbar visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

      {/* Navbar */}
      <nav className="relative z-20 container mx-auto px-4 h-full">
        <ul className="flex justify-center items-center space-x-6 rtl:space-x-reverse h-full">
          <li>
            <Link
              to="/"
              className="text-white hover:text-jordan-red transition duration-300 text-lg font-bold"
            >
              الصفحة الرئيسية
            </Link>
          </li>
          <li>
            <Link
              to="/type"
              className="text-white hover:text-jordan-red transition duration-300 text-lg font-bold"
            >
              صوت
            </Link>
          </li>
          <li>
            <Link
              to="/request"
              className="text-white hover:text-jordan-red transition duration-300 text-lg"
            >
              قدم طلب ترشيح
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className="text-white hover:text-jordan-red transition duration-300 text-lg"
              onClick={handleServicesClick}
            >
              خدماتنا
            </Link>
          </li>
          <li>
            <Link
              to="/results"
              className="text-white hover:text-jordan-red transition duration-300 text-lg"
            >
              النتائج
            </Link>
          </li>
        </ul>
      </nav>
      {/* {showPayment && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <PaymentComponent onClose={() => setShowPayment(false)} />
        </div>
      )} */}
    </header>
  );
}

export default Header;
