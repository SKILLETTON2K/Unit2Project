const Event = require('../models/event');
const Restaurant = require('../models/restaurant');

module.exports = {
  new: newEvent,
  create,
  addToCast
};

async function addToCast(req, res) {
  const restaurant = await Restaurant.findById(req.params.id);
  restaurant.cast.push(req.body.eventId);
  await restaurant.save();
  res.redirect(`/restaurants/${restaurant._id}`);
}

async function newEvent(req, res) {
  const events = await Event.find({}).sort('name');
  res.render('events/new', { title: 'Add Event', events });
}

async function create(req, res) {
  req.body.born += 'T00:00';
  try {
    await Event.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/events/new');
}