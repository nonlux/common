import Yadda, { localisation } from 'yadda'; // eslint-disable-line import/no-extraneous-dependencies
import { should } from 'chai';

should();

const { English } = localisation;

const dictionary = new Yadda.Dictionary()
        .define('js', /([^\u0000]*)/,
                (data, cb) => cb(null, JSON.parse(data)))
        .define('escapeString', /"([^"]*)"/, (data, cb) => cb(null, data));

export default function libraryInstance() {
  const context = {};
  return English.library(dictionary)
    .when('foo', () => console.log('foo'));
}
