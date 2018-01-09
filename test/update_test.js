const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let deer;

  beforeEach((done) => {
    deer = new User({ name: 'Deer', likes: 0 });
    deer.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it('instance type using set n save', (done) => {
    deer.set('name', 'Alex');
    assertName(deer.save(), done);
  });

  it('A model instance can update', (done) => {
    assertName(deer.update({ name: 'Alex' }), done);
  });

  it('A model class can update', (done) => {
    assertName(
      User.update({ name: 'Deer' }, { name: 'Alex' }),
      done
    );
  });

  it('A model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Deer' }, { name: 'Alex' }),
      done
    );
  });

  it('A model class can find a record with an Id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(deer._id, { name: 'Alex' }),
      done
    );
  });

  it('A user can have their postcount incremented by 1', (done) => {
    User.update({ name: 'Deer' }, { $inc: { likes: 1 } })
      .then(() => User.findOne({ name: 'Deer' }))
      .then((user) => {
        assert(user.likes === 1);
        done();
      });
  });
});
