import chalk from 'chalk';

function write(lines) {
  lines.forEach(line => process.stdout.write(`${line}\n`));
}

export function log(...lines) {
  write(lines.map(line => `${chalk.black.bold.bgWhite('DEBUG')} :: ${line}`));
}

export function info(...lines) {
  write(lines.map(line => `${chalk.white.bold.bgBlue('INFO')}${chalk.blue(`  :: ${line}`)}`));
}

export function warn(...lines) {
  write(lines.map(line => `${chalk.black.bold.bgYellow('WARN')}${chalk.yellow(`  :: ${line}`)}`));
}

export function error(...lines) {
  write(lines.map(line => `${chalk.white.bold.bgRed('ERROR')}${chalk.red(` :: ${line}`)}`));
}

export default {
  log,
  info,
  warn,
  error,
};
