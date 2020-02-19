const mongoose = require('mongoose')

const { DoctorModel } = require('../database/model/doctor')
const response = require('../libs/response')

let cachedDB = null

async function connectToDatabase (uri, options = {}) {
  if (!cachedDB) cachedDB = await mongoose.connect(uri)
}

export const handler = async (event, context) => {
  try {
    await connectToDatabase(process.env.MONGO_URI)

    const doctor = await DoctorModel.findById(event.pathParameters.id)
    if (!doctor) return response.badRequest({ message: 'Doctor with specified id is not found' })

    return response.success({
      data: doctor.toObject()
    })
  } catch (e) {
    return response.fail({ message: e.message })
  }
}
