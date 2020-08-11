#! /bin/bash
curl https://app.scrapinghub.com/api/v2/datasets/PNx04znuYbg/download?id=0 -o ./public/faq_dump/faq1.json -s
curl https://app.scrapinghub.com/api/v2/datasets/vUUrtEFg7wa/download?format=json -o ./public/faq_dump/faq2.json -s
curl https://app.scrapinghub.com/api/v2/datasets/KzknKppxi9F/download?format=json -o ./public/faq_dump/faq3.json -s
