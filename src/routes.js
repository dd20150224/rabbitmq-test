const express = require('express')
const rabbitRoutes = require('./routes/rabbitRoutes')
const blogRoutes = require('./routes/blogRoutes')
const crmRoutes = require('./routes/crmRoutes')


const router = express.Router()

router.use('/rabbit', rabbitRoutes)
router.use('/blogs', blogRoutes)
router.use('/crm',  crmRoutes);

module.exports = router
