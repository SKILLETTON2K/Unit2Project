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
  res.render('restaurants/index', { title: 'All Listings', restaurants });
}

async function show(req, res) {
  const restaurant = await Restaurant.findById(req.params.id).populate('cast');
  const events = await Event.find({ _id: { $nin: restaurant.cast } }).sort('name');
  res.render('restaurants/show', { title: 'Restaurant Detail', restaurant, events });
}

function newRestaurant(req, res) {
  res.render('restaurants/new', { title: 'Add Restaurant', errorMsg: '' });
}

async function create(req, res) {
  req.body.nowShowing = !!req.body.nowShowing;
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