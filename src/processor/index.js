import { PorterStemmerFr, BayesClassifier } from 'natural';
import path from 'path';

let classifier;
const CLASSIFIER_PATH = path.join(__dirname, '..', '..', 'data', 'classifier.json');

export function load() {
  return new Promise((resolve, reject) => {
    BayesClassifier.load(CLASSIFIER_PATH, PorterStemmerFr, (err, bayesClassifier) => {
      if (err) {
        return reject(err);
      }
      classifier = bayesClassifier;
      return resolve();
    });
  });
}

export function processSentence(sentence) {
  // const classifications = classifier.getClassifications(sentence);
  return classifier.classify(sentence);
}
