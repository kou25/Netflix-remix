import React, { useState } from "react";
import { SearchIcon, BellIcon, ChatIcon } from "@heroicons/react/outline";
import Avatar from "react-avatar";
import axios from "~/models/Request/axios";
import requests from "../../../models/Request/Requests";
import { Link, useLoaderData } from "@remix-run/react";
import CategoryRows from "~/models/movies/ui/CategoryRows";
import { debounce } from "lodash";

export async function loader() {
  const res = await axios.get(requests.fetchOriginals);
  const fetchTrending = await axios.get(requests.fetchTrending);
  const fetchOriginals = await axios.get(requests.fetchOriginals);
  const fetchTopRated = await axios.get(requests.fetchTopRated);
  const fetchActionMovies = await axios.get(requests.fetchActionMovies);
  const fetchHorrorMovies = await axios.get(requests.fetchHorrorMovies);
  return {
    data: res.data.results[
      Math.floor(Math.random() * res.data.results.length - 1)
    ],
    fetchTrending: fetchTrending.data.results,
    fetchOriginals: fetchOriginals.data.results,
    fetchTopRated: fetchTopRated.data.results,
    fetchActionMovies: fetchActionMovies.data.results,
    fetchHorrorMovies: fetchHorrorMovies.data.results
  };
}

const MoviesList = () => {
  const {
    data,
    fetchTrending,
    fetchOriginals,
    fetchTopRated,
    fetchActionMovies,
    fetchHorrorMovies
  } = useLoaderData();
  const [searchMovies, setSearchMovies] = useState([]);
  const truncate = (string: string, n: number) => {
    return string?.length > n ? string.slice(0, n - 1) + "..." : string;
  };

  const search = async (value: string) => {
    const res = await axios.get(
      `search/movie?api_key=9d2bff12ed955c7f1f74b83187f188ae&query=${value}&language=en-US`
    );
    return res.data.results;
  };

  const debouncedSearch = debounce(async (value) => {
    //@ts-ignore
    if (value === "") {
      return setSearchMovies([]);
    }
    setSearchMovies(await search(value));
  }, 300);

  const handleChange = async (event: any) => {
    let value = event.currentTarget.value;
    // load data from a route with a loader
    debouncedSearch(value);
  };
  return (
    <div className="p-10 flex flex-col">
      {/* navbar */}
      <div className="flex justify-between w-full">
        <div className="w-1/3 relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Search.."
            className="block w-full py-2 px-4 rounded-2xl border-2 border-gray-300 focus:outline-none sm:text-sm pl-10  shadow-sm"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="relative mx-2">
            <BellIcon className="h-6 w-6 text-gray-500" aria-hidden="true" />
            <span className="absolute top-0 right-[1px] rounded-[50%] border-solid bg-red-500 h-2 w-2" />
          </div>
          <div className="relative mx-2">
            <ChatIcon className="h-6 w-6 text-gray-500" aria-hidden="true" />
            <span className="absolute top-0 right-[1px] rounded-[50%] border-solid bg-red-500 h-2 w-2" />
          </div>
          <div className="mx-2">
            <Avatar
              size="40"
              src={
                "https://i.pinimg.com/originals/5d/79/95/5d7995e3eb977059161d0f850c74eebf.jpg"
              }
              round
            />
          </div>
          <div className="mx-2">
            <p className="text-sm font-semibold">Welcome Back</p>
            <p className="text-xs text-gray-400">admin</p>
          </div>
        </div>
      </div>
      {/* navbar ends */}
      {/* banner  */}
      {searchMovies.length === 0 ? (
        <>
          <div className="my-10">
            <div
              className="w-full h-96 rounded-3xl bg-cover bg-center border shadow "
              style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original${data?.backdrop_path}")`,
                boxShadow:
                  "0px 4px 4px 0px #00000040,inset 0 0 0 500px rgba(0,0,0,.5)"
              }}
            >
              <div className="px-10 flex flex-col justify-end h-full">
                <div className="pb-8">
                  <p className="py-5 text-3xl font-semibold text-white">
                    {data?.title || data?.name || data?.original_name}
                  </p>
                  <Link
                    to={`/admin/movies/${
                      data?.title || data?.name || data?.original_name
                    }`}
                    state={{ data: data! }}
                  >
                    <button className="px-5 py-2 bg-red-500 shadow-md text-white rounded-md hover:bg-white hover:text-red-500">
                      Watch
                    </button>
                  </Link>
                  <p className="py-5 font-semibold text-white w-1/2">
                    {truncate(data?.overview, 150)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* categories */}
          <CategoryRows sectionTitle={"Trending Now"} data={fetchTrending} />
          <CategoryRows
            sectionTitle={"Netflix Originals"}
            data={fetchOriginals}
          />
          <CategoryRows
            sectionTitle={"Top Rated Movies"}
            data={fetchTopRated}
          />
          <CategoryRows
            sectionTitle={"Action Movies"}
            data={fetchActionMovies}
          />
          <CategoryRows
            sectionTitle={"Horror Movies"}
            data={fetchHorrorMovies}
          />
        </>
      ) : (
        <div className="my-10">
          {searchMovies.map(
            (movie: any, index) =>
              movie.backdrop_path && (
                <Link
                  to={`/admin/movies/${
                    movie?.title || movie?.name || movie?.original_name
                  }`}
                  state={{ data: movie! }}
                >
                  <div
                    key={index}
                    className="flex items-center mb-5 ml-10 transition transform hover:scale-[1.08] hover:opacity-100"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                      alt="logo"
                      className="bg-contain bg-center w-48 mr-5"
                    />
                    <p className="text-gray-600 font-semibold">
                      {movie?.title || movie?.name || movie?.original_name}
                    </p>
                  </div>
                </Link>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default MoviesList;
