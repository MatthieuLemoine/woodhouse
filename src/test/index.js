import testData from '../../data/test.json';
import logger from '../utils/logger';

// Test classifier
export default (classifier) => {
  const results = testData.corpus.map(line => ({
    ...line,
    classification : classifier.classify(line.sentence),
  })).reduce((result, item) => {
    const { label, classification } = item;
    if (!result[label]) {
      result[label] = {
        right : [],
        wrong : [],
      };
    }
    if (label === classification) {
      result[label].right.push(item);
    } else {
      result[label].wrong.push(item);
    }
    return result;
  }, {});

  const successfull = Object.keys(results).reduce((length, key) => length + results[key].right.length, 0);
  logger.info(`${successfull} sentences successfully classified`);
  const failed = Object.keys(results).reduce((length, key) => length + results[key].wrong.length, 0);
  failed && logger.warn(`${failed} sentences unsuccessfully classified`);

  Object.keys(results).forEach(key =>
    results[key].wrong.length &&
    logger.warn(`For '${key}' label : ${results[key].wrong.reduce((out, item) => `${out}\n'${item.sentence}' has been classified as '${item.classification}' instead of '${item.label}'`, '')}`)
  );
};
