import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setUserAgent('nestarapp1.5');
    await page.goto(url, { waitUntil: 'networkidle2' });

    const content = await page.content();
    await browser.close();

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(content);
  } catch (error) {
    res.status(500).json({ error: 'Error rendering page', details: error.message });
  }
}