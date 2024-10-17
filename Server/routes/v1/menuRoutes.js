const express = require('express')
const router = express.Router()

router.get('/allMenu', )
router.get('/menu/:menuId',)

router.post('/addMenu',)


router.patch('update-Menu/:menuId',)
router.delete('delete-Menu/:menuId')

module.exports = { menuRoutes: router }