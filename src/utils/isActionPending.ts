interface actionType {
  type: string;
  payload: undefined;
}

function isActionPending(action: actionType) {
  return action.type.endsWith('pending')
}

export default isActionPending;