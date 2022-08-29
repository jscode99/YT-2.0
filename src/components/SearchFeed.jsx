import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "../components";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { seacrhTerm } = useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${seacrhTerm}`).then(data =>
      setVideos(data.items),
    );
  }, [seacrhTerm]);

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={2}
        sx={{ color: "whitesmoke" }}
      >
        Search Result for :{"  "}
        <span style={{ color: "#F31503" }}>
          {seacrhTerm.charAt(0).toUpperCase() + seacrhTerm.slice(1)}
        </span>
      </Typography>
      {videos && videos.length > 0 && <Videos videos={videos} />}
    </Box>
  );
};

export default SearchFeed;
