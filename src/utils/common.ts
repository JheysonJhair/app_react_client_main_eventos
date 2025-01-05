export const formatDate = (isoDate: any) => {
  const date = new Date(isoDate);
  const [year, month, day] = date.toISOString().split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};


export const calculateDaysBetweenDates = (
  startDate: string,
  endDate: string
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const differenceInTime = end.getTime() - start.getTime();
  return Math.ceil(differenceInTime / (1000 * 3600 * 24));
};
