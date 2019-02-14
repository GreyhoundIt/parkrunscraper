const puppeteer = require('puppeteer');

const test = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://www.parkrun.com/results/consolidatedclub/?clubNum=2117');

  const parkrunName = await page.evaluate(() =>
    Array.from(document.querySelectorAll('div.floatleft h2'))
    .map((parkrun) => ( '<h3>' + parkrun.innerText + '</h3>'
    ))
  );

  const table = await page.evaluate(() =>
  Array.from(document.querySelectorAll('div.floatleft table'))
    .map((parkrun) => parkrun.outerHTML )
  );


  var finishedOutput = parkrunName.map(function(e, i) {
    return [e, table[i]];
  });

  await browser.close();

  return finishedOutput;

};

export default test;
