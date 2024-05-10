const getTimeLeft = (time) => {
  // Получаем текущую дату.
  const dateNow = Date.now();

  // Получаем остаток ms.
  const timeLeft = time - dateNow;

  // Получаем часы.
  const hours = Math.floor(timeLeft / 3600000);

  // Получаем минуты.
  const minutes = Math.floor((timeLeft - hours * 3600000) / 60000);

  // Преобразуем в текст.
  const textHours = hours < 10 ? `0${hours}` : hours;
  const textMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Возвращаем время.
  return `${textHours}:${textMinutes}`;
};

export default getTimeLeft;
