
const axios = require('axios');
const cheerio = require('cheerio');
const html2json = require('html2json').html2json;
const json2html = require('html2json').json2html;



module.exports = class ScrapController {	
	static async getInfo(abtData,count) {
		return new Promise((resolve, reject) => {
			let url 
			if(count){
				url = `https://www.google.com/search?q=${abtData}&start=${count+'0'}`;
			}else{
				 url = `https://www.google.com/search?q=${abtData}`;
			}
			axios(url,{ headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/600.7.12 (KHTML, like Gecko) Version/8.0.7 Safari/600.7.12' }  } )
				.then(response => {
					const html = response.data;
					let $ = cheerio.load(html);
					 let searchRes = $(`#search`);
					 let search = searchRes
					 search = json2html(search);
					$ = cheerio.load(html);
					  searchRes = $(`a`);
				
					  let final = html2json(searchRes.toString()).child.filter(e=>(e.attr.onmousedown && !e.attr.href.includes('google')))
					  final = final.map(eachRes =>{
						  return eachRes.attr.href
					  })
					resolve({results:final,about: $('[role="heading"]>span>span').text()}); 
				})
				.catch(reject); 
		});
	}
}