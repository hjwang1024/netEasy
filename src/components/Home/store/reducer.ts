const defaultState = {
    value: 1,
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
                value: state.value + 1,
            };
        case 'down':
            return {
                value: action.value,
            };
        default:
            return state;
    }
}
