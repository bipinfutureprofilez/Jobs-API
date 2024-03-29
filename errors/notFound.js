const {StatusCodes} = require('http-status-codes')
const CostomAPIError = require('./custom-error')

class NotFound extends CostomAPIError{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFound