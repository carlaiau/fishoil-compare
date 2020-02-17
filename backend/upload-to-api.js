const axios = require('axios');
const fs = require("fs");


fs.readFile('final.json', 'utf8', (err, data) => {
    if (err) throw err;
    
    const oils = JSON.parse(data)

    max = 500
    oils.forEach( (oil, i) => {
        const {name, dha, epa, url, price,capsules_per_container, serving_size, image, reviews, rating} = oil
        if(i <= max){
            const dha_obj = {}
            dha_obj.caps_per_day = Math.ceil(10000 / dha * serving_size)
            dha_obj.days_per_bottle = Math.floor(capsules_per_container / dha_obj.caps_per_day)
            dha_obj.price_per_day = (price / dha_obj.days_per_bottle).toFixed(2)

            const epa_obj = {}
            epa_obj.caps_per_day = Math.ceil(10000 / epa * serving_size)
            epa_obj.days_per_bottle = Math.floor(capsules_per_container / epa_obj.caps_per_day)
            epa_obj.price_per_day = (price / epa_obj.days_per_bottle).toFixed(2)

            const combined = {}
            combined.caps_per_day = Math.ceil(10000 / (Number(dha) + Number(epa)) * serving_size)
            combined.days_per_bottle = Math.floor(capsules_per_container / combined.caps_per_day)
            combined.price_per_day = (price / combined.days_per_bottle).toFixed(2)

            axios.post('http://localhost:1337/oils', {
                Title: name,
                DHA: dha,
                EPA: epa,
                ServingSize: serving_size,
                CapsulesPerContainer: capsules_per_container,
                iherb_link: url,
                iherb_price: price,
                image: image,
                iherb_reviews: reviews,
                iherb_avg_rating: rating,
                DHA_caps_per_day: dha_obj.caps_per_day,
                DHA_days_per_bottle: dha_obj.days_per_bottle,
                DHA_price_per_day:  dha_obj.price_per_day,
                EPA_caps_per_day: epa_obj.caps_per_day,
                EPA_days_per_bottle: epa_obj.days_per_bottle,
                EPA_price_per_day:  epa_obj.price_per_day,
                COMBINED_caps_per_day: combined.caps_per_day,
                COMBINED_days_per_bottle: combined.days_per_bottle,
                COMBINED_price_per_day:  combined.price_per_day,
                hide: false
              })
              .then(function (response) {
                console.log("Posted!");
                console.log(response)
              })
              .catch(function (error) {
                console.log(error);
              });
        }
        
    
        
    })
})
