const puppeteer = require('puppeteer')

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('http://books.toscrape.com/');
    await page.waitFor(1000);

    const result = await page.evaluate(() => {
        let books = {titles:[], prices:[]}

        let titles =  document.querySelectorAll('h3 > a');
        let prices =  document.querySelectorAll('.price_color');

        titles.forEach(title => {
            books.titles.push(title.getAttribute('title'));
        });

        prices.forEach(price => {
            books.prices.push(price.innerText);
        });        

        return books;
    });

    browser.close();
    return result;
}

scrape().then((value) => {
    console.log(value);
})