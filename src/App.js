import React, { useState } from "react";
// import { Grid } from "@material-ui/core";
import { Grid } from '@mui/material';

import { SearchBar, VideoList, VideoDetail } from "../src/components/index";

// import youtube from "../src/api/youtube";
import axios from "axios";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({ id: {}, snippet: {} });


  return (
    <Grid style={{ justifyContent: "center" }} container spacing={10}>
      <Grid item xs={11}>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <SearchBar onSubmit={handleSubmit} />
          </Grid>
          <Grid item xs={8}>
            <VideoDetail video={selectedVideo} />
          </Grid>
          <Grid item xs={4}>
            <VideoList videos={videos} onVideoSelect={setSelectedVideo} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  async function handleSubmit(searchTerm) {
    const { data: { items: videos } } = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        key: "AIzaSyDfz9tD3Ckc2DXiggnNq4_qODP1KZtA1bs",
        q: searchTerm,
        maxResults: 10,
      }
    });

    setVideos(videos);
    setSelectedVideo(videos[0]);
  }
}

export default App;