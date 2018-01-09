const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  
  it('saves a user', (done) => {
    const deer = new User({ name: 'Deer' });

    deer.save()
      .then(() => {
        // Has deer been saved successfully?
        assert(!deer.isNew);
        done();
      });
  });
});
