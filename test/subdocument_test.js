const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {

  it('can create a subdocument', (done) => {
    const deer = new User({
      name: 'Deer',
      posts: [{ title: 'PostTitle' }]
    });

    deer.save()
      .then(() => User.findOne({ name: 'Deer'}))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
  });

  it('can add subdocuments to an existing record', (done) => {
    const deer = new User({
      name: 'Deer',
      posts: []
    });

    deer.save()
      .then(() => User.findOne({ name: 'Deer' }))
      .then((user) => {
        user.posts.push({ title: 'New Post' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Deer' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  it('can remove an existing subdocument', (done) => {
    const deer = new User({
      name: 'Deer',
      posts: [{ title: 'New Title' }]
    });

    deer.save()
      .then(() => User.findOne({ name: 'Deer' }))
      .then((user) => {
        const post = user.posts[0];
        post.remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Deer' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
