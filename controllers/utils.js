// utils.js
const Car = require('../models/carmodel');
const Truck = require('../models/truckmodel');
const Bodaboda = require('../models/bodabodamodel')
const Taxi = require('../models/taximodel')
const Coaster = require('../models/coastermodel')


async function calculateTotalAmount(collectionName) {
  let totalAmount = 0;

  try {
    if (collectionName === 'car') {
      const carAmount = await Car.aggregate([
        { $group: { _id: '$all', totalamount: { $sum: '$amount' } } }
      ]);

      totalAmount = carAmount[0]?.totalamount || 0;
    } else if (collectionName === 'truck') {
      const truckAmount = await Truck.aggregate([
        { $group: { _id: '$all', totalamount: { $sum: '$amount' } } }
      ]);

      totalAmount = truckAmount[0]?.totalamount || 0;
    }else if (collectionName === 'bodaboda') {
      const bodabodaAmount = await Bodaboda.aggregate([
        { $group: { _id: '$all', totalamount: { $sum: '$amount' } } }
      ]);

      totalAmount = bodabodaAmount[0]?.totalamount || 0;
    }else if (collectionName === 'taxi') {
      const taxiAmount = await Taxi.aggregate([
        { $group: { _id: '$all', totalamount: { $sum: '$amount' } } }
      ]);

      totalAmount = taxiAmount[0]?.totalamount || 0;
    }else if (collectionName === 'coaster') {
      const coasterAmount = await Coaster.aggregate([
        { $group: { _id: '$all', totalamount: { $sum: '$amount' } } }
      ]);

      totalAmount = coasterAmount[0]?.totalamount || 0;
    }


    return totalAmount;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { calculateTotalAmount };
