
module.exports = { 

    getHeadlines: (req, res) => {
        res.status(200).send(headlines);       
    }
}