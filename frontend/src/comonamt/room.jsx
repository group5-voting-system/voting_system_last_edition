import React, { useRef, useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { APP_ID, SECRET } from "../Config";

function RoomPage() {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const zpRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [joined, setJoined] = useState(false);
  const [callType, setCallType] = useState("");

  const myMeeting = (type) => {
    const appID = APP_ID;
    const serverSecret = SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "اسمك"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zpRef.current = zp;

    zp.joinRoom({
      container: videoContainerRef.current,
      sharedLinks: [
        {
          name: "رابط مكالمة الفيديو",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?type=" +
            encodeURIComponent(type),
        },
      ],
      scenario: {
        mode:
          type === "one-on-one"
            ? ZegoUIKitPrebuilt.OneONoneCall
            : ZegoUIKitPrebuilt.GroupCall,
      },
      maxUsers: type === "one-on-one" ? 2 : 10,
      onJoinRoom: () => {
        setJoined(true);
      },
      onLeaveRoom: () => {
        navigate("/");
      },
    });
  };

  const handleExit = () => {
    if (zpRef.current) {
      zpRef.current.destroy();
    }
    navigate("/");
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const type = query.get("type");

    setCallType(type);
  }, [location.search]);

  useEffect(() => {
    if (callType) {
      myMeeting(callType);
    }

    return () => {
      if (zpRef.current) {
        zpRef.current.destroy();
      }
    };
  }, [callType, roomId, navigate]);

  return (
    <div className="room-container flex flex-col items-center justify-center h-screen">
      {!joined && (
        <>
          <header className="text-xl font-bold mb-4">
            {callType === "one-on-one"
              ? "مكالمة فيديو فردية"
              : "مكالمة فيديو جماعية"}
          </header>
          <button
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300"
            onClick={handleExit}
          >
            خروج
          </button>
        </>
      )}
      <div
        ref={videoContainerRef}
        className="video-container w-full h-full mt-4"
      />
    </div>
  );
}

export default RoomPage;
