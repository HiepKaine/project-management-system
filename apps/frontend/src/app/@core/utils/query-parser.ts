export const pageParser = (d: string | undefined): number => {
  const reg = new RegExp('^[0-9]+$');
  if (!d) {
    return 1;
  }
  if (!reg.test(d)) {
    return 1;
  }
  if (Number(d) <= 0) {
    return 1;
  }
  return Number(d);
}
