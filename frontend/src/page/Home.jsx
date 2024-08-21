import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../assets/om.jpg";
import img2 from "../assets/1.png";
import img3 from "../assets/4.png";
import img4 from "../assets/voting.jpg";
import CountdownTimer from "../comonamt/timer";
import ElectoralDistricts from "../comonamt/ElectoralDistricts";
import axios from "axios";
import ChatBox from "../chatbooks/newchat" ;
import DebateSection from "../../src/page/DebateSection/DebateSection";
import { Carousel } from "flowbite-react";

const Home = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [fullName, setFullName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleRoomIdGenerate = () => {
    const randomId = Math.random().toString(36).substring(2, 9);
    const timestamp = Date.now().toString().substring(-4);
    setRoomId(randomId + timestamp);
  };

  const handleOneAndOneCall = () => {
    if (!roomId) {
      alert("Please generate room ID first");
      return;
    }
    navigate(`room/${roomId}?type=one-on-one`);
  };

  const handleGroupCall = () => {
    if (!roomId) {
      alert("Please generate room ID first");
      return;
    }
    navigate(`room/${roomId}?type=group-call`);
  };

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/advertisements"
        );
        setAdvertisements(response.data);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };

    fetchAdvertisements();
  }, []);

  useEffect(() => {
    const checkLocalVoteStatus = async () => {
      try {
        const national_id = "2000000201";
        const response = await axios.get(
          `http://localhost:5000/voting/${national_id}`
        );
        const fullNameFromResponse = `${response.data.FULL_NAME}`;
        setFullName(fullNameFromResponse);
      } catch (error) {
        console.error("Error fetching vote status:", error);
      }
    };

    checkLocalVoteStatus();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <style jsx>{`
        .bg-jordan-green {
          background-color: #06783d;
        }
        .text-jordan-green {
          color: #06783d;
        }
        .border-jordan-green {
          border-color: #06783d;
        }
        .bg-jordan-red {
          background-color: #d00d18;
        }
        .text-jordan-red {
          color: #d00d18;
        }
        .border-jordan-red {
          border-color: #d00d18;
        }
        .hover-bg-jordan-green:hover {
          background-color: #056231;
        }
        .hover-bg-jordan-red:hover {
          background-color: #b00b15;
        }
      `}</style>

      <header className="bg-green-300 bg-opacity-70 text-gray-800 py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-balck mb-4 text-center">
            مرحباً بك في موقع الانتخابات
          </h1>
          <p className="text-2xl text-center text-black">
            {fullName ? `أهلاً ${fullName}` : "مرحباً بك"}
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <CountdownTimer />
            <div className="h-[25rem] sm:h-[28rem] lg:h-[32rem] relative">
              <Carousel leftControl="left" rightControl="right">
                <div className="relative h-full">
                  <img
                    src={img1}
                    alt="Slide 1"
                    className="h-full w-full object-cover filter brightness-50"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 backdrop-filter backdrop-blur-sm bg-black/40">
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                      صوتك يصنع الفرق، كن جزءًا من التغيير
                    </p>
                    <button className="mt-6 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-3 px-8 rounded-full shadow-2xl transform hover:scale-105 transition duration-300">
                      صوت الآن
                    </button>
                  </div>
                </div>
                <div className="relative h-full">
                  <img
                    src={img2}
                    alt="Slide 2"
                    className="h-full w-full object-cover filter brightness-50"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 backdrop-filter backdrop-blur-sm bg-black/40">
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                      المشاركة واجب وطني، شارك في صنع القرار!
                    </p>
                    <button className="mt-6 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white py-3 px-8 rounded-full shadow-2xl transform hover:scale-105 transition duration-300">
                      صوت الآن
                    </button>
                  </div>
                </div>
                <div className="relative h-full">
                  <img
                    src={img3}
                    alt="Slide 3"
                    className="h-full w-full object-cover filter brightness-50"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 backdrop-filter backdrop-blur-sm bg-black/40">
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                      لأنك تستحق الأفضل، صوّت من أجل الغد
                    </p>
                    <button className="mt-6 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-3 px-8 rounded-full shadow-2xl transform hover:scale-105 transition duration-300">
                      صوت الآن
                    </button>
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
        </section>
        <section className="mb-12 bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-10 border-l-8 border-jordan-green bg-gradient-to-r from-green-50 via-white to-green-50">
            <h2 className="text-4xl font-extrabold mb-8 text-[#008000] text-center leading-tight tracking-tight">
              ما هي الانتخابات
            </h2>
            <div className="flex flex-col md:flex-row-reverse items-center justify-between">
              <div className="md:w-1/2 text-right mb-6 md:mb-0 md:pl-10">
                <p className="text-lg leading-relaxed text-gray-800">
                  الانتخابات هي الركيزة الأساسية للديمقراطية التمثيلية. من
                  خلالها، يختار المواطنون ممثليهم في المناصب السياسية المختلفة.
                  وهذه العملية تُعد من أهم آليات المشاركة السياسية والتعبير عن
                  إرادة الشعب.
                </p>
              </div>
              <div className="md:w-1/2">
                <img
                  src={img4}
                  alt="الناس يشاركون في عملية التصويت"
                  className="w-full h-auto rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-4xl font-bold text-center mb-8 text-[#008000]">
            الإعلانات الجديدة
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {advertisements.slice(0, 3).map((ad) => (
              <div
                key={ad.ID}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
              >
                <img
                  src={ad.URL}
                  alt={`TITLE ${ad.TITLE}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3 text-jordan-green">
                    {ad.TITLE}
                  </h3>
                  <button className="bg-jordan-red text-white px-6 py-3 rounded-lg w-full hover:bg-opacity-90 transition-colors text-lg font-semibold">
                    {ad.DESCRIPTION}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          className="mb-12 bg-white rounded-lg shadow-lg overflow-hidden"
          dir="rtl"
        >
          <div className="p-8 border-r-8 border-jordan-green">
            <h2 className="text-4xl font-bold mb-8 text-center text-[#008000]">
              تثقيف الناخبين
            </h2>
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="mb-4 font-semibold text-jordan-green">
                تعرف على حقوقك وواجباتك كناخب:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>كيفية التحقق من تسجيلك كناخب</li>
                <li>الوثائق المطلوبة يوم الانتخاب</li>
                <li>خطوات عملية التصويت</li>
              </ul>
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2 text-jordan-green">
                  حقوقك وواجباتك
                </h3>
                <ul className="list-disc list-inside pl-5 space-y-2 text-gray-700">
                  <li>الحق في التصويت دون تمييز</li>
                  <li>واجب الالتزام بالقوانين الانتخابية</li>
                  <li>الحق في الحصول على المعلومات الانتخابية</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12" dir="rtl">
          <h2 className="text-4xl font-bold mb-8 text-center text-[#008000]">
            الأسئلة الشائعة
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "متى موعد الانتخابات القادمة؟",
                a: "ستجرى الانتخابات في [التاريخ].",
              },
              {
                q: "كيف يمكنني التحقق من تسجيلي كناخب؟",
                a: "يمكنك التحقق عبر [الرابط] أو زيارة أقرب مركز تسجيل.",
              },
              {
                q: "ما هي الوثائق المطلوبة للتصويت؟",
                a: "تحتاج إلى بطاقة الهوية الوطنية سارية المفعول.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-jordan-green p-6 rounded-lg shadow-md"
              >
                <h3 className="font-semibold text-xl mb-3 text-jordan-green">
                  {faq.q}
                </h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 border-l-8 border-jordan-red">
            <h2 className="text-4xl font-bold mb-8 text-center text-[#008000]">
              تطبيق المكالمات المرئية
            </h2>
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-6">
                <input
                  type="text"
                  value={roomId}
                  readOnly
                  placeholder="معرف الغرفة المُنشأ"
                  className="border border-jordan-green p-3 rounded-r-lg w-64 text-lg"
                />
                <button
                  onClick={handleRoomIdGenerate}
                  className="bg-jordan-green text-white p-3 rounded-l-lg hover:bg-opacity-90 transition-colors text-white"
                >
                  إنشاء
                </button>
              </div>
              <div className="flex space-x-4">
                <button
                  className={`px-6 py-3 rounded-lg transition-colors text-lg font-semibold ${
                    roomId
                      ? "bg-jordan-green text-white hover:bg-opacity-90"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!roomId}
                  onClick={handleOneAndOneCall}
                >
                  مكالمة فردية
                </button>
                <button
                  disabled={!roomId}
                  onClick={handleGroupCall}
                  className={`px-6 py-3 rounded-lg transition-colors text-lg font-semibold ${
                    roomId
                      ? "bg-jordan-green text-white hover:bg-opacity-90"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  مكالمة جماعية
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-12" dir="rtl">
          <DebateSection />
        </section>
        <section className="mb-12" dir="rtl">
          <ChatBox />
        </section>

        <ElectoralDistricts />
      </main>

      <footer className="bg-jordan-green text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">
            &copy; 2024 موقع الانتخابات. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
