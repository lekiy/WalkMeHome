import { IconButton, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { theme } from "../Theme";

type FavoriteProps = {
  isFavorite: boolean;
  onClick: () => void;
};

function FavoriteButton({ isFavorite, onClick }: FavoriteProps) {
  const iconSize = 1;

  return (
    <>
      <Tooltip title={"Add Favorite"}>
        <IconButton
          aria-label="add to favorites"
          onClick={onClick}
          sx={{ background: theme.palette.background.paper }}
        >
          {isFavorite ? (
            <FavoriteIcon
              sx={{ width: `${iconSize}em`, height: `${iconSize}em` }}
            />
          ) : (
            <FavoriteBorderIcon
              sx={{ width: `${iconSize}em`, height: `${iconSize}em` }}
            />
          )}
        </IconButton>
      </Tooltip>
    </>
  );
}

export default FavoriteButton;
