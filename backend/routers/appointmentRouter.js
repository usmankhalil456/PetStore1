import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Appointment from '../models/appointmentModel.js'
import User from '../models/userModel.js';
// import { isAuth, isDoctor, isAdmin } from '../utils.js';
import { isAuth, isDoctor } from '../utils.js';
import Docprofile from '../models/docprofileModel.js'

const appointmentRouter = express.Router();

appointmentRouter.get(
  '/',
  isAuth,
  isDoctor,
  expressAsyncHandler(async (req, res) => {
    const doctor = req.query.doctor ? { doctor: req.query.doctor } : {};
    const appointments = await Appointment.find({ ...doctor })
      .populate('user', 'name')
      .populate('doctor', 'name');
    res.send(appointments);
  })
);
appointmentRouter.get(
  '/summary',
  isAuth,
  isDoctor,
  expressAsyncHandler(async (req, res) => {
    const appointments = await Appointment.aggregate([
      {
        $group: {
          _id: null,
          numAppointments: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyAppointments = await Appointment.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          appointments: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const docprofileCategories = await Docprofile.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, appointments, dailyAppointments, docprofileCategories });
  })
);

appointmentRouter.get(
  '/mine',
  isAuth,
  //isDoctor,
  expressAsyncHandler(async (req, res) => {
    const appointments = await Appointment.find({ user: req.user._id });
    res.send(appointments);
  })
);

appointmentRouter.get(
  '/:id',
  isAuth,
  isDoctor,
  expressAsyncHandler(async (req, res) => {
    const appointment = await Appointment.findOne({ _id: req.params.id }).populate(
      'user',
      'name email'
    );
    if (appointment) {
      res.send(appointment);
    } else {
      res.status(404).send('appointment Not Found.');
    }
  })
);

appointmentRouter.delete(
  '/:id',
  isAuth,
  isDoctor,
  expressAsyncHandler(async (req, res) => {
    const appointment = await Appointment.findOne({ _id: req.params.id });
    if (appointment) {
      const deletedAppointment= await appointment.remove();
      res.send(deletedAppointment);
    } else {
      res.status(404).send('appointment Not Found.');
    }
  })
);

appointmentRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (!req.body.appointmentItems.length) {
      res.status(400).send({ message: 'Cart is empty' });
    }
    if (
      !req.body.appointmentItems
        .map((item) => item.doctor)
        .every((val) => val === req.body.appointmentItems[0].doctor)
    ) {
      res.status(400).send({
        message: 'Multi doctor Error. Buy from one doctor at a time.',
      });
    }
    const newAppointment = new Appointment({
      appointmentItems: req.body.appointmentItems,
      doctor: req.body.appointmentItems[0].doctor,
      user: req.user._id,
      sAddress: req.body.sAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });
    const newAppointmentCreated = await newAppointment.save();
    res
      .status(201)
      .send({ message: 'New appointment Created', data: newAppointmentCreated });
  })
);

appointmentRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);
    if (appointment) {
      appointment.isPaid = true;
      appointment.paidAt = Date.now();
      appointment.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
      const updatedAppointment = await Appointment.save();
      res.send({ message: 'appointment Paid.', appointment: updatedAppointment });
    } else {
      res.status(404).send({ message: 'appointment not found.' });
    }
  })
);

appointmentRouter.put(
  '/:id/deliver',
  isAuth,
  isDoctor,
  expressAsyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);
    if (appointment) {
      appointment.isDelivered = true;
      appointment.deliveredAt = Date.now();

      const updatedAppointment = await appointment.save();
      res.send({ message: 'appointment Delivered.', appointment: updatedAppointment });
    } else {
      res.status(404).send({ message: 'appointment not found.' });
    }
  })
);

export default appointmentRouter;
