const mongoose = require('mongoose')
const pick = require('lodash/pick')
const pickBy = require('lodash/pickBy')
const identity = require('lodash/identity')
const { DateTime } = require('luxon')

const { DoctorModel } = require('../database/model/doctor')
const response = require('../libs/response')

let cachedDB = null

async function connectToDatabase (uri, options = {}) {
  if (!cachedDB) cachedDB = await mongoose.connect(uri)
}

export const handler = async (event, context) => {
  try {
    await connectToDatabase(process.env.MONGO_URI)

    const data = pickBy(pick(JSON.parse(event.body), [
      'firstName', 'middleName', 'lastName', 'credentials',
      'medicalSchools', 'gender', 'isActive', 'licenses',
      'birthDate'
    ]), identity)
    if (data.birthDate) data.birthDate = DateTime.fromFormat(data.birthDate, 'yyyy-MM-dd').toJSDate()

    const doctor = await DoctorModel.create(data)

    return response.success({
      message: 'Doctor had been created successfully.',
      data: doctor.toObject()
    })
  } catch (e) {
    return response.fail({ message: e.message })
  }
}
