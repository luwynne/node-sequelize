const express = require('express');
const router = express.Router();
const db = require('../config/database')
const Gig = require('../models/Gig')

// get gig list
router.get('/', (req, res) => 
  Gig.findAll()
    .then(gigs => res.render('gigs', {
        gigs
      }))
    .catch(err => console.log(err)));



// display the form
router.get('/add', (req, res) => res.render('add'));    

// add a gig
router.post('/add', (req, res) => {
    
    let { title,technologies,budget,description,contact_email } = req.body;
    let errors = []

    if(!title){
      errors.push({text:'Please, add a title'})
    }

    if(!technologies){
      errors.push({text:'Please, add some technologies'})
    }

    if(!description){
      errors.push({text:'Please, add a description'})
    }

    if(!contact_email){
      errors.push({text:'Please, add a contact email'})
    }

    if(errors.length > 0){
        res.render('add',{
          errors,
          title,
          description,
          budget,
          technologies,
          contact_email
        })
        if(!budget){
          budget = 'Unknow'
        }else{
          budget = `$${budget}`
        }
        technologies = technologies.toLowerCase().replace(/, /g, ',');
    }else{
      //insert into table
      Gig.create({
        title,
        technologies,
        budget,
        description,
        contact_email
      }).then(gig => res.redirect('/gigs'))
      .catch(err => console.log(err));
    }

    
});



module.exports = router;
