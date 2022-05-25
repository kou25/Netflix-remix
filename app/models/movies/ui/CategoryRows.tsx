import { Link } from "@remix-run/react";
import React from "react";

type Props = {
  sectionTitle: string;
  data: any;
};

const CategoryRows = ({ sectionTitle, data }: Props) => {
  return (
    <div className="my-2">
      <div className="w-full flex flex-col">
        <p className="text-gray-700 font-semibold text-lg">{sectionTitle}</p>
        <div className="flex overflow-y-hidden overflow-x-scroll pr-5 py-5 scrollbar-hide">
          {data.map((movie: any) => (
            <div
              key={movie.id}
              className="bg-white overflow-hidden rounded-xl mr-4 min-w-[180px] w-full transition transform hover:scale-[1.08] hover:opacity-100 shadow"
            >
              <Link
                to={`/admin/movies/${
                  movie?.title || movie?.name || movie?.original_name
                }`}
                state={{ data: movie! }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                  className="max-h-[100px] object-contain w-full "
                  alt="logo"
                />
                <div className="flex items-center justify-center">
                  <p className="p-2 text-slate-700 font-semibold text-sm">
                    {movie.title || movie.original_name}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryRows;
