interface actionType {
  type: string;
  payload: undefined;
}

function isActionRejected(action: actionType) {
  return action.type.endsWith('rejected')
}

export default isActionRejected;