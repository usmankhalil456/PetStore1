import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Lostpet from '../models/lostpetModel.js';
import { isAuth, isSeller } from '../utils.js';

const lostpetRouter = express.Router();

lostpetRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const name = req.query.name || '';
    const category = req.query.category || '';
     const seller = req.query.seller || '';

    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const categoryFilter = category ? { category } : {};
    // const priceFilter =
    //   min && max
    //     ? {
    //         price: { $gte: Number(min), $lte: Number(max) },
    //       }
    //     : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sellerFilter = seller ? { seller } : {};
    const nameFilter = name
      ? {
          name: {
            $regex: name,
            $options: 'i',
          },
        }
      : {};
    // const order = req.query.order
    //   ? req.query.order === 'lowest'
    //     ? { price: 1 }
    //     : req.query.order === 'highest'
    //     ? { price: -1 }
    //     : req.query.order === 'newest'
    //     ? { _id: -1 }
    //     : { rating: -1 }
    //   : { _id: -1 };
    const lostpets = await Lostpet.find({
      ...sellerFilter,
      ...categoryFilter,
      ...nameFilter,
      // ...priceFilter,
      ...ratingFilter,
    })
      .populate('seller', 'seller.name seller.logo')
      // .sort(order);
    res.send(lostpets);
  })
);

lostpetRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Lostpet.find().distinct('category');
    res.send(categories);
  })
);

lostpetRouter.get(
  '/seller',
  isSeller,
  expressAsyncHandler(async (req, res) => {
    const lostpets = await Lostpet.find({ seller: req.user._id });
    res.send(lostpets);
  })
);

lostpetRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const lostpet = await Lostpet.findOne({ _id: req.params.id }).populate(
      'seller',
      '_id seller.name seller.logo seller.rating seller.numReviews'
    );
    if (lostpet) {
      res.send(lostpet);
    } else {
      res.status(404).send({ message: 'lostpet Not Found.' });
    }
  })
);
lostpetRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const lostpet = await Lostpet.findById(req.params.id);
    if (lostpet) {
      const review = {
        name: req.body.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      lostpet.reviews.push(review);
      lostpet.numReviews = lostpet.reviews.length;
      lostpet.rating =
        lostpet.reviews.reduce((a, c) => c.rating + a, 0) /
        lostpet.reviews.length;
      const updatedLostpet = await lostpet.save();
      res.status(201).send({
        data: updatedLostpet.reviews[updatedLostpet.reviews.length - 1],
        message: 'Review saved successfully.',
      });
    } else {
      res.status(404).send({ message: 'lostpet Not Found' });
    }
  })
);
lostpetRouter.put(
  '/:id',
  isAuth,
  // isAdmin,
  isSeller,
  expressAsyncHandler(async (req, res) => {
    const lostpetId = req.params.id;
    const lostpet = await Lostpet.findById(lostpetId);
    if (lostpet) {
      lostpet.name = req.body.name;
      lostpet.image = req.body.image;
      lostpet.images = req.body.images;
      lostpet.category = req.body.category;
      lostpet.description = req.body.description;
      const updatedLostpet= await lostpet.save();
      if (updatedLostpet) {
        return res
          .status(200)
          .send({ message: 'lostpet Updated', data: updatedLostpet });
      }
    }
    return res.status(500).send({ message: ' Error in Updating Lostpet.' });
  })
);

lostpetRouter.delete(
  '/:id',
  isAuth,
  // isAdmin,
  isSeller,
  expressAsyncHandler(async (req, res) => {
    const deletedLostpet = await Lostpet.findById(req.params.id);
    if (deletedLostpet) {
      await deletedLostpet.remove();
      res.send({ message: 'Lostpet Deleted' });
    } else {
      res.send('Error in Deletion.');
    }
  })
);

lostpetRouter.post(
  '/',
  isAuth,
  isSeller,
  expressAsyncHandler(async (req, res) => {
    const lostpet = new Lostpet({
      name: 'sample name',
      seller: req.user._id,
      image: '/images/p1.jpg',
      category: 'sample category',
      description: 'sample description',
      rating: 0,
      numReviews: 0,
    });
    const createdLostpet = await lostpet.save();
    if (createdLostpet) {
      return res
        .status(201)
        .send({ message: 'lostpet Created', lostpet: createdLostpet});
    }
    return res.status(500).send({ message: 'Error in Creating Lostpet' });
  })
);

export default lostpetRouter;
