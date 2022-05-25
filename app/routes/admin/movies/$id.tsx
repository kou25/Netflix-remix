import { Link, useLocation } from "@remix-run/react";
import { ArrowCircleLeftIcon } from "@heroicons/react/solid";
import type { YouTubeProps } from "react-youtube";
import YouTube from "react-youtube";
import { useEffect, useState } from "react";
//@ts-ignore
import axios from "~/models/Request/axios";

const opts: YouTubeProps["opts"] = {
  height: "500",
  width: "100%",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1
  }
};

const MovieDetails = () => {
  let location = useLocation();
  // @ts-ignore
  const data = location?.state?.data;
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");

  useEffect(() => {
    const fetchName = async (data: any) => {
      if (data.id) {
        const res = await axios.get(
          `search/movie?api_key=9d2bff12ed955c7f1f74b83187f188ae&query=${
            data?.title || data?.name || data?.original_name
          }&language=en-US`
        );

        if (res.data.results.length > 0) {
          const getMax = Math.max(
            ...res.data.results.map((movie: any) => movie.vote_count)
          );
          const getID = res.data.results.find(
            (d: any) => d.vote_count === getMax
          );
          if (getID.id) {
            const getYoutubeId = await axios.get(
              // @ts-ignore
              `movie/${getID.id}/videos?api_key=8557729c0b4e2579fdc67ce5a0112074`
            );
            setTrailerUrl(getYoutubeId.data.results[0].key);
          }
        }
      }
    };
    fetchName(data);
  }, [data]);

  console.log(data, "--");
  return (
    <div className="p-10 flex flex-col">
      {/* navbar */}
      <div className="flex justify-between w-full border-b border-slate-300 pb-5">
        <Link to="/admin/movies">
          <div className="flex items-center">
            <ArrowCircleLeftIcon
              className="h-5 w-5 text-gray-500 mr-3"
              aria-hidden="true"
            />
            Go Back
          </div>
        </Link>
      </div>
      <div className="my-10">
        <h1 className="text-3xl font-semibold text-slate-700 mb-5 ">
          {data?.title || data?.name || data?.original_name}
        </h1>
        {trailerUrl !== "" ? (
          <div className="mb-10">
            <YouTube videoId={trailerUrl!} opts={opts} />
          </div>
        ) : data?.backdrop_path !== undefined ? (
          <div className="my-10">
            <div
              className="w-full min-h-[550px]  bg-cover bg-center border shadow "
              style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original${data?.backdrop_path}")`
              }}
            ></div>
          </div>
        ) : (
          <></>
        )}
        <h2 className="text-xl font-semibold text-slate-700 mb-5 font-jennaSue">
          Description
        </h2>
        <p>{data?.overview || "No Description"} </p>
      </div>
    </div>
  );
};

export default MovieDetails;
