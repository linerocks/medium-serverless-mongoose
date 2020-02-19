const mongoose = require('mongoose')
const pick = require('lodash/pick')
const pickBy = require('lodash/pickBy')
const identity = require('lodash/identity')
const { DoctorModel } = require('../database/model/doctor')
const response = require('../libs/response')

let cachedDB = null

async function connectToDatabase (uri, options = {}) {
  if (!cachedDB) cachedDB = await mongoose.connect(uri)
}

export const handler = async (event, context) => {
  try {
    await connectToDatabase(process.env.MONGO_URI)

    const options = pickBy(pick(event.queryStringParameters, [
      'limit', 'page'
    ]), identity)
    if (!options.limit) options.limit = 10
    if (!options.page) options.page = 1

    const doctors = await DoctorModel.paginate({}, options)

    return response.success(doctors)
  } catch (e) {
    return response.fail({ message: e.message })
  }
}
