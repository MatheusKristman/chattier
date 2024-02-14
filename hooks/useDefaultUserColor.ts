import { useMemo } from "react";

const useDefaultUserColor = () => {
  function getRandomColor(array: string[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  const colors = [
    "bg-red-400",
    "bg-orange-400",
    "bg-amber-400",
    "bg-green-400",
    "bg-teal-400",
  ];

  const randomColor = getRandomColor(colors);

  return useMemo(
    () => ({
      randomColor,
    }),
    [randomColor],
  );
};

export default useDefaultUserColor;
