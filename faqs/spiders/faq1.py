import scrapy


class Faq1Spider(scrapy.Spider):
    name = 'faq1'
    allowed_domains = ['https://www.cdc.gov/coronavirus/2019-ncov/faq.html']
    start_urls = ['https://www.cdc.gov/coronavirus/2019-ncov/faq.html/']

    def parse(self, response):
        for faq in range(len(response.css('div.card-header > button > span::text').extract())):
        	yield {
        		'question': response.css('div.card-header > button > span::text')[faq].extract(),
        		'answer': response.css('div.card-body > p')[faq].extract()
        	}
