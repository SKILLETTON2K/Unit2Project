const Restaurant = require('../models/restaurant');
const Event = require('../models/event');

module.exports = {
  show,
  new: newEvent,
  create
};


async function show(req, res) {
  const event = await Event.findById(req.params.id).populate('time');
  // const events = await Event.find({ _id: { $nin: event.time } }).sort('name');
  res.render('events/show', { title: 'Event Details', errorMsg: '', event });
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
    debugger
    console.log(err);
    res.render('events/new', { title: 'Add Event', errorMsg: err.message });
  }
}