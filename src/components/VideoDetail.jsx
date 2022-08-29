import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, TextField } from "@mui/material";

import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { CheckCircle } from "@mui/icons-material";

const VideoDetail = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [videos, setVideos] = useState(null);
  const [comment, setComment] = useState(null);
  console.log("Comments", comment);
  const { id } = useParams();
  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then(data =>
      setVideoDetails(data.items[0]),
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      data => setVideos(data.items),
    );

    fetchFromAPI(`commentThreads?part=snippet&order=date&videoId=${id}`).then(
      data => setComment(data.items),
    );
  }, [id]);

  if (!videoDetails?.snippet) return <Loader />;

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount, commentCount },
  } = videoDetails;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", top: "90px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight={`bold`} p={2}>
              {title}
            </Typography>
            <Stack
              direction={`row`}
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Box sx={{ padding: "20px", overflow: "hidden" }}>
            <Stack direction="column">
              <Typography variant="subtitle1" color="#fff">
                {commentCount} Comments
              </Typography>
              <Box mt={2}>
                <TextField
                  id="standard-basic"
                  label="Add a comment...."
                  variant="standard"
                  fullWidth
                  sx={{ color: "gray" }}
                />
              </Box>
              {comment &&
                comment.slice(0, 20).map((data, index) => (
                  <Box mt={4}>
                    <Stack direction={`row`} gap="10px">
                      <Box
                        sx={{
                          borderRadius: "30px",
                          backgroundColor: "gray",
                          height: "40px",
                          width: "40px",
                        }}
                      >
                        <img
                          src={
                            data?.snippet?.topLevelComment?.snippet
                              ?.authorProfileImageUrl
                          }
                          height="40px"
                          width="40px"
                          alt="User"
                          style={{ borderRadius: "30px", overflow: "hidden" }}
                        />
                      </Box>
                      <Box
                        ml={2.5}
                        width={{ sm: "65%", md: "70%" }}
                        overflow={`hidden`}
                      >
                        <Stack direction={`column`}>
                          <Typography
                            variant="body1"
                            color="#fff"
                            fontSize={`14px`}
                            fontWeight="bold"
                          >
                            {
                              data?.snippet?.topLevelComment?.snippet
                                ?.authorDisplayName
                            }
                          </Typography>

                          <Typography
                            variant="body2"
                            fontSize="12px"
                            color="#efedede0"
                          >
                            {
                              data?.snippet?.topLevelComment?.snippet
                                ?.textDisplay
                            }
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                ))}
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h6" py={1} color="gray">
            Recommended for you
          </Typography>
          {videos && videos.length > 0 && (
            <Videos videos={videos} direction="column" />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
