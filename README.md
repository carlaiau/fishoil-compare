# Fish Oil Comparison

There is a wide selection of fish oils on iHerb. I found it hard to decide which one to purchase. With the varying levels of omega 3 content, different serving sizes and servings per bottle, user ratings, and PCB & Mercury content this isn't a trivial task. 

This lead me to create a tool that allows for dynamic per day pricing based on your requirements, and different sorting methods. 

**Not bug free and with naivie assumptions** but this did lead me to switch from my previous regular Nordic Naturals purchase. I think it will be useful for someone else trying to find the balance between price, quality and guzzling 20 capsules a day.

This could / should be extended to 

- Encompass further data 
- Filtering (type of fish, country of origin, PCB, Mercury etc)
- Use same logic for different supplements.
- **The Big one:** Aggegate from multiple vendors.
- Add labdoor data

## How To Get this running locally
- Set up the local Scrapy docker install
- Create a JSON dump using the iherb Scraper
- Feed this to scrapy
- Run gatsby, pointing the gatsby-source-strapi.ApiUrl to your localhost docker

## Backend
Strapi, local docker
```
cd backend
docker-compose up
```
After initalizing the local docker instance, you will have to set the public permissions to allow reading of *oils*.

Once the docker has been configured upload the scraped oil file using
```
upload-to-api.js filename
```


## Client
Built in GatsbyJS, demo available at fish.carlaiau.com

For local development, set gatsby-source-strapi.ApiUrl to http://localhost:1337

For deployment I have been lazy. I have deployed the gatsby client on Netlify, and used a tunneling service to expose my local docker instance at build time.

## iHerb Scraper 
Using the Python Scrapy framework. https://scrapy.org/

To create JSON:
```
cd iherbScraper
scrapy crawl iherb -o output/dump.json
```
I have not worried about proxying to get USD pricing or anything complicated, this scraper will return your locale pricing if available.

## LabDoor Scraper
Written in Node / Cheerio. 

But wasn't actually used.

To create JSON:
```
cd labdoor-scraper
node scraper.js process input_filename output_filename [limit n]
```

# Notes
The backend could be skipped, and you could scrape straight to a JSON file, that was then consumed by Gatsby using https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-json

Strapi was used for added flexibility, this project was initially meant to be multiple vendor.