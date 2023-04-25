interface actionType {
  type: string;
  payload: any;
}

function isActionPending(action: actionType) {
  return action.type.endsWith('pending')
}

export default isActionPending;