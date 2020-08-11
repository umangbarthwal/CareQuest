import scrapy


class Faq3Spider(scrapy.Spider):
    name = 'faq3'
    allowed_domains = ['https://www.un.org/en/coronavirus/covid-19-faqs']
    start_urls = ['https://www.un.org/en/coronavirus/covid-19-faqs/']

    def parse(self, response):
        for faq in range(len(response.css('div.panel-heading > h3 > a::text').extract())):
        	yield {
        		'question': response.css('div.panel-heading > h3 > a::text')[faq].extract(),
        		'answer': response.css('div.panel-body > p')[faq].extract()
        	}
