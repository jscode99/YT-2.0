import { Stack, Box } from "@mui/material";

import { ChannelCard, VideoCard } from "./";

const Videos = ({ videos, direction }) => {
  console.log("In Videos ---->", videos);
  return (
    <Stack
      direction={direction || `row`}
      flexWrap="wrap"
      justifyContent="start"
      gap={2}
    >
      {videos.map((video, i) => (
        <Box key={i}>
          {video.id.channelId && <ChannelCard channelDetails={video} />}
          {video.id.videoId && <VideoCard video={video} />}
        </Box>
      ))}
    </Stack>
  );
};
export default Videos;
