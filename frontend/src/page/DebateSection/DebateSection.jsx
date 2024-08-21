import React, { useState } from "react";
import ReactPlayer from "react-player";
import {
  Box,
  Button,
  VStack,
  HStack,
  Heading,
  AspectRatio,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const DebateSection = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [showPartyDebates, setShowPartyDebates] = useState(false);
  const [showLocalDebates, setShowLocalDebates] = useState(false);

  const partyDebates = [
    {
      url: "https://www.youtube.com/watch?v=VIDEO_ID1",
      title: "  عبدالله السراحين  &&  هاشم فريحات",
    }, 
    {
      url: "https://www.youtube.com/watch?v=VIDEO_ID2",
      title: "  حزب الوطن  &&  حزب الوحدة الوطنية",
    },
  ];

  const localDebates = [
    {
      url: "https://www.youtube.com/watch?v=VIDEO_ID3",
      title: "  حزب العدالة  &&  حزب العهد ",
    },
    {
      url: "https://www.youtube.com/watch?v=VIDEO_ID4",
      title: "  محمد حسوون &&  عبدالرؤوف",
    },
  ];

  const handleVideoSelect = (video) => {
    setVideoUrl(video.url);
  };

  return (
    <VStack spacing={8} p={4}>
      <HStack spacing={8} width="100%" justifyContent="center">
        {/* كارد المناظرات الحزبية */}
        <MotionBox
          width="300px"
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          shadow="md"
          bg="green.500" // اللون الأخضر
          color="black"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onTap={() => setShowPartyDebates(!showPartyDebates)}
          transition="0.3s"
          cursor="pointer"
        >
          <Heading
            size="md"
            mb={4}
            textAlign="center"
            border="2px solid" // سمك الحدود
            borderColor=" green" // لون الحدود
            p={2} // حشو داخلي
          >
            المناظرات المسجلة (قائمة حزبية)
          </Heading>
          {showPartyDebates && (
            <VStack spacing={4}>
              {partyDebates.map((video, index) => (
                <Button
                  key={index}
                  width="100%"
                  onClick={() => handleVideoSelect(video)}
                  bg="green.600" // اللون الأخضر الداكن
                  _hover={{ bg: "green.700" }} // اللون الأخضر أغمق عند التمرير
                >
                  {video.title}
                </Button>
              ))}
            </VStack>
          )}
        </MotionBox>

        {/* كارد المناظرات المحلية */}
        <MotionBox
          width="300px"
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          shadow="md"
          bg="red.500" // اللون الأحمر
          color="black"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onTap={() => setShowLocalDebates(!showLocalDebates)}
          transition="0.3s"
          cursor="pointer"
        >
          <Heading
            size="md"
            mb={4}
            textAlign="center"
            border="2px solid" // سمك الحدود
            borderColor="green" // لون الحدود
            p={2} // حشو داخلي
          >
            المناظرات المسجلة (قائمة محلية)
          </Heading>
          {showLocalDebates && (
            <VStack spacing={4}>
              {localDebates.map((video, index) => (
                <Button
                  key={index}
                  width="100%"
                  onClick={() => handleVideoSelect(video)}
                  bg="red.600" // اللون الأحمر الداكن
                  _hover={{ bg: "red.700" }} // اللون الأحمر أغمق عند التمرير
                >
                  {video.title}
                </Button>
              ))}
            </VStack>
          )}
        </MotionBox>
      </HStack>

      {videoUrl && (
        <Box mt={6} width="100%" maxW="400px">
          <AspectRatio ratio={1} borderRadius="md" overflow="hidden">
            <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
          </AspectRatio>
        </Box>
      )}
    </VStack>
  );
};

export default DebateSection;
