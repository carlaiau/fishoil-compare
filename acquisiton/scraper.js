const cheerio = require('cheerio')
const fs = require('fs');
const axios = require('axios');

function generateList(outputFileName){
    axios.get('https://labdoor.com/rankings/fish-oil/quality')
    .then(res => {
        
        const $ = cheerio.load(res.data)
        results = []

        $('.content ul.categoryList li').each(function(i, el){
            results[i] = {
                title: $(el).find('.categoryListItemName').text().trim(),
                score: $(el).find('.categoryListItemScore').text().trim(),
                link: 'https://labdoor.com' + $(el).find('.categoryListItemLink').attr('href')
            }
        })

        
        fs.writeFile(outputFileName, JSON.stringify(results, null, 2), (err) => {
            if(err) return console.log(err);
            console.log(`The list was saved to ${outputFileName}!`);
        });
    });
}

function processList(input, output, limit = false){
    fs.readFile(input, (err, data) => {
        if (err) throw err;
        let oils = JSON.parse(data);
        
        let promises = []
            
        for(let i = 0; i < (limit && limit < oils.length ? limit : oils.length); i++){
            const getSinglePage = new Promise( (resolve) => {
                
                processSingle(oils[i].link).then( (result) => {
                    resolve( {...oils[i], ...result} )
                }).catch(() => {                    
                    resolve()
                })
            })
            promises.push(getSinglePage)
        }

        Promise.all(promises).then( (results) => {
            fs.writeFile(output, JSON.stringify(results, null, 2), (err) => {
                if(err) return console.log(err);
                console.log("The list was saved!");
            });
        })
        
    });
}
function processSingle(url){
    return new Promise( (resolve) => {
        axios.get(url)
        .then(response => {
            const $ = cheerio.load(response.data)
            info = {}
            $('ul.keyDataList li.keyDataItem').each( (i, el) => {
                key = $(el).find('.keyDataKey').text().trim()
                value = $(el).text().trim().replace(key, '').replace(/[^A-Za-z0-9\-\(\) .]/g, '')
                info[key.replace(/[ \-\/]/g, "_").toLowerCase()] = value
            })

            images = {}
            $('.flexCol.flexCenter img').each( (i, el) => { images[i] = $(el).attr('src'); })
            
            promises = []
            $('.buyNowWrapper a').each( (i, el) => {
                const getProductLink = new Promise( (resolveIn) => {
                    const provider = $(el).text().trim().replace(/[^A-Za-z0-9\-\(\).]/g, '')    
                    axios.get('https://labdoor.com' + $(el).attr('href')).then(response => { 
                        const url = response.request._header.match("Host: (.+)\r\n")[1] + response.request.path
                        resolveIn( { provider, url })
                    })
                    .catch( () => {
                        console.log("Provider Failure!\t\t" + $(el).attr('href'))
                        resolveIn({})
                    })
                })
                promises.push(getProductLink)
            })
            
            Promise.all(promises).then( (links) => {
                resolve({info, images, links})
            })
            .catch(() => {
                resolve({info, images})
            })
        })
        
    })
}

// Main thread. Gross
(() => {
    if(process.argv.length > 2){
        if(process.argv[2] == 'create' && process.argv[3] != "")
            generateList(process.argv[3])
        else if(process.argv[2] == 'process' && process.argv[3] && process.argv[4])
            processList(process.argv[3], process.argv[4], process.argv[5] ? process.argv[5] : '')
        else
            console.log("You're doing it wrong")
    }
    else{
        console.log(
            `Usage:
    node scraper.js create output_filename
    node scraper.js process input_filename output_filename [limit n]`
        )
    }
})();

