import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../assets/2.png";
import img2 from "../assets/1.png";
import img3 from "../assets/4.png";
import img4 from "../assets/voting.jpg";
import CountdownTimer from "../comonamt/timer";
import ElectoralDistricts from "../comonamt/ElectoralDistricts";
import axios from "axios";
import ChatBox from "../chatbooks/newchat";
import { Carousel } from "flowbite-react";

const Home = () => {
  const isLoggedIn = true;
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
    <div className="container mx-auto p-4 bg-white">
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

      <header className="mb-8 text-center bg-jordan-green text-white p-4 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">
          مرحباً بك في موقع الانتخابات
        </h1>
        <p className="text-xl">
          {fullName ? `أهلاً ${fullName}` : "مرحباً بك"}
        </p>
      </header>

      <div className="mb-8 relative">
        <CountdownTimer />

        <div className="h-80 sm:h-96 xl:h-[30rem] 2xl:h-[40rem]">
          <Carousel leftControl="left" rightControl="right">
            <div className="relative h-full">
              <img
                src={img1}
                alt="Slide 1"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-black p-4">
                <p className="text-4xl mb-4 font-bold">
                  صوتك يصنع الفرق، كن جزءًا من التغيير
                </p>
                <button className="bg-jordan-green hover-bg-jordan-green text-white py-2 px-4 rounded-lg">
                  صوت الان
                </button>
              </div>
            </div>
            <div className="relative h-full">
              <img
                src={img2}
                alt="Slide 2"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#06783d] p-4">
                <p className="text-4xl mb-4 font-bold">
                  المشاركة واجب وطني، شارك في صنع القرار!
                </p>
                <button className="bg-jordan-red hover-bg-jordan-red text-white py-2 px-4 rounded-lg">
                  صوت الان
                </button>
              </div>
            </div>
            <div className="relative h-full">
              <img
                src={img3}
                alt="Slide 3"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                <p className="text-4xl mb-4 font-bold">
                  لأنك تستحق الأفضل، صوّت من أجل الغد
                </p>
                <button className="bg-jordan-green hover-bg-jordan-green text-white py-2 px-4 rounded-lg">
                  صوت الان
                </button>
              </div>
            </div>
          </Carousel>
        </div>
      </div>

      <section className="mb-12 bg-white border-2 border-jordan-green p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-jordan-green">
          ما هي الانتخابات
        </h2>
        <div className="flex flex-col md:flex-row-reverse items-center justify-between">
          <div className="md:w-1/2 text-right mb-6 md:mb-0">
            <p className="text-lg leading-relaxed text-black">
              الانتخابات هي الركيزة الأساسية للديمقراطية التمثيلية. من خلالها،
              يختار المواطنون ممثليهم في المناصب السياسية المختلفة. وهذه العملية
              تُعد من أهم آليات المشاركة السياسية والتعبير عن إرادة الشعب.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src={img4}
              alt="الناس يشاركون في عملية التصويت"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-6 text-jordan-green">
          الإعلانات الجديدة
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advertisements.slice(0, 3).map((ad) => (
            <div
              key={ad.ID}
              className="bg-white border-2 border-jordan-red p-4 rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              <img
                src={ad.URL}
                alt={`TITLE ${ad.TITLE}`}
                className="w-full h-32 object-cover mb-4 rounded-lg"
              />
              <h3 className="font-bold text-lg mb-2 text-jordan-green">
                {ad.TITLE}
              </h3>
              <button className="bg-jordan-red text-white px-4 py-2 rounded-lg w-full hover-bg-jordan-red transition-colors">
                {ad.DESCRIPTION}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section
        className="mb-12 bg-white border-2 border-jordan-green p-6 rounded-lg shadow-lg"
        dir="rtl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-jordan-green">
          تثقيف الناخبين
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="mb-4 font-semibold text-jordan-green">
            تعرف على حقوقك وواجباتك كناخب:
          </p>
          <ul className="list-disc list-inside space-y-2 text-black">
            <li>كيفية التحقق من تسجيلك كناخب</li>
            <li>الوثائق المطلوبة يوم الانتخاب</li>
            <li>خطوات عملية التصويت</li>
          </ul>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-jordan-green">
              حقوقك وواجباتك
            </h3>
            <ul className="list-disc list-inside pl-5 space-y-2 text-black">
              <li>الحق في التصويت دون تمييز</li>
              <li>واجب الالتزام بالقوانين الانتخابية</li>
              <li>الحق في الحصول على المعلومات الانتخابية</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12" dir="rtl">
        <h2 className="text-3xl font-bold mb-6 text-center text-jordan-green">
          الأسئلة الشائعة
        </h2>
        <div className="space-y-4">
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
              className="bg-white border border-jordan-green p-4 rounded-lg"
            >
              <h3 className="font-semibold mb-2 text-jordan-green">{faq.q}</h3>
              <p className="text-black">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 bg-white border-2 border-jordan-red p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-jordan-red">
          تطبيق المكالمات المرئية
        </h2>
        <div className="flex flex-col items-center">
          <p className="text-lg mb-4 text-black">
            ابدأ مكالمة فيديو باستخدام معرف غرفة تم إنشاؤه عشوائياً
          </p>
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={roomId}
              readOnly
              placeholder="معرف الغرفة المُنشأ"
              className="border border-jordan-green p-2 rounded-r-lg w-60"
            />
            <button
              onClick={handleRoomIdGenerate}
              className="bg-jordan-red text-white p-2 rounded-l-lg hover-bg-jordan-red transition-colors"
            >
              إنشاء
            </button>
          </div>
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                roomId
                  ? "bg-jordan-green text-white hover-bg-jordan-green"
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
              className={`px-4 py-2 rounded-lg transition-colors ${
                roomId
                  ? "bg-jordan-green text-white hover-bg-jordan-green"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              مكالمة جماعية
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12" dir="rtl">
        <ChatBox />
      </section>

      <ElectoralDistricts />

      <footer className="text-center text-white bg-jordan-green p-4 rounded-lg mt-12">
        <p>&copy; 2024 موقع الانتخابات. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
};

export default Home;
