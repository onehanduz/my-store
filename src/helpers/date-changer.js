const changer = (fdate) => {
  const datetime = new Date(fdate);
  const date = datetime.toISOString().split("T")[0];
  const formattedDate = date.split("-").reverse().join("-");
  return formattedDate;
};

module.exports = {
  changer,
};
