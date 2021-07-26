const express = require('express');
const router = express.Router();
const { Review } = require('../models/Review');

router.post('/saveReview', (req, res) => {
    
    const review = new Review(req.body)

    review.save((err, review) => {
        if(err) return res.status(400).json({ success: false, err })

        Review.find({ '_id': review._id })
            .populate('writer')
            .exec((err, result) => {
                if(err) return res.status(400).json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })
})

router.post('/getReviews', (req, res) => {

    Review.find({ 'productId': req.body.productId })
        .populate('writer')
        .exec((err, reviews) => {
            if(err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true, reviews })
        })
})

module.exports = router;