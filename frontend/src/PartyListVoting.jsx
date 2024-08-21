import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import background2 from "./assets/jorflag.jpg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

function PartyListVoting() {
  const [partyLists, setPartyLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  sessionStorage.setItem("currentuser", "2000000006");

  useEffect(() => {
    fetchPartyLists();
  }, []);

  const fetchPartyLists = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/party_list_votes"
      );
      setPartyLists(response.data);
    } catch (error) {
      console.error("Error fetching party lists:", error);
    }
  };

  const handleVote = async () => {
    if (!selectedList) {
      alert("الرجاء اختيار قائمة أولاً");
      return;
    }

    const currentUser = sessionStorage.getItem("currentuser");
    if (!currentUser) {
      alert("لم يتم العثور على معرف المستخدم");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/party_list_votes", {
        listId: selectedList.LIST_ID,
        nationalId: currentUser,
      });
      alert("تم التصويت بنجاح!");
      setSelectedList(null);
      fetchPartyLists();
    } catch (error) {
      console.error("Error voting:", error);
      alert("حدث خطأ أثناء التصويت. الرجاء المحاولة مرة أخرى.");
    }
  };

  const handleSelectList = (list) => {
    setSelectedList(list);
  };

  return (
    <div
      className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${background2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          التصويت على قوائم الأحزاب
        </h1>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          navigation={true}
          modules={[EffectCoverflow, Navigation]}
          className="mySwiper"
        >
          {partyLists.map((list, index) => (
            <SwiperSlide key={index}>
              <div
                className={`bg-white shadow-2xl rounded-lg p-8 mx-auto w-80 h-96 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedList === list
                    ? "bg-blue-50 scale-105"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleSelectList(list)}
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                  {list.LIST_NAME}
                </h2>
                <div className="flex items-center justify-center h-3/4">
                  <p className="text-lg text-center text-gray-600">
                    اضغط لاختيار هذه القائمة
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleVote}
            className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg focus:outline-none focus:shadow-outline transition duration-150 ease-in-out text-xl ${
              !selectedList ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!selectedList}
          >
            تصويت
          </button>
        </div>
      </div>
    </div>
  );
}

export default PartyListVoting;
