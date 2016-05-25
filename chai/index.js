import test from 'ava';

var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();

test('expect with chai', t => {
  // typeof
  expect('test').to.be.a('string');
  expect({ foo: 'bar' }).to.be.an('object');
  expect(null).to.be.a('null');
  expect(undefined).to.be.an('undefined');
  expect(new Error).to.be.an('error');
  expect(new Float32Array()).to.be.a('float32array');
  expect(Symbol()).to.be.a('symbol');
});

test('should with chai', t => {
  var foo = 'bar'
  var tea = {
    flavors:[1,2,2]
  }
  foo.should.be.a('string');
  foo.should.equal('bar');
  foo.should.have.length(3);
  tea.should.have.property('flavors')
    .with.length(3);
});

test('assert with chai', t => {
  var foo = 'bar'
  var tea = {
    flavors:[1,2,2]
  }
  assert.typeOf(foo, 'string');
  assert.equal(foo, 'bar');
  assert.lengthOf(foo, 3)
  assert.property(tea, 'flavors');
  assert.lengthOf(tea.flavors, 3);
});
