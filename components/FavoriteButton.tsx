import React, { useCallback, useMemo } from "react";
import axios from "axios";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavoriteMovies from "@/hooks/useFavoriteMovies";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavoriteMovies();
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [movieId, currentUser]);

  const toggleFavorite = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete("/api/movies/favorite", {
        data: { movieId },
      });
    } else {
      response = await axios.post("/api/movies/favorite", { movieId });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;
    mutateCurrentUser({ ...currentUser, favoriteIds: updatedFavoriteIds });
    mutateFavorites();
  }, [isFavorite, movieId, currentUser, mutateCurrentUser, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      title="Add to favorite"
      onClick={toggleFavorite}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;
