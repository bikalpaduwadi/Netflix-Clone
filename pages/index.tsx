import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import MovieList from "@/components/MovieList";
import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMoviesLists";
import useFavoriteMovies from "@/hooks/useFavoriteMovies";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies } = useMovieList();
  const { isOpen, closeModal } = useInfoModal();
  const { data: favoriteMovies } = useFavoriteMovies();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favoriteMovies} />
      </div>
    </>
  );
}
