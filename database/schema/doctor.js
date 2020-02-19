// database/schema/doctor.js

import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const doctor = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, default: null },
  lastName: { type: String, default: null },
  credentials: [{ type: String, required: true }],
  medicalSchools: [{ type: String, required: true }],
  gender: { type: String, enum: ['male', 'female'], default: null },
  isActive: { type: Boolean, default: false },
  licenses: [{ type: String, required: true }],
  birthDate: { type: Date, required: true }
}, { collation: 'doctor', timestamps: true })

doctor.plugin(mongoosePaginate)

export default doctor
