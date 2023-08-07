import { Box, keyframes } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

/* this component is getting to complicted im going to do something else instead but leave it here for showing process */

const carouselStyle = {
  position: "absolute",
};

function DogCarousel() {
  const numberOfDogs = 10;
  const dogImages = Array.from(Array(numberOfDogs).keys());
  const [baseAngle, setBaseAngle] = useState(-180);

  const angle = 360 / numberOfDogs;
  const radius = 300;

  useEffect(() => {
    const interval = setInterval(() => {
      setBaseAngle(baseAngle + 0.5);
      if (baseAngle >= 180) setBaseAngle(-180);
    }, 5);

    return () => clearInterval(interval);
  }, [baseAngle]);

  function digreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  function lengthDirectionX(length: number, direction: number) {
    return Math.sin(digreesToRadians(direction)) * length;
  }

  function lengthDirectionY(length: number, direction: number) {
    return Math.cos(digreesToRadians(direction)) * length;
  }

  const createStyles = useCallback(
    (index: number) => {
      return {
        width: 100,
        height: 100,
        position: "absolute",
        borderRadius: "15px",
        zIndex: lengthDirectionY(radius, baseAngle + angle * index),
        transform: `translate(${lengthDirectionX(
          radius,
          baseAngle + angle * index
        )}px, ${lengthDirectionY(radius, baseAngle + angle * index)}px)`,
      };
    },
    [baseAngle, angle, radius]
  );

  return (
    <Box sx={carouselStyle}>
      {/* <h1>{baseAngle}</h1> */}
      {dogImages.map((dog, index) => (
        <Box
          component="img"
          sx={createStyles(index)}
          className="carousel"
          src="https://placedog.net/200/200?random"
          alt="dog"
        />
      ))}
    </Box>
  );
}

export default DogCarousel;
