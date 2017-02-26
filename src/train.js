import { BayesClassifier, PorterStemmerFr } from 'natural';
import path from 'path';
import test from './test';
import trainingData from '../data/corpus.json';
import logger from './utils/logger';

const CLASSIFIER_PATH = path.join(__dirname, '..', 'data', 'classifier.json');
const classifier      = new BayesClassifier(PorterStemmerFr, null);

trainingData.corpus.forEach(line => classifier.addDocument(line.sentence, line.label));

classifier.train();

logger.info('Model trained');

classifier.save(CLASSIFIER_PATH, err => {
  if (err) {
    return logger.error(err);
  }
  logger.info('Model persisted');
  return BayesClassifier.load(CLASSIFIER_PATH, PorterStemmerFr, (error, bayesClassifier) => {
    if (error) {
      return logger.error(error);
    }
    logger.info('----- Memory model testing -----');
    test(classifier);
    logger.info('----- Persisted model testing -----');
    test(bayesClassifier);
  });
});
