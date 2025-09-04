export const formatDate = (date) => {
  const newDate = new Date(date);
  return `${newDate.getFullYear()}.${
    newDate.getMonth() + 1
  }.${newDate.getDay()} ${newDate.getHours()}:${newDate.getMinutes()}`;
};
