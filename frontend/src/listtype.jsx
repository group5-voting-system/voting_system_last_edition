// import React from 'react';
// import axios from 'axios';
// import background2 from './assets/jorflag.jpg';
// import { useNavigate } from 'react-router-dom';

// const ElectionCircleSelection = () => {
//   const navigate = useNavigate();
//   const national_id = "2000000222";
//   // const national_id = sessionStorage.getItem("national_id");
//   const checkLocalVoteStatus = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/voting/${national_id}`);
//       if (response.data.IS_LOCAL_VOTE === false) {
//         navigate('/area');
//       }
//     } catch (error) {
//       console.error('Error fetching vote status:', error);
//     }
//   };

//   const checkPartyVoteStatus = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/voting/${national_id}`);

//       if (response.data.IS_LOCAL_VOTE === true) {
//         navigate('/partyVote');
//       }
//     } catch (error) {
//       console.error('Error fetching vote status:', error);
//     }
//   };

//   const handleButtonClick = (type) => {
//     if (type === 'القوائم المحلية') {
//       checkLocalVoteStatus();
//     } else if (type === 'القوائم الحزبية') {
//       checkPartyVoteStatus();
//     }
//   };

//   return (
//     <div
//       className="min-h-screen bg-white flex items-center justify-center p-4"
//       style={{
//         backgroundImage: `url(${background2})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center'
//       }}
//     >
//       <div className="flex flex-col w-[40rem] h-[25rem] max-w-4xl bg-white bg-opacity-60 rounded-lg p-6">
//         <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold text-center mb-8">
//           الرجاء اختيار الدائرة المناسبة
//         </h1>
//         <div className="flex flex-col md:flex-row gap-6 justify-center">
//           {['القوائم الحزبية', 'القوائم المحلية'].map((circle, index) => (
//             <button
//               key={index}
//               className="bg-white text-gray-900 w-[18rem] h-[15rem] rounded-lg p-6 flex flex-col items-center justify-center transition-all duration-300 hover:bg-black hover:text-white transform hover:scale-105 shadow-lg"
//               onClick={() => handleButtonClick(circle)}
//             >
//               <span className="text-xl md:text-2xl font-semibold mb-2">{circle}</span>
//               <span className="text-sm opacity-75">صوّت الآن</span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ElectionCircleSelection;

import React from "react";
import axios from "axios";
import background2 from "./assets/jorflag.jpg";
import { useNavigate } from "react-router-dom";

const ElectionCircleSelection = () => {
  const navigate = useNavigate();

  // يجب استبدال هذا بقيمة فعلية من sessionStorage
  const national_id = "1234567906";
  // const national_id = sessionStorage.getItem("national_id");

  const checkLocalVoteStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/voting/${national_id}`
      );
      console.log("Local vote status response:", response.data);
      if (response.data.IS_LOCAL_VOTE === false) {
        navigate("/area");
      } else {
        console.log("User has already voted locally");
        // يمكنك إضافة رسالة للمستخدم هنا
      }
    } catch (error) {
      console.error("Error fetching local vote status:", error);
      // يمكنك إضافة معالجة الأخطاء هنا
    }
  };

  const checkPartyVoteStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/voting/${national_id}`
      );
      console.log("Party vote status response:", response.data);
      if (response.data.IS_PARTY_VOTE === false) {
        navigate("/partyVote");
      } else {
        console.log("User has not voted locally yet");
        // يمكنك إضافة رسالة للمستخدم هنا
      }
    } catch (error) {
      console.error("Error fetching party vote status:", error);
      // يمكنك إضافة معالجة الأخطاء هنا
    }
  };

  const handleButtonClick = (type) => {
    console.log("Button clicked:", type);
    if (type === "القوائم المحلية") {
      checkLocalVoteStatus();
    } else if (type === "القوائم الحزبية") {
      checkPartyVoteStatus();
    }
  };

  return (
    <div
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
      <h1 style={{ color: "white", marginBottom: "20px" }}>
        الرجاء اختيار الدائرة المناسبة
      </h1>
      <div>
        {["القوائم الحزبية", "القوائم المحلية"].map((circle, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(circle)}
            style={{
              margin: "10px",
              padding: "15px 30px",
              fontSize: "18px",
              backgroundColor: "white",
              color: "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {circle}
            <br />
            صوّت الآن
          </button>
        ))}
      </div>
    </div>
  );
};

export default ElectionCircleSelection;
