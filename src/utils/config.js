export function getBotName() {
  return process.env.WH_BOT_NAME || 'Woodhouse';
}

export function getMasterName() {
  return process.env.WH_MASTER_NAME || 'Master';
}
