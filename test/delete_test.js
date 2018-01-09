const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let deer;

  beforeEach((done) => {
    deer = new User({ name: 'Deer' });
    deer.save()
      .then(() => done());
  });

  it('model instance remove', (done) => {
    deer.remove()
      .then(() => User.findOne({ name: 'Deer' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method remove', (done) => {
    // Remove a bunch of records with some given criteria
    User.remove({ name: 'Deer' })
      .then(() => User.findOne({ name: 'Deer' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Deer' })
      .then(() => User.findOne({ name: 'Deer' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(deer._id)
      .then(() => User.findOne({ name: 'Deer' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});
