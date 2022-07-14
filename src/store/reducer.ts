const defaultState = {
  value1: 10,
};
interface IAction {
  type: string;
  value: any;
}
export default function changeData(state = defaultState, action: IAction): any {
  // console.log(state, action);

  switch (action.type) {
    case 'add':
      return {
        value1: state.value1 + 1,
        action,
      };

    default:
      return state;
  }
}
