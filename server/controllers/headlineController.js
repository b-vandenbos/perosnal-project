
module.exports = { 

    getHeadlines: (req, res) => {
        let headlines = res;
        res.status(200).send(headlines);       
    }
};