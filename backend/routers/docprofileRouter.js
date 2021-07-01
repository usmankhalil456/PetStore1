import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Docprofile from '../models/docprofileModel.js';
// import { isAuth, isAdmin, isDoctor } from '../utils.js';
import { isAuth, isAdmin ,isDoctor} from '../utils.js';

const docprofileRouter = express.Router();

docprofileRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const name = req.query.name || '';
    const category = req.query.category || '';
     const doctor = req.query.doctor || '';

    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const categoryFilter = category ? { category } : {};
    const feesFilter =
      min && max
        ? {
            fees: { $gte: Number(min), $lte: Number(max) },
          }
        : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const doctorFilter = doctor ? { doctor } : {};
    const nameFilter = name
      ? {
          name: {
            $regex: name,
            $options: 'i',
          },
        }
      : {};
    const order = req.query.order
      ? req.query.order === 'lowest'
        ? { fees: 1 }
        : req.query.order === 'highest'
        ? { fees: -1 }
        : req.query.order === 'newest'
        ? { _id: -1 }
        : { rating: -1 }
      : { _id: -1 };
    const docprofiles = await Docprofile.find({
      ...doctorFilter,
      ...categoryFilter,
      ...nameFilter,
      ...feesFilter,
      ...ratingFilter,
    })
      .populate('doctor', 'doctor.name doctor.logo')
      .sort(order);
    res.send(docprofiles);
  })
);

docprofileRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Docprofile.find().distinct('category');
    res.send(categories);
  })
);

docprofileRouter.get(
  '/doctor',
  
  expressAsyncHandler(async (req, res) => {
    const docprofiles = await Docprofile.find({ doctor: req.user._id });
    res.send(docprofiles);
  })
);

docprofileRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const docprofile = await Docprofile.findOne({ _id: req.params.id }).populate(
      'doctor',
      '_id doctor.name doctor.logo doctor.rating doctor.numReviews'
    );
    if (docprofile) {
      res.send(docprofile);
    } else {
      res.status(404).send({ message: 'Docprofile Not Found.' });
    }
  })
);
docprofileRouter.post(
  '/:id/reviews',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const docprofile = await Docprofile.findById(req.params.id);
    if (docprofile) {
      const review = {
        name: req.body.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      docprofile.reviews.push(review);
      docprofile.numReviews = docprofile.reviews.length;
      docprofile.rating =
        docprofile.reviews.reduce((a, c) => c.rating + a, 0) /
        docprofile.reviews.length;
      const updatedDocprofile = await docprofile.save();
      res.status(201).send({
        data: updatedDocprofile.reviews[updatedDocprofile.reviews.length - 1],
        message: 'Review saved successfully.',
      });
    } else {
      res.status(404).send({ message: 'Docprofile Not Found' });
    }
  })
);
docprofileRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  
  expressAsyncHandler(async (req, res) => {
    const docprofileId = req.params.id;
    const docprofile = await Docprofile.findById(docprofileId);
    if (docprofile) {
      docprofile.name = req.body.name;
      docprofile.fees = req.body.fees;
      docprofile.image = req.body.image;
      docprofile.images = req.body.images;
      docprofile.experience = req.body.experience;
      docprofile.category = req.body.category;
      docprofile.countInStock = req.body.countInStock;
      docprofile.description = req.body.description;
      const updatedDocprofile = await docprofile.save();
      if (updatedDocprofile) {
        return res
          .status(200)
          .send({ message: 'Docprofile Updated', data: updatedDocprofile });
      }
    }
    return res.status(500).send({ message: ' Error in Updating Docprofile.' });
  })
);

docprofileRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  //isDoctor,
  
  expressAsyncHandler(async (req, res) => {
    const deletedDocprofile = await Docprofile.findById(req.params.id);
    if (deletedDocprofile) {
      await deletedDocprofile.remove();
      res.send({ message: 'Docprofile Deleted' });
    } else {
      res.send('Error in Deletion.');
    }
  })
);

docprofileRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const docprofile = new Docprofile({
      name: 'sample name',
      fees: 0,
      doctor: req.user._id,
      image: '/images/p1.jpg',
      experience: 'sample experience',
      category: 'sample category',
      countInStock: 0,
      description: 'sample description',
      rating: 0,
      numReviews: 0,
    });
    const createdDocprofile = await docprofile.save();
    if (createdDocprofile) {
      return res
        .status(201)
        .send({ message: 'Docprofile Created', docprofile: createdDocprofile });
    }
    return res.status(500).send({ message: 'Error in Creating Docprofile' });
  })
);

export default docprofileRouter;
