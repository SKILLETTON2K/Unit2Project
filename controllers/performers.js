const Performer = require('../models/performer');
const Restaurant = require('../models/restaurant');

module.exports = {
  new: newPerformer,
  create,
  addToCast
};

async function addToCast(req, res) {
  const restaurant = await Restaurant.findById(req.params.id);
  // The cast array holds the performer's ObjectId (referencing)
  restaurant.cast.push(req.body.performerId);
  await restaurant.save();
  res.redirect(`/restaurants/${restaurant._id}`);
}

async function newPerformer(req, res) {
  //Sort performers by their name
  const performers = await Performer.find({}).sort('name');
  res.render('performers/new', { title: 'Add Performer', performers });
}

async function create(req, res) {
  req.body.born += 'T00:00';
  try {
    await Performer.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/performers/new');
}