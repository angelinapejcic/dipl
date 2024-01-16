const { CronJob } = require ('cron');
const Product = require('../models/productsModel');
const { mongoose, Schema } = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');


//Tehnomedia
const scrapeDetailsAndSaveProduct = async (detailsLink) => {
    try {
        const detailsResponse = await axios.get(detailsLink);
        const details$ = cheerio.load(detailsResponse.data);
        const additionalInfo = details$('.accordion-content-sleeve').text().replace(/\s+/g, ' ').trim().replace(/([^\n])\n([^\n])/g, '$1\n$2');
        return additionalInfo;
    } catch (error) {
        console.error(`Error scraping details from ${detailsLink}: ${error.message}`);
        throw error;
    }
};
const job = new CronJob(
	'* * * * *', // cronTime
	scrapeTehnomedia, // onTick
	true, // onComplete
	true, // start
	'America/Los_Angeles' // timeZone
);


// const job = CronJob.from({
// 	cronTime: '*/10 * * * *',
// 	onTick: scrapeTehnomedia,
// 	start: false,
// 	timeZone: 'America/Los_Angeles'
// });
async function scrapeTehnomedia() {
    try {
        const response = await axios.get('https://www.tehnomedia.rs/it-uredjaji/laptop');
        const $ = cheerio.load(response.data);
        const productArray = [];

        const scrapePromises = $('.product-single').map(async (index, element) => {
            const store = 'Tehnomedia';
            const category = $(element).find('.product-data .product-category').text();
            const link = $(element).find('.product-data .product-link').text();
            const price = $(element).find('.product-data .product-price').text();
            const image = $(element).find('.product-image').find('img').attr('src');
            const detailsLink = $(element).find('.product-image').find('a').attr('href');

            try {
                const additionalInfo = await scrapeDetailsAndSaveProduct(detailsLink);

                productArray.push({
                    store, category, link, price, image, detailsLink, additionalInfo
                });

                const existingProduct = await Product.findOne({ link });
                if (existingProduct) {
                    existingProduct.additionalInfo = additionalInfo;
                    await existingProduct.save();
                } else {
                    const product = new Product({ store, category, link, price, image, detailsLink, additionalInfo });
                    await product.save();
                }
            } catch (error) {
                console.log('gg')
                // Handle error or log it
            }
        });

        await Promise.all(scrapePromises);

    } catch (error) {
        console.error(error);
    }
};


