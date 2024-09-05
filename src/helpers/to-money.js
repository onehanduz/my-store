const moneyChanger = (number) => {
  const formatter = new Intl.NumberFormat("en-UZ", {
    style: "currency",
    currency: "UZS",
  });
  return formatter.format(number);
};

module.exports = {
  moneyChanger,
};
