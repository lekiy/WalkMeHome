import { Box } from "@mui/material";

function DogCarousel() {
  const numberOfDogs = 5;
  const dogImages = Array.from(Array(numberOfDogs).keys());

  function digreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  function lengthDirectionX(length: number, direction: number) {
    return Math.sin(digreesToRadians(direction)) * length;
  }

  function lengthDirectionY(length: number, direction: number) {
    return Math.cos(digreesToRadians(direction)) * length;
  }

  return (
    <div>
      <h1>Carousel</h1>
      {dogImages.map((dog, index) => (
        <Box
          component="img"
          sx={{
            width: 200,
            height: 200,
            position: "absolute",
            transform:
              "translate(" +
              lengthDirectionX(300, 30 * index) +
              "px, " +
              lengthDirectionY(300, 30 * index) +
              "px)",
          }}
          className="carousel"
          src="https://placedog.net/200/200?random"
          alt="dog"
        />
      ))}
    </div>
  );
}

export default DogCarousel;
