const CustomAPIError = require('./custom-error')
const BadRequest = require('./bad-request')
const Unauthenticated = require('./unauthenticated')
const NotFound = require('./notFound')

module.exports = {
    CustomAPIError,
    BadRequest, 
    Unauthenticated,
    NotFound,
}