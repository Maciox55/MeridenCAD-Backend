const express = require('express');
const {getCalls,getActiveCalls,getClosedCalls,getCallsOnDate,getActiveCallsOnDate,getClosedCallsOnDate} = require('../controllers/callcontroller');

const router = express.Router();
app = express();

router.route('/active').get(getActiveCalls);
router.route('/active/:date').get(getActiveCallsOnDate);

router.route('/closed').get(getClosedCalls);
router.route('/closed/:date').get(getClosedCallsOnDate);
router.route('/test/:date').get(getCallsOnDate);
router.route('/all').get(getCalls);



module.exports = router;