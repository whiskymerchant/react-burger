function isActionRejected(action) {
  return action.type.endsWith('rejected')
}

export default isActionRejected;