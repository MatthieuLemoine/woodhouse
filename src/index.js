import { Writable } from 'stream';
import { load, processSentence } from './processor';
import { prompt } from './utils/display';
import logger from './utils/logger';
import { getMasterName } from './utils/config';

const dialog = {
  greetings : {
    key : 'prompt',
  },
  greetings_ask : {
    key : 'answer_greetings',
  },
  showtime : {
    key : 'answer_showtime',
  },
  close : {
    key : 'bye',
    data : {
      name : getMasterName(),
    },
    action : () => process.exit(),
    hidePrompt : true,
  },
};

const woodhouse = new Writable({
  write(chunk, encoding, done) {
    const result = processSentence(chunk.toString('utf8'));
    const answer = dialog[result];
    if (answer) {
      prompt(answer.key, answer.data, answer.hidePrompt);
      answer.action && answer.action();
    } else {
      prompt('unmatched', {});
    }
    done();
  },
});

// Load training data
load()
  .then(() => {
     process.stdin.pipe(woodhouse);
    prompt('first', { name : getMasterName()});
  })
  .catch(err => {
    logger.error('Error while loading training data');
    logger.error(err);
    return process.exit(1);
  });
