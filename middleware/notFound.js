const notFound = (req, res) =>{
    res.status(404).send('Not found route!')
}

module.exports = notFound