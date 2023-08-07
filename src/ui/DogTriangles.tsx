import { Box } from "@mui/material";

export default function DogTriangles() {
  const numberOfDogs = 7;
  const imageSize = 150;
  const imageGap = 5;
  const dogImages = Array.from({ length: numberOfDogs }).map(() => {
    return `https://placedog.net/${imageSize}/${imageSize}?id=${Math.floor(
      Math.random() * 100
    )}`;
  });

  return (
    <Box
      width={`${imageSize * 2.5 + imageGap * 3}px`}
      height={`${imageSize * 2 + imageGap}px`}
    >
      {dogImages.map((dogImage, index) => {
        let clipPath =
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
                }px ${index > 2 ? imageSize + imageGap : 0}px`,
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
