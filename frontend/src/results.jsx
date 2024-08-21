import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const Results = () => {
  const [stats, setStats] = useState({
    localVoteCount: 0,
    listsInfo: [],
    candidatesInfo: [],
    votingRateByCircle: [],
    thresholdByCircle: [],
    listsInfoWithThreshold: {},
    topCandidates: {},
    specialSeats: {},
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const filteredLists = Object.values(stats.listsInfoWithThreshold)
    .flatMap((circle) => circle.lists)
    .filter(
      (list) =>
        list.LIST_NAME !== "ورقة بيضاء" &&
        list.LIST_NAME.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const filteredCandidates = stats.candidatesInfo.filter((candidate) =>
    candidate.FULL_NAME.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen text text-right ">
      <header className="bg-blue-800 text-white p-6">
        <h1 className="text-4xl font-bold text-center">
          نتائج الانتخابات 2024
        </h1>
      </header>

      <div className="container mx-auto p-6">
        <div className="mb-8">
          <input
            type="text"
            placeholder="ابحث عن قائمة أو مرشح..."
            className="w-full p-3 border-2 border-blue-300 rounded-lg text-lg focus:outline-none focus:border-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-12">
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-blue-800 border-b pb-2">
              إحصائيات عامة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">
                  عدد الأصوات المحلية
                </h3>
                <p className="text-3xl font-bold text-green-500">
                  {stats.localVoteCount}
                </p>
              </div>
              {/* يمكن إضافة المزيد من الإحصائيات هنا */}
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-blue-800 border-b pb-2">
              القوائم
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLists.map((list, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 hover:shadow-md transition"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {list.LIST_NAME}
                  </h3>
                  <p>
                    الأصوات:{" "}
                    <span className="font-bold text-green-600">
                      {list.COUNT_OF_VOTES}
                    </span>
                  </p>
                  <p>
                    المقاعد المخصصة:{" "}
                    <span className="font-bold text-green-600">
                      {list.allocatedSeats || 0}
                    </span>
                  </p>
                  <p>
                    فوق العتبة:{" "}
                    <span
                      className={`font-bold ${
                        list.aboveThreshold ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {list.aboveThreshold ? "نعم" : "لا"}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-green-500 border-b pb-2">
              المرشحون
            </h2>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 7,
                },
              }}
            >
              {filteredCandidates.map((candidate, index) => (
                <SwiperSlide key={index}>
                  <div className="border rounded-lg p-4 h-full flex flex-col justify-between">
                    <h3 className="text-lg font-semibold mb-2">
                      {candidate.FULL_NAME}
                    </h3>
                    <p className="text-2xl font-bold text-green-500">
                      {candidate.COUNT_OF_VOTES}
                    </p>
                    <p className="text-sm text-gray-600">صوت</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-green-500 border-b pb-2">
              نسبة التصويت حسب الدائرة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.votingRateByCircle.map((circle, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    الدائرة {circle.circleId}
                  </h3>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-white">
                      <div
                        style={{ width: `${circle.votingRate}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"
                      ></div>
                    </div>
                  </div>
                  <p className="text-right text-2xl font-bold text-green-500">
                    {circle.votingRate.toFixed(2)}%
                  </p>
                </div>
              ))}
            </div>
          </section>
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-blue-800 border-b pb-2">
              معلومات القوائم مع العتبة
            </h2>
            {Object.keys(stats.listsInfoWithThreshold).length > 0 ? (
              Object.entries(stats.listsInfoWithThreshold).map(
                ([circleId, circleData]) => (
                  <div
                    key={circleId}
                    className="mb-8 bg-gray-50 rounded-lg p-6"
                  >
                    <h3 className="text-2xl font-semibold mb-4">
                      الدائرة: {circleId}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <p className="font-semibold">المقاعد المخصصة</p>
                        <p className="text-2xl font-bold text-green-600">
                          {circleData.allocatedSeats +
                            circleData.remainingSeats}
                        </p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-lg">
                        <p className="font-semibold">إجمالي الأصوات</p>
                        <p className="text-2xl font-bold text-green-500">
                          {circleData.totalVotes}
                        </p>
                      </div>
                    </div>
                    {circleData.lists && circleData.lists.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {circleData.lists.map((list, index) => (
                          <div
                            key={index}
                            className="border rounded-lg p-4 bg-white"
                          >
                            <h4 className="text-lg font-semibold mb-2">
                              {list.LIST_NAME}
                            </h4>
                            <p>
                              الأصوات:{" "}
                              <span className="font-bold text-green-500">
                                {list.COUNT_OF_VOTES}
                              </span>
                            </p>
                            {list.LIST_NAME !== "ورقة بيضاء" && (
                              <>
                                <p>
                                  فوق العتبة:{" "}
                                  <span
                                    className={`font-bold ${
                                      list.aboveThreshold
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {list.aboveThreshold ? "نعم" : "لا"}
                                  </span>
                                </p>
                                <p>
                                  المقاعد المخصصة:{" "}
                                  <span className="font-bold text-purple-600">
                                    {list.allocatedSeats}
                                  </span>
                                </p>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">
                        لا توجد قوائم متاحة لهذه الدائرة.
                      </p>
                    )}
                  </div>
                )
              )
            ) : (
              <p className="text-gray-600">لا تتوفر معلومات العتبة.</p>
            )}
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-green-500 border-b pb-2">
              أبرز المرشحين لكل قائمة
            </h2>
            {Object.entries(stats.topCandidates).map(
              ([circleId, candidates]) => (
                <div key={circleId} className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4">
                    الدائرة: {circleId}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {candidates.map((candidate, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 bg-gray-50"
                      >
                        <h4 className="text-lg font-semibold mb-2">
                          {candidate.FULL_NAME}
                        </h4>
                        <p>
                          القائمة:{" "}
                          <span className="font-bold text-green-500">
                            {candidate.LIST_NAME}
                          </span>
                        </p>
                        <p>
                          نوع المقعد:{" "}
                          <span className="font-bold text-purple-600">
                            {candidate.TYPE_OF_CHAIR}
                          </span>
                        </p>
                        <p>
                          الأصوات:{" "}
                          <span className="font-bold text-green-500">
                            {candidate.COUNT_OF_VOTES}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-green-500 border-b pb-2">
              المقاعد الخاصة
            </h2>
            {Object.entries(stats.specialSeats).map(
              ([circleId, candidates]) => (
                <div key={circleId} className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4">
                    الدائرة: {circleId}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {candidates.map((candidate, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 bg-gray-50"
                      >
                        <h4 className="text-lg font-semibold mb-2">
                          {candidate.FULL_NAME}
                        </h4>
                        <p>
                          نوع المقعد:{" "}
                          <span className="font-bold text-purple-600">
                            {candidate.TYPE_OF_CHAIR}
                          </span>
                        </p>
                        <p>
                          الأصوات:{" "}
                          <span className="font-bold text-green-600">
                            {candidate.COUNT_OF_VOTES}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Results;
