import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useFavoriteMovies = (movieId?: string) => {
  const { data, error, isLoading } = useSWR(
    movieId ? `/api/movies/${movieId}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useFavoriteMovies;
