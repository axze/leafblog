var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog'
  }
});

module.exports = {
  getDisplayName: function(id, cb) {
    knex('users')
      .select('display_name')
      .where('id', id)
      .then(function(result) {
        cb(result);
      });
  },
  getPosts: function(cb) {
    knex('blog_posts')
      .select('title', 'body', 'tags', 'owner')
      .orderBy('id', 'desc')
      .limit(10)
      .then(function(result) {
        cb(result);
      });
  },
  createPost: function(title, body, tags, owner, cb) {
      knex('blog_posts')
        .insert({title: title, body: body, tags: tags, owner: owner})
        .returning('id')
        .then(function(result) {
          cb(result);
        });
  },
  createUser: function(email, password, display_name, cb) {
    knex('users')
      .insert({ email: email, password: password, display_name: display_name })
      .returning('id')
      .then(function(result) {
        cb(result);
      });
  },
  getUser: function(email, cb) {
    knex('users')
      .select('id', 'password', 'display_name') // change data to what needs to be returned
      .where('email', email)
      .then(function(result) {
        cb(result);
      });
  }
}
