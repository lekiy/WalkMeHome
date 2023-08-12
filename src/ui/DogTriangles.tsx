import { Box, Theme, useMediaQuery } from "@mui/material";

export default function DogTriangles() {
  const imageScale = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  )
    ? 0.5
    : 1;
  const numberOfDogs = 7;
  const imageSize = 12 * imageScale;
  const imageGap = imageSize / 20;
  const dogImages = Array.from({ length: numberOfDogs }).map(() => {
    return `https://placedog.net/${15 * imageSize}/${
      15 * imageSize
    }?id=${Math.floor(Math.random() * 100)}`;
  });

  return (
    <Box
      width={`${imageSize * 2.5 + imageGap * 3}em`}
      height={`${imageSize * 2 - imageGap}em`}
      display={"block"}
    >
      {dogImages.map((dogImage, index) => {
        const clipPath =
          index % 2 == 0
            ? "polygon(50% 0%, 0% 100%, 100% 100%)"
            : "polygon(50% 100%, 0% 0%, 100% 0%)";
        return (
          <>
            <Box
              component="img"
              sx={{
                position: "absolute",
                clipPath: clipPath,
                translate: `${
                  (imageSize / 2 + imageGap) * index +
                  (index > 2 ? (-imageSize / 2 - imageGap) * 3 : 0)
                }em ${index > 2 ? imageSize : 0}em`,
              }}
              src={dogImage}
              alt="dog"
            />
          </>
        );
      })}
    </Box>
  );
}
