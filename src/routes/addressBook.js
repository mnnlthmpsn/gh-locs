import { Router } from "express";
import Region from '../models/Region'
import City from '../models/City'
import Suburb from '../models/Suburb'
import User from '../models/User'

const router = Router()

// get all contacts
router.get('/contacts', async (req, res) => {
    try {
        const contacts = await User.findAll()
        res.status(200).json(contacts)
    } catch (err) {
        res.status(500).send(err)
    }
})

// get all regions
router.get('/regions', async (req, res) => {
    try {
        const regions = await Region.findAll({
            attributes: ['id', 'reg_desc']
        })
        res.status(200).json(regions)
    } catch (err) {
        res.status(500).send(err)
    }
})

// get cities for a region
router.get('/:reg_id/cities', async (req, res) => {
    try {
        const { reg_id } = req.params

        const cities = await City.findAll({
            attributes: ['id', 'city_desc'],
            where: {
                regionId: reg_id
            }
        })
        res.status(200).json(cities)
    } catch (err) {
        res.status(500).send(err)
    }
})

// get suburbs for city
router.get('/:city_id/suburbs', async (req, res) => {
    try {
        const { city_id } = req.params

        const suburbs = await Suburb.findAll({
            attributes: ['id', 'sub_desc'],
            where: {
                cityId: city_id
            }
        })
        res.status(200).json(suburbs)
    } catch (err) {
        res.status(500).send(err)
    }
})

// add contact
router.post('/contact', async (req, res) => {
    try {
        const { firstname, lastname, phone, regionId, cityId, suburbId } = req.body
        await User.create({firstname, lastname, phone, regionId, cityId, suburbId})
        res.status(200).json("Success")
    } catch (err) {
        res.status(500).send(err)
    }
})

// get contact with id
router.get('/contact/:id', async (req, res) => {
    try {
        const { id } = req.params
        const contact = await User.findByPk(id)
        res.status(200).json(contact)
    } catch (err) {
        res.status(500).send(err)
    }
})

// updateContact
router.put('/contact/update/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { firstname, lastname, phone, regionId, cityId, suburbId } = req.body

        await User.update(
            {firstname, lastname, phone, regionId, cityId, suburbId},
            {where: { id: id }}
        )
        res.json(200).send('Success')
    } catch (err) {
        res.status(500).send(err)
    }
})

// deleteContact
router.delete('/contact/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        await User.destroy({
            where: {
                id: id
            }
        })
        console.log('done')
        return res.status(200).json("Contact Deleted")
    } catch (err) {
        console.log(err.message)
        res.status(500).send(err)
    }
})

export default router