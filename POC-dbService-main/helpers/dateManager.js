const date = new Date();

const getDates = (dates) => {
  const targetDates = dates.split("-");
  const dateMin = `${targetDates[0]}-${targetDates[1]}-${targetDates[2]}`;
  const dateMax = `${targetDates[3]}-${targetDates[4]}-${parseInt(targetDates[5]) + 1 }`;
  return [dateMin, dateMax];
};

module.exports = getDates
