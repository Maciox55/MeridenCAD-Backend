const express = require('express');
const {getCalls,getActiveCalls,getClosedCalls,getCallsOnDate} = require('../controllers/callcontroller');

const router = express.Router();
app = express();

router.route('/active').get(getActiveCalls);
router.route('/closed').get(getClosedCalls);
router.route('/test/:date').get(getCallsOnDate);
router.route('/all').get(getCalls);



module.exports = router;