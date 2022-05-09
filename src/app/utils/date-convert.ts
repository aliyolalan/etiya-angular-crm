export const dateConvertFunction = (stDate: string) => {
  let stReturn = '';
  const date = new Date(stDate);

  stReturn +=
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  stReturn +=
    ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  stReturn +=
    ':' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
  stReturn += ' ';

  stReturn += date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); // ayın kaçıncı günü
  stReturn +=
    '-' +
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1); // kaçında ay
  stReturn += '-' + date.getFullYear(); // yıl

  if (stReturn.includes('NaN')) {
    return stDate;
  }

  return stReturn;
};
