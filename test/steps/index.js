import Yadda, { localisation } from 'yadda'; // eslint-disable-line import/no-extraneous-dependencies
import { should } from 'chai';
import htmlGenerator from 'html-generator';

should();

const { English } = localisation;

const dictionary = new Yadda.Dictionary()
        .define('js', /([^\u0000]*)/,
                (data, cb) => cb(null, JSON.parse(data)))
        .define('escapeString', /"([^"]*)"/, (data, cb) => cb(null, data));

export default function libraryInstance() {
  const context = {};
  return English.library(dictionary)
    .when('I define prototype\n$js', (js) => {
      context.proto = js;
    })
    .then('I should see  html output $escapeString', (html) => {
      htmlGenerator(context.proto).should.be.equal(html);
    });
}
