const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};

function find() {
  return db('schemes');
}

async function findById(id) {
  try {
    const scheme = await db('schemes').where({ id }).first();
    return scheme ? scheme : null;
  }
  catch(err) {
    console.error(err)
  }
}

async function findSteps(id) {
  try {
    const steps = await db.select("st.id", "sc.scheme_name", "st.step_number", "st.instructions")
      .from("steps as st")        
      .join("schemes as sc", "st.scheme_id", "sc.id")
      .where("sc.id", id);
    return steps.length = 0 ? null : steps;
  }
  catch(err) {
    console.error(err)
  }
}

function add(scheme) {
  return db('schemes')
    .insert(scheme)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(changes, id) {
  return db('schemes')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('schemes')
    .where('id', id)
    .del();
}
