interface actionType {
  type: string;
  payload: any;
}

function isActionRejected(action: actionType) {
  return action.type.endsWith('rejected')
}

export default isActionRejected;