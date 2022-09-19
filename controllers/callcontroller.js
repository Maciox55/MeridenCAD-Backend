const Call = require('../models/call');


// @desc Get all calls
// @route GET /api/v1/calls/all
// @access Public
exports.getCalls =  (req, res, next) => {
    Call.find().sort({end:1}).then(calls => {

        res.status(200).json({
            success: true,
            msg: 'Get all calls',
            calls
        });
    }).catch(err => {
        res.status(500).json({
            success: false,
            msg: 'Server error retrieving calls'
        });
    });
    
}

// @desc Get active calls
// @route GET /api/v1/calls/active
// @access Public
exports.getActiveCalls =  (req, res, next) => {
    Call.find({end:null,coordinates:{$ne:null}},{'_id':0,'__v':0}).sort({start:1}).then(calls => {

        res.status(200).json({
            success: true,
            msg: 'Get all active calls',
            calls
        });
    }).catch(err => {
        res.status(500).json({
            success: false,
            msg: 'Server error retrieving active calls'
        });
    });
    
}

// @desc Get closed calls
// @route GET /api/v1/calls/closed
// @access Public
exports.getClosedCalls =  (req, res, next) => {
    Call.find({end:{$ne: null}},{'_id':0,'__v':0}).sort({start:1}).then(calls => {

        res.status(200).json({
            success: true,
            msg: 'Get all closed calls',
            calls
        });
    }).catch(err => {
        res.status(500).json({
            success: false,
            msg: 'Server error retrieving closed calls'
        });
    });
    
}

// @desc Get calls on date
// @route GET /api/v1/calls/all/:date
// @access Public
exports.getCallsOnDate =  (req, res, next) => {

    var daystart = new Date(req.params.date);
    var dayend = new Date(daystart.getFullYear(), daystart.getMonth(), daystart.getDate()+1,daystart.getHours(),daystart.getMinutes(),daystart.getSeconds());  
    console.log(daystart);
    console.log(dayend);
    // var startOfToday = new Date(date.getFullYear(), date.getMonth(), date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds());  
    // console.log(startOfToday);
    Call.find({start:{$gte: daystart,$lt: dayend}},{'_id':0,'__v':0}).then(calls => {

        res.status(200).json({
            success: true,
            msg: 'Get all closed calls',
            calls
        });
    }).catch(err => {
        res.status(500).json({
            success: false,
            msg: 'Server error retrieving active calls'
        });
    });
    
}