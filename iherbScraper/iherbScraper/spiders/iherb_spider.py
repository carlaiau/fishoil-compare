import scrapy
import re

class QuotesSpider(scrapy.Spider):
    name = "iherb"
    start_urls = [
        'https://nz.iherb.com/c/Omega-3-Fish-Oil?noi=192',
        'https://nz.iherb.com/c/Omega-3-Fish-Oil?noi=192&p=2'
    ]
 

    def parse(self, response):
        links = response.css('.products .product-link::attr(href)').getall()

        for link in links:

            
            yield scrapy.Request(url=link, callback=self.scrape_products)
    
    def scrape_products(self, response):

        rating = ""
        reviews = ""

        name = response.css('#product-summary-header h1::text').get()
        if "oz" in name or "ackets" in name or "ummies" in name or "ml" in name or "hots" in name: # Dump the bottles
            return

        price = response.css("#product-price #price::text").get().split("$")[1].strip()
        image = response.css("#iherb-product-image::attr(src)").get()

        supplements_table = response.xpath('//div[@class="supplement-facts-container"]')
        serving_size = supplements_table.xpath('//td//strong[contains(text(), "Serving Size")]/parent::*').get()
        if serving_size != None:
            serving_size = serving_size.split("</strong>")[1]
        
        rating_string = response.css('#product-summary-header .rating .stars::attr(title)').get()
        if rating_string != None:
            rating = rating_string.split("/")[0]
            reviews = rating_string.split(" - ")[1].split(" ")[0]
        
        name_array = name.split(",")
        capsules_per_container = name_array[len(name_array) - 1]
        capsules_per_container = capsules_per_container.strip().split(" ")[0]

        dha = supplements_table.xpath('//td[contains(text(),"DHA")]/following-sibling::td[1]/text()').get()    
        epa = supplements_table.xpath('//td[contains(text(),"EPA")]/following-sibling::td[1]/text()').get()
        if epa == None and dha == None: 

            omega_keys = supplements_table.xpath('//td[contains(.,"DHA")]').get().split("<br>")
            omega_vals = supplements_table.xpath('//td[contains(.,"DHA")]/following-sibling::td[1]').get().split("<br>")
            for i in range(len(omega_keys)):
                if "DHA" in omega_keys[i]:
                    dha = omega_vals[i]
                if "EPA" in omega_keys[i]:
                    epa = omega_vals[i]

        epa = re.sub('\D', '', epa)
        dha = re.sub('\D', '', dha)
        capsules_per_container = re.sub('\D', '', capsules_per_container)
        serving_size = re.sub('\D', '', serving_size)

        if epa == "" or dha == "" or capsules_per_container == "" or serving_size == "":
            return

        yield {
            'name': name,
            'price': price,
            'image': image,
            'url': response.url,
            'capsules_per_container': capsules_per_container,
            'serving_size': serving_size,
            'epa': epa,
            'dha': dha,
            'rating': rating,
            'reviews': reviews
        }
