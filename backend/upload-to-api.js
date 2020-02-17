const axios = require('axios');
const fs = require("fs");


fs.readFile('ready.json', 'utf8', (err, data) => {
    if (err) throw err;
    
    const oils = JSON.parse(data)

    max = 5
    oils.forEach( (oil, i) => {
        const {name, dha, epa, url, price,capsules_per_container, serving_size, image} = oil
        if(i <= max){
            axios.post('http://localhost:1337/oils', {
                Title: name,
                DHA: dha,
                EPA: epa,
                ServingSize: serving_size,
                CapsulesPerContainer: capsules_per_container,
                iherb_link: url,
                iherb_price: price,
                Image: image,
                //iherb_reviews: null,
                //iherb_avg_rating: null,
              })
              .then(function (response) {
                console.log("Posted!");
              })
              .catch(function (error) {
                console.log(error);
              });
        }
        
    
        
    })
})
    
//}

/*
  id: 1,
  Title: null,
  DHA: null,
  EPA: null,
  ServingSize: null,
  CapsulesPerContainer: null,
  iherb_link: null,
  iherb_price: null,
  amazon_link: null,
  amazon_price: null,
  iherb_reviews: null,
  iherb_avg_rating: null,
  amazon_reviews: null,
  amazon_avg_rating: null,
  created_at: '2020-02-17T04:02:25.713Z',
  updated_at: '2020-02-17T04:02:25.713Z',
  Image: null
*/

//axios.post('http://localhost:1337/oils').then(resp => {

    
//});