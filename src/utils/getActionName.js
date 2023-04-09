function getActionName(actionType) {
  return actionType.split('/')[1];
}

export default getActionName;