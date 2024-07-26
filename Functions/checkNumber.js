const checkNumber = (num) => {
  const parsedNumber = parseInt(num, 10);
  if (isNaN(parsedNumber) && parsedNumber != 0) {
    return undefined;
  }
  return parsedNumber;
};

export default checkNumber;
