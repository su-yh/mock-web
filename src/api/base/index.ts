export const calculateRate = (lpr?: number, bp?: number): string => {
  // 处理空值
  if (lpr === undefined || lpr === null || bp === undefined || bp === null) {
    return '-';
  }

  const actualRate = lpr + (bp / 100);

  // 保留2位小数，避免出现多位小数的情况
  const formattedRate = actualRate.toFixed(2);

  // 处理NaN/Infinity等异常值
  return isNaN(Number(formattedRate)) ? '-' : `${formattedRate}%`;
};