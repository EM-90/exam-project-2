export const PriceCalculator = (
  startDate: Date | null,
  endDate: Date | null,
  pricePerNight: number,
  getDatesInRange: (startDate: Date, endDate: Date) => Date[]
): number => {
  if (!startDate || !endDate) return 0;
  const dates = getDatesInRange(startDate, endDate);
  console.log("Dates in range:", dates);
  return dates.length * pricePerNight;
};
