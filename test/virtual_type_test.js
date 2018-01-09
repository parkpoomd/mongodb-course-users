const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {

  it('postCount returns numbers of posts', (done) => {
    const deer = new User({
      name: 'Deer',
      posts: [{ title: 'PostTitle' }]
    });

    deer.save()
      .then(() => User.findOne({ name: 'Deer' }))
      .then((user) => {
        assert(deer.postCount === 1);
        done();
      });
  });
});
