function isActionPending(action) {
  return action.type.endsWith('pending')
}

export default isActionPending;