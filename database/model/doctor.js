// database/model/doctor.js

import mongoose from 'mongoose'

import schema from '../schema/doctor'

export const DoctorModel = mongoose.model('Doctor', schema)
