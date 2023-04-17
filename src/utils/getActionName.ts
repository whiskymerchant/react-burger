function getActionName(actionType: string) {
  return actionType.split('/')[1];
}

export default getActionName;