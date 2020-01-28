const cheerio = require('cheerio')
const fs = require('fs');
const axios = require('axios');

if(process.argv[2] == 'raw'){

    axios.get('https://labdoor.com/rankings/fish-oil/quality')
    .then(response => {
        console.log(response);
        fs.writeFile("raw.html", response.data, (err) => {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 
    })
    .catch(error => {
        console.log(error);
    });
}
else if(process.argv[2] == 'home'){
    fs.readFile('./output.html', 'utf8', (err, html) => {
        if (err) {
            throw err; 
        }       
        const $ = cheerio.load(html)

        results = []
        $('.content ul.categoryList li').each(function(i, el){
            
            results[i] = {
                title: $(el).find('.categoryListItemName').text().trim(),
                score: $(el).find('.categoryListItemScore').text().trim(),
                link: 'https://labdoor.com' + $(el).find('.categoryListItemLink').attr('href')
            }
        })

        fs.writeFile("list.json", JSON.stringify(results), (err) => {
            if(err) return console.log(err);
            console.log("The list was saved!");
        });
    });
}
else if(process.argv[2] == 'single'){
    fs.readFile('list.json', (err, data) => {
        if (err) throw err;
        let oils = JSON.parse(data);
        
        console.log(oils[0].link)

        // Quickly get just the single link to get the data
        axios.get(oils[0].link)
        .then(response => {
            fs.writeFile("test-0.html", response.data, (err) => {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            }); 


        })

    });

}


else if(process.argv[2] == 'test'){
    fs.readFile('./test-0.html', 'utf8', (err, html) => {
    if (err) {
        throw err; 
    }       
    const $ = cheerio.load(html)

    info = {}
    $('ul.keyDataList li.keyDataItem').each( (i, el) => {
        key = $(el).find('.keyDataKey').text().trim()
        value = $(el).text().trim().replace(key, '').replace(/[^A-Za-z0-9\-\(\) .]/g, '')
        info[key.replace(/[ \-\/]/g, "_").toLowerCase()] = value
    })

    images = {}
    $('.flexCol.flexCenter img').each( (i, el) => { images[i] = $(el).attr('src'); })
    

    
    links = {}
    
    promises = []
    $('.buyNowWrapper a').each( (i, el) => {
        const getProductLink = new Promise( (resolve) => {
            const provider = $(el).text().trim().replace(/[^A-Za-z0-9\-\(\).]/g, '')    
            axios.get('https://labdoor.com' + $(el).attr('href')).then(response => { 
                const url = response.request._header.match("Host: (.+)\r\n")[1] + response.request.path
                resolve( { provider, url })
            })
        })
        promises.push(getProductLink)
    })



    console.log("Info:", info)
    console.log("Images: ", images)
    Promise.all(promises).then( (links) => {
        console.log("links", links)
    })
    
    
});
}

else{
    console.log("Usage: node scrapper.js scrape | process")
}