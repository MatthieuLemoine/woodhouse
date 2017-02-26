import chalk from 'chalk';
import { getBotName, getMasterName } from './config';
import i18n, { getLocale } from '../i18n';

const BOT_NAME    = getBotName();
const MASTER_NAME = getMasterName();

const paddedNames = getPaddedNames({ bot : BOT_NAME, master : MASTER_NAME });

export function prompt(key, data, hidePrompt) {
  const sentence = i18n.__({ phrase : key, locale : getLocale() }, data);
  process.stdout.write(`${chalk.yellow(paddedNames.bot)} : ${sentence}\n`);
  !hidePrompt && process.stdout.write(`${chalk.green(paddedNames.master)} : `);
}

export function getPaddedNames({ bot, master }) {
  if (bot.length > master.length) {
    return {
      bot,
      master : `${master}${' '.repeat(bot.length - master.length)}`,
    };
  }
  return {
    bot : `${bot}${' '.repeat(master.length - bot.length)}`,
    master,
  };
}
