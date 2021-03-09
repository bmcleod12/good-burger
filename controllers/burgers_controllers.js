const express = require('express');
const burger = require('../models/burger.js');

const router = express.Router();

router.get('/', (req, res) => {
    burger.selectAll((data) => {
        const hbsObject = {
            burgers: data,
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});        

router.post('/api/burgers', (req, res) => {
    burger.insertOne(['burger'], [req.body.burger], (result) => {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
      });
    });
    
router.put('/api/burgers/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;
    
    console.log('condition', condition);
    
    burger.updateOne(
        {
        burger: req.body.burger,
        },
        condition,
        (result) => {
        if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();
        }
    );
});

// Export routes for server.js to use.
module.exports = router;