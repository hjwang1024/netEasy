import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Find() {
  const { value, value1 } = useSelector((state: any) => ({
    value: state.home.value,
    value1: state.reducer.value1,
  }));
  return (
    <div>
      <div>23123</div>
      <div>23123</div>
      <div>{value}</div>
      <div>{value1}</div>
    </div>
  );
}

export default Find;
