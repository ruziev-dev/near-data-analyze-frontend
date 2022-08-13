export const formatTime = (time: number) => {
  let dateString = "🤷‍♂️";
  try {
    const date = new Date(time / 1000_000);
    dateString = date?.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch (error) {
    console.warn("[formatTime] parse date error");
  }
  return dateString;
};
