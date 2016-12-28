import chai, { should } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import htmlGenerator, { convertJsToReactComponent } from 'html-generator';

chai.use(chaiEnzyme());
should();

describe('html-generator module', () => {
  describe('generator spec', () => {
    it('should return String', () => {
      htmlGenerator({ Paragraph: 'foo' }).should.be.a('string');
    });
  });

  describe('convertJsToReactComponent spec', () => {
    it('should return react component by name', () => {
      convertJsToReactComponent('div').type.should.be.equal('div');
    });

    it('should return react component with props', () => {
      const props = { foo: 'bar' };
      convertJsToReactComponent('div', props).props.should.be.deep.equal(props);
    });

    it('should return react component with child props', (done) => {
      const props = { Paragraph: 'bar' };
      const Component = convertJsToReactComponent('div', props);
      const element = shallow(Component);
      element.should.have.tagName('div');
      element.should.contain.html('<p>bar</p>');
      done();
    });

    it('should return react component with string child', (done) => {
      const props = 'foo';
      convertJsToReactComponent('div', props).props.should
        .be.deep.equal({ children: props });
      done();
    });
  });
});
