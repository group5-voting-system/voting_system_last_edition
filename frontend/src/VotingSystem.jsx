// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const VotingSystem = () => {
//   const [lists, setLists] = useState([]);
//   const [candidates, setCandidates] = useState({});
//   const [selectedListId, setSelectedListId] = useState(null);
//   const [selectedCandidates, setSelectedCandidates] = useState({});
//   const [error, setError] = useState(null);
//   const [hasVoted, setHasVoted] = useState(false);

//   useEffect(() => {
//     fetchLists();
//     checkVoteStatus();
//   }, []);

//   const fetchLists = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/lists");
//       if (Array.isArray(response.data)) {
//         setLists(response.data);
//         fetchCandidatesForAllLists(response.data);
//       } else {
//         setError("Received invalid data for lists");
//       }
//     } catch (error) {
//       console.error("Error fetching lists:", error);
//       setError("Failed to fetch lists. Please try again.");
//     }
//   };
//   const fetchCandidatesForAllLists = async (lists) => {
//     const candidatesData = {};
//     for (const list of lists) {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/candidates/${list.LIST_ID}`
//         );
//         if (Array.isArray(response.data)) {
//           candidatesData[list.LIST_ID] = response.data;
//         }
//       } catch (error) {
//         console.error(
//           `Error fetching candidates for list ${list.LIST_ID}:`,
//           error
//         );
//       }
//     }
//     setCandidates(candidatesData);
//   };
//   const handleListSelection = (listId) => {
//     setSelectedListId(listId);
//     if (selectedListId !== listId) {
//       setSelectedListId(listId);
//       setSelectedCandidates([]); // إعادة تعيين المرشحين المختارين عند تغيير القائمة
//     }
//   };

//   const handleCandidateSelection = (listId, candidateId) => {
//     setSelectedCandidates((prev) => {
//       const listCandidates = prev[listId] || [];
//       if (listCandidates.includes(candidateId)) {
//         return {
//           ...prev,
//           [listId]: listCandidates.filter((id) => id !== candidateId),
//         };
//       } else {
//         return {
//           ...prev,
//           [listId]: [...listCandidates, candidateId],
//         };
//       }
//     });
//   };

//   const checkVoteStatus = async () => {
//     const nationalId = sessionStorage.getItem("currentuser");
//     if (!nationalId) {
//       console.error("لم يتم العثور على معرف المستخدم في التخزين المؤقت للجلسة");
//       return;
//     }

//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/check-vote-status/${nationalId}`
//       );
//       setHasVoted(response.data.hasVoted);
//     } catch (error) {
//       console.error("خطأ في التحقق من حالة التصويت:", error);
//       setError("فشل في التحقق من حالة التصويت. الرجاء المحاولة مرة أخرى.");
//     }
//   };
//   const handleSubmit = async () => {
//     if (!selectedListId) {
//       setError("الرجاء اختيار قائمة أولاً");
//       return;
//     }

//     const nationalId = sessionStorage.getItem("currentuser");

//     try {
//       await axios.post("http://localhost:5000/api/vote-list", {
//         listId: selectedListId,
//         nationalId: nationalId,
//       });

//       if (selectedCandidates[selectedListId]?.length > 0) {
//         await axios.post("http://localhost:5000/api/vote-candidates", {
//           candidateIds: selectedCandidates[selectedListId],
//         });
//       }

//       alert("تم تسجيل التصويت بنجاح");
//       setHasVoted(true);
//       setSelectedListId(null);
//       setSelectedCandidates({});
//     } catch (error) {
//       console.error("خطأ في تسجيل التصويت:", error);
//       setError("فشل في تسجيل التصويت. الرجاء المحاولة مرة أخرى.");
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
//       <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
//         نظام التصويت
//       </h1>
//       <div className="mb-8">
//         <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
//           القوائم والمرشحون
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {lists.map((list) => (
//             <div
//               key={list.LIST_ID}
//               className={`bg-white rounded-lg shadow-lg p-6 transition-all duration-300 ${
//                 selectedListId === list.LIST_ID
//                   ? "border-4 border-blue-500 ring-4 ring-blue-300"
//                   : "hover:shadow-xl"
//               }`}
//               onClick={() => handleListSelection(list.LIST_ID)}
//             >
//               <h3 className="text-xl font-bold mb-4 text-blue-700">
//                 {list.LIST_NAME}
//               </h3>
//               <div className="mt-4">
//                 <h4 className="text-lg font-semibold mb-2 text-gray-700">
//                   المرشحون:
//                 </h4>
//                 {candidates[list.LIST_ID]?.map((candidate) => (
//                   <div key={candidate.CANDIDATE_ID} className="mb-2">
//                     <label className="flex items-center space-x-2 rtl:space-x-reverse">
//                       <input
//                         type="checkbox"
//                         id={`candidate-${candidate.CANDIDATE_ID}`}
//                         checked={
//                           selectedCandidates[list.LIST_ID]?.includes(
//                             candidate.CANDIDATE_ID
//                           ) || false
//                         }
//                         onChange={() =>
//                           handleCandidateSelection(
//                             list.LIST_ID,
//                             candidate.CANDIDATE_ID
//                           )
//                         }
//                         className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
//                       />
//                       <span className="text-sm text-gray-800">
//                         {candidate.FULL_NAME}
//                       </span>
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="text-center mt-8">
//         {hasVoted ? (
//           <p className="text-green-600 font-semibold text-xl bg-green-100 p-4 rounded-lg inline-block">
//             لقد قمت بالتصويت بالفعل
//           </p>
//         ) : (
//           <button
//             onClick={handleSubmit}
//             disabled={!selectedListId}
//             className={`px-8 py-4 rounded-full text-white font-semibold text-lg ${
//               selectedListId
//                 ? "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
//                 : "bg-gray-400 cursor-not-allowed"
//             } transition-all duration-300`}
//           >
//             تأكيد التصويت
//           </button>
//         )}
//       </div>
//       {error && (
//         <p className="text-red-500 text-center mt-4 text-lg">{error}</p>
//       )}
//     </div>
//   );
// };

// export default VotingSystem;

import React, { useState, useEffect } from "react";
import axios from "axios";

const VotingSystem = () => {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [error, setError] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const circleId = sessionStorage.getItem("Circle_id");
    if (!circleId) {
      setError("فشل في الحصول على معرف الدائرة");
      return;
    }

    fetchLists(circleId);
    checkVoteStatus();

    // Set current user
    sessionStorage.setItem("currentuser", "1234567899");
  }, []); // Note: empty dependency array to run only once on mount

  const fetchLists = async (circleId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/lists/${circleId}`
      );
      if (Array.isArray(response.data)) {
        setLists(response.data);
      } else {
        setError("Received invalid data for lists");
      }
    } catch (error) {
      console.error("Error fetching lists:", error);
      setError("Failed to fetch lists. Please try again.");
    }
  };

  const fetchCandidates = async (listId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/candidates/${listId}`
      );
      if (Array.isArray(response.data)) {
        setCandidates(response.data);
      } else {
        setError("Received invalid data for candidates");
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setError("Failed to fetch candidates. Please try again.");
    }
  };

  const handleListSelection = (listId) => {
    setSelectedList(listId);
    fetchCandidates(listId);
    setSelectedCandidates([]);
  };

  const handleCandidateSelection = (candidateId) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId)
        ? prev.filter((id) => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const checkVoteStatus = async () => {
    const nationalId = sessionStorage.getItem("currentuser");
    if (!nationalId) {
      console.error("لم يتم العثور على معرف المستخدم في التخزين المؤقت للجلسة");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/check-vote-status/${nationalId}`
      );
      setHasVoted(response.data.hasVoted);
    } catch (error) {
      console.error("خطأ في التحقق من حالة التصويت:", error);
      setError("فشل في التحقق من حالة التصويت. الرجاء المحاولة مرة أخرى.");
    }
  };

  const handleSubmit = async () => {
    if (!selectedList) {
      setError("الرجاء اختيار قائمة أولاً");
      return;
    }

    const nationalId = sessionStorage.getItem("currentuser");

    try {
      const response = await axios.post("http://localhost:5000/api/vote-list", {
        listId: selectedList,
        nationalId: nationalId,
      });

      if (response.data.error) {
        setError(response.data.error);
        return;
      }

      if (selectedCandidates.length > 0) {
        await axios.post("http://localhost:5000/api/vote-candidates", {
          candidateIds: selectedCandidates,
        });
      }

      alert("تم تسجيل التصويت بنجاح");
      setHasVoted(true);
      // إعادة تعيين الاختيارات
      setSelectedList(null);
      setSelectedCandidates([]);
      setCandidates([]);
      // تحديث القوائم
      fetchLists(sessionStorage.getItem("Circle_id"));
    } catch (error) {
      console.error("خطأ في تسجيل التصويت:", error);
      setError("فشل في تسجيل التصويت. الرجاء المحاولة مرة أخرى.");
    }
  };

  if (error) {
    return <div className="text-red-600 text-center text-xl mt-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">نظام التصويت</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">القوائم والمرشحون</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(lists) && lists.length > 0 ? (
            lists.map((list) => (
              <div
                key={list.LIST_ID}
                className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 ${
                  selectedList === list.LIST_ID
                    ? "border-4 border-blue-500"
                    : "hover:shadow-lg"
                }`}
              >
                <div className="flex items-center mb-4">
                  <input
                    type="radio"
                    id={`list-${list.LIST_ID}`}
                    name="list"
                    value={list.LIST_ID}
                    checked={selectedList === list.LIST_ID}
                    onChange={() => handleListSelection(list.LIST_ID)}
                    className="mr-3 h-5 w-5 text-green-600"
                  />
                  <label
                    htmlFor={`list-${list.LIST_ID}`}
                    className="text-lg font-medium cursor-pointer"
                  >
                    {list.LIST_NAME}
                  </label>
                </div>
                {selectedList === list.LIST_ID && (
                  <div className="mt-4">
                    <h3 className="text-md font-semibold mb-2">المرشحون:</h3>
                    {Array.isArray(candidates) && candidates.length > 0 ? (
                      candidates.map((candidate) => (
                        <div key={candidate.CANDIDATE_ID} className="mb-2">
                          <label className="flex items-center space-x-2 rtl:space-x-reverse">
                            <input
                              type="checkbox"
                              id={`candidate-${candidate.CANDIDATE_ID}`}
                              value={candidate.CANDIDATE_ID}
                              checked={selectedCandidates.includes(
                                candidate.CANDIDATE_ID
                              )}
                              onChange={() =>
                                handleCandidateSelection(candidate.CANDIDATE_ID)
                              }
                              className="h-4 w-4 text-blue-600 rounded"
                            />
                            <span className="text-sm">
                              {candidate.FULL_NAME}
                            </span>
                          </label>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        لا يوجد مرشحون متاحون لهذه القائمة
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              لا توجد قوائم متاحة
            </p>
          )}
        </div>
      </div>
      <div className="text-center mt-8">
        {hasVoted ? (
          <p className="text-green-600 font-semibold">
            لقد قمت بالتصويت بالفعل
          </p>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!selectedList}
            className={`px-6 py-3 rounded-full text-white font-semibold ${
              selectedList
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            } transition-colors duration-300`}
          >
            تأكيد التصويت
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default VotingSystem;
