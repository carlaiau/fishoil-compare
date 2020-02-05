import scrapy
import re

class QuotesSpider(scrapy.Spider):
    name = "iherb"

    start_urls = ['https://www.iherb.com/c/Omega-3-Fish-Oil?noi=48']
 

    def parse(self, response):
        links = response.css('.products .product-link::attr(href)').getall()
        for link in links:
            yield scrapy.Request(url=link, callback=self.scrape_products)
    
    def scrape_products(self, response):
        name = response.css('#product-summary-header h1::text').get()
        supplements_table = response.xpath('//div[@class="supplement-facts-container"]')
        serving_size = supplements_table.xpath('//td//strong[contains(text(), "Serving Size")]/parent::*').get().split("</strong>")[1]
        servings_per_container = supplements_table.xpath('//td//strong[contains(text(), "Per Container")]/parent::*').get().split("</strong>")[1].split("<")[0]
        dha = supplements_table.xpath('//td[contains(text(), "DHA")]/following-sibling::td[1]/text()').get()
        epa = supplements_table.xpath('//td[contains(text(), "EPA")]/following-sibling::td[1]/text()').get()

        yield {
            'name': name,
            'url': response.url,
            'servings_per_container':  re.sub('\D', '', servings_per_container),
            'serving_size': re.sub('\D', '', serving_size),
            'epa': epa,
            'dha': dha
        }
