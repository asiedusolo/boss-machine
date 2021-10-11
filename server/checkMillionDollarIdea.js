const checkMillionDollarIdea = (req, res, next) => {
    const weeklyRevenue = Number(req.body.weeklyRevenue)
    const numWeeks = Number(req.body.numWeeks)
    const ideasWorth = weeklyRevenue * numWeeks
    
    req.atLeastOneMillion = ideasWorth >= 1000000
    next()
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
