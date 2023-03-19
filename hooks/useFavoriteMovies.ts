import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useFavoriteMovies = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/movies/favorites",
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
    mutate,
    isLoading,
  };
};

export default useFavoriteMovies;
