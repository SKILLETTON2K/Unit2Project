const Restaurant = require('../models/restaurant');
const Event = require('../models/event');

module.exports = {
  index,
  show,
  new: newRestaurant,
  create
};

async function index(req, res) {
  const restaurants = await Restaurant.find({});
  const events = await Event.find({});
  res.render('restaurants/index', { title: 'All Listings', restaurants, events });
}

async function show(req, res) {
  const restaurant = await Restaurant.findById(req.params.id).populate('time');
  // const events = await Event.find({ _id: { $nin: restaurant.time } }).sort('name');
  res.render('restaurants/show', { title: 'Restaurant Detail', restaurant });
}

function newRestaurant(req, res) {
  res.render('restaurants/new', { title: 'Add Restaurant', errorMsg: '' });
}

async function create(req, res) {
  req.body.img = !!req.body.img;
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    const restaurant = await Restaurant.create(req.body);
    res.redirect(`/restaurants/${restaurant._id}`);
  } catch (err) {
    console.log(err);
    res.render('restaurants/new', { errorMsg: err.message });
  }
}