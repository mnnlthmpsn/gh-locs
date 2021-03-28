import { Router } from "express";
import Region from "../models/Region";
import City from "../models/City";
import Suburb from "../models/Suburb";

const router = Router();
const errors = [];

// get requests
router.get("/", async (req, res) => {
 try {
     const regions = await Region.findAll({attributes: ['id', 'reg_desc'], order: [['reg_desc', 'ASC']]})
     res.render('index', {template: 'main', errors, regions})
 } catch (err) {
     errors.push(err.message)
     res.redirect('/')
 }
});

// get region details
router.get('/region/:id', async (req, res) => {
    try {
        // get cities for this region
        const { id } = req.params
        const cities = await City.findAll({
            attributes: ['id', 'city_desc'],
            where: {
                regionId: id
            }
        })
        const region = await Region.findByPk(id)
        res.render('index', {template: 'regionDetails', errors, cities, region})
    } catch (err) {
        errors.push(err)
        res.redirect('/')
    }
})

// get city details
router.get('/city/:id', async (req, res) => {
    try {
        // get suburbs for this city
        const {id} = req.params
        const suburbs = await Suburb.findAll({
            attributes: ['id', 'sub_desc'],
            where: {
                cityId: id
            }
        })
        const city = await City.findByPk(id)
        res.render('index', { template: 'cityDetails', errors, suburbs, city })
    } catch (err) {
        errors.push(err)
        res.redirect('/city/:id')
    }
})

// get add region form
router.get("/add/region", async (req, res) => {
    try {
        res.render('index', {template: 'addRegion', errors})
    } catch (err) {
        errors.push(err)
        res.redirect('/')
    }
})

// get add city form
router.get("/region/:id/city/add", async (req, res) => {
    const {id} = req.params
    try {
        res.render('index', {template: 'addCity', errors, regID: id})
    } catch (err) {
        errors.push(err)
        res.redirect('/')
    }
})

// get add suburb formo
router.get("/city/:id/suburb/add", async (req, res) => {
    const { id } = req.params
    try {
        res.render('index', {template: 'addSuburb', errors, cityID: id})
    } catch (err) {
        errors.push(err)
        res.redirect('/')
    }
})


// post requests
// add region
router.post("/add/region", async (req, res) => {
    try {
        const { description } = req.body
        // create region
        await Region.create({ reg_desc: description })

        // redirect to homepage
        res.redirect('/')
    } catch (err) {
        errors.push(err)
        res.redirect('/')
    }
})


// add city for region :id
router.post('/region/:id/city/add', async (req, res) => {
    try {
        // get regionid from params
        const { id } = req.params
        const {description} = req.body
        
        // add city with region id
        await City.create({ regionId: id, city_desc: description })

        // redirect to region details
        res.redirect(`/region/${id}`)
    } catch (err) {
        errors.push(err)
        res.redirect('/')
    }
})

// add suburb for city :id
router.post('/city/:id/suburb/add', async (req, res) => {
    try {
        // get city id
        const { id } = req.params
        const {description} = req.body

        await Suburb.create({ cityId: id, sub_desc: description })
        res.redirect(`/city/${id}`)
    } catch (err) {
        errors.push(err)
        res.redirect('/')
    }
})

export default router;

// delete Region
router.get('/region/:id/delete', async (req, res) => {
    try {
        const { id } = req.params
        await Region.destroy({
            where: {
                id: id
            }
        })
        res.redirect('/')
    } catch (err) {
        errors.push(err)
        res.redirect('/')
    }
})

// delete city
router.get('/city/:id/delete', async (req, res) => {
    try {
        const { id } = req.params
        await City.destroy({
            where: {
                id: id
            }
        })
        res.redirect('/')
    } catch (err) {
        errors.push(err)
        res.redirect('/')
    }
})

// delete Suburb
router.get('/suburb/:id/delete', async (req, res) => {
    try {
        const { id } = req.params
        await Suburb.destroy({
            where: {
                id: id
            }
        })
        res.redirect('/')
    } catch (err) {
        errors.push(err)
        res.redirect('/')
    }
})