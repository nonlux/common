import React from 'react';
import chai, { should } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import {
  Paragraph,
} from 'components';

chai.use(chaiEnzyme());
should();

describe('Paragraph spec', () => {
  it('should render', () => {
    const element = shallow(<Paragraph>foo</Paragraph>);
    element.should.have.tagName('p');
    element.should.contain.text('foo');
  });
});

