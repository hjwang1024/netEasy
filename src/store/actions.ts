export const showToastAction = (value = '暂未开发'): any => {
  return {
    type: 'add',
    value,
  };
};

export const hideToastAction = () => {
  return {
    type: 'hide',
  };
};
