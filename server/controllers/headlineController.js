
module.exports = { 

    updateHeadline: (req, res) => {
        let {num} = req.params;
        res.status(200).send(num);
    }
};