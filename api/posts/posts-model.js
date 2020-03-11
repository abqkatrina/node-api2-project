const knex = require('knex');
const config = require('../../knexfile.js');
const db = knex(config.development);

module.exports = {
  find,
  findById,
  insert,
  remove,
  update,
  findPostComments,
  findCommentById,
  insertComment,
};

function find(query) {
  const { page = 1, limit = 2, sortby = 'id', sortdir = 'asc' } = query;
  const offset = limit * (page - 1);

  let rows = db('posts')
    .orderBy(sortby, sortdir)
    .limit(limit)
    .offset(offset);

  return rows;
}

function findById(id) {
  return db('posts')
    .where({ id })
    .first();
}


async function insert(post) {
  const [id] = await db('posts').insert(post);

  return findById(id);
}

function remove(id) {
  return db('posts')
    .where({ id })
    .del();
}

function update(id, changes) {
  return db('posts')
    .where({ id })
    .update(changes, '*');
}



function findPostComments(postId) {
  return db('comments as c')
    .join('posts as p', 'c.post_id', 'p.id')
    .select('c.id', 'c.text', 'h.id as postId')
    .where({ post_id: postId });
}

function findCommentById(id) {
  return db('comments')
    .where({ id })
    .first();
}

async function insertComment(comment) {
  const [id] = await db('comment').insert(comment);

  return findCommentById(id);
}

