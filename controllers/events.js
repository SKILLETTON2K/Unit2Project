const Restaurant = require('../models/restaurant');
const Event = require('../models/event');

module.exports = {
  show,
  new: newEvent,
  create
};

async function show(req, res) {
  const event = await Event.findById(req.params.id).populate('cast');
  const events = await Event.find({ _id: { $nin: event.cast } }).sort('name');
  res.render('events/show', { title: 'Event Details', event, events });
}

function newEvent(req, res) {
  res.render('events/new', { title: 'Add Event', errorMsg: '' });
}

async function create(req, res) {
  req.body.img = !!req.body.img;
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    const event = await Event.create(req.body);
    res.redirect(`/events/${event._id}`);
  } catch (err) {
    console.log(err);
    res.render('events/new', { errorMsg: err.message });
  }
}