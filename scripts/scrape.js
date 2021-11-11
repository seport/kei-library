const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const axios = require('axios').default;
const cheerio = require('cheerio');


async function main(url) {
  const response = await axios.get(url);
  const body = response.data;
  const $ = cheerio.load(body);
  // let sizes = [];
  let colors = [];
  // $('tr.FS2_additional_image_tableVariation_border th').each((i,header) => {
  //   const headerNode = $(header)
  //   const headerText = headerNode.text()
  //   sizes.push(headerText)
  // })
  // $('table.FS2_additional_image_tableVariation_table th + td').each((i, cell) => {
  //   const cellNode = $(cell)
  //   const cellText = cellNode.text()
  //   colors.push(cellText.split("/")[0])
  // })
  $('table.tbl tr td:first-child').each((i, cell) => {
    colors.push($(cell).text().split(")")[0] + ")")
  })
  const uniqueColors = [...new Set(colors)]
  const material = $($('table.list_spec tr:nth-child(1) td:nth-child(2)')[0]).text();
  const measurements = $($('table.list_spec tr:nth-child(2) td:nth-child(2)')[0]).text();
  const itemNumber = $($('table.list_spec tr:nth-child(3) td:nth-child(2)')[0]).text();
  const sizes = $($('table.list_spec tr:nth-child(4) td:nth-child(2)')[0]).text().split("/")
  const description = $($('p.description_text')[0]).text();
  const price = parseInt($($('span.gd_pc b')[0]).text().replace(/\D/g, ''))
  const name = $($('span.gd_title')[0]).text()
  const imageUrl = $($('li.slide img')[0]).attr().src
  const image = await axios.get(imageUrl, { responseType: 'arraybuffer'}).then(response => Buffer.from(response.data, 'binary').toString('base64'))

  const data = {
    name,
    itemNumber,
    description,
    price,
    material,
    measurements,
    sizes: {connectOrCreate: sizes.map(size => ({where: {name: size}, create: {name: size}}))},
    colors: {connectOrCreate: uniqueColors.map(color => ({where: {name: color}, create: {name: color}}))},
    image: {create: {data: image}}
  }

  console.log(data.name)
  const newItem = await prisma.item.create({
    data
  })
}

const getNewItems = async () => {
  // const response = await fetch("https://tokyokawaiilife.com/index.php?lang_id=en&genre_id=17&keyword=&sch_goods_tag=&act=&sortkey=&offset=90&tsuka_conv=USD");
  // const body = await response.text();
  // const $ = cheerio.load(body);
  // const promises = $('div.goodslist_box a').map((i, link) => {
  //   url = 'https://tokyokawaiilife.com/' + $(link).attr().href
  //   return main(url).catch(e => { throw e })
  // })

  const promises = Array.from(Array(1000).keys()).map((index) => {
    url = `https://tokyokawaiilife.com/goods_en_USD_${index + 2000}.html`
    return main(url).catch(e => { throw e })
  })

  Promise.allSettled(promises).then(async () => { await prisma.$disconnect })
}
getNewItems();

// main()
//   .catch(e => {
//     throw e
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })