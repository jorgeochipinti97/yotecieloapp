import { Cloudinary } from "cloudinary-core";
import { useEffect, useState, FC } from 'react';
interface Props {
  url: string
}

const NativeVideoPlayer: FC<Props> = ({ url }) => {
  const [videoPlayer_, setvideoPlayer_] = useState('')
  const cld = new Cloudinary({ cloud_name: "dh9neryh8" });

  useEffect(() => {
    const videoPlayer = cld.video_url(url, {
      muted: true,
      controls: true
    });
    setvideoPlayer_(videoPlayer)
    console.log(videoPlayer)
  })



  return (
    <div>
      <video src={videoPlayer_} autoPlay={true} controls={true} loop={true} width='100%' height='100%'/>
    </div>
  );
};
export default NativeVideoPlayer;