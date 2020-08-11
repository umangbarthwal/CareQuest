import scrapy


class Faq2Spider(scrapy.Spider):
    name = 'faq2'
    allowed_domains = ['https://www.fda.gov/emergency-preparedness-and-response/coronavirus-disease-2019-covid-19/covid-19-frequently-asked-questions']
    start_urls = ['https://www.fda.gov/emergency-preparedness-and-response/coronavirus-disease-2019-covid-19/covid-19-frequently-asked-questions/']

    def parse(self, response):
        for faq in range(len(response.css('div.panel-heading > h2 > a::text').extract())):
        	yield {
        		'question': response.css('div.panel-heading > h2 > a::text')[faq].extract(),
        		'answer': response.css('div.panel-body > p')[faq].extract()
        	}
