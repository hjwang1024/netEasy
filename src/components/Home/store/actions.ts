export const addAction = (value = '1'): any => {
  return {
    type: 'add',
    value,
  };
};
export const downAction = (value: any = '1'): any => {
  return {
    type: 'down',
    value,
  };
};
