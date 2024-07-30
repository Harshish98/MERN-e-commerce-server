const stripe = require("stripe");

const Stripe = new stripe('sk_test_51PVuHkC6qYPttZBGalm42mqT9TJMwYPa07VXbgKUCgVjVJ2EvO4VKQMq66WHn7LsdDIY7DPOTV3DoOgFMd9JWIEq005uIdsq8o');

module.exports = Stripe;
