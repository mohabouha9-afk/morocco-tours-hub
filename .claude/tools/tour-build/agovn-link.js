// Adds the Agafay overnight camp (tours/agafay-desert-camp-overnight.html) to day-trips.html, destinations/agafay.html,
// sitemap.xml and the camel & dinner page. Run once after build-agovn.js (skips files that already have it).
const fs=require('fs');
const U='tours/agafay-desert-camp-overnight.html', NAME='Agafay Desert Camp Overnight';
let dt=fs.readFileSync('day-trips.html','utf8');
const src=dt.match(/<li id="dt-camel-dinner">[\s\S]*?<\/a><\/article><\/li>/)[0];
let c=src.replace('id="dt-camel-dinner"','id="dt-agafay-night"')
 .replace('tours/agafay-desert-camel-ride-dinner-show.html',U)
 .replace(/src="\/assets\/images\/agafay-sunset\.jpg" alt="[^"]*" width="800" height="600"/,'src="/assets/images/agafay-aerial.jpg" alt="A desert camp in the Agafay hills, with camels grazing beside it" width="800" height="600"')
 .replace('5–7 hours</span>','Overnight</span>')
 .replace('Agafay Desert Camel Ride & Dinner Show',NAME)
 .replace('Marrakech · 5 to 7 hours (afternoon and evening)','Marrakech · Overnight, back by late morning')
 .replace(/<p class="htour__desc">[^<]*/,'<p class="htour__desc">A sunset camel ride, dinner with music and a fire show, a night in your own tent and sunrise over the Atlas.')
 .replace('Sunset camel ride</span>','Your own tent with bathroom</span>')
 .replace('Moroccan dinner</span>','Dinner and breakfast</span>')
 .replace('Live music by the fire</span>','Sunrise over the Atlas</span>');
const spark=dt.match(/<li><a href="#dt-camel-dinner">(<svg[\s\S]*?<\/svg>)/)[1];
if(!dt.includes(U)){
  dt=dt.replace(src,src+'\n'+c);
  dt=dt.replace(/(<li><a href="#dt-camel-dinner">[\s\S]*?<\/a><\/li>)/,`$1<li><a href="#dt-agafay-night">${spark}<span>Agafay Night</span></a></li>`);
  dt=dt.replace(/("itemListElement":\[[^\n]*?)\]\}<\/script>/,(m,a)=>a+`,{"@type":"ListItem","position":16,"url":"https://moroccotourshub.com/${U}","name":"${NAME}"}]}</script>`);
  fs.writeFileSync('day-trips.html',dt); console.log('day-trips ok');
}
let ag=fs.readFileSync('destinations/agafay.html','utf8');
if(!ag.includes(U)){
  const camel=ag.match(/<li id="ag-camel">[\s\S]*?<\/a><\/article><\/li>/)[0];
  ag=ag.replace(camel,camel+'\n'+c.replace('id="dt-agafay-night"','id="ag-night"').split('href="tours/').join('href="../tours/'));
  ag=ag.replace(/(<li><a href="#ag-camel">[\s\S]*?<\/a><\/li>)/,`$1<li><a href="#ag-night">${spark}<span>Overnight Camp</span></a></li>`);
  const j=ag.match(/<script type="application\/ld\+json">(\{"@context":"https:\/\/schema.org","@type":"ItemList"[^\n]*?)<\/script>/);
  const o=JSON.parse(j[1]); o.itemListElement.splice(2,0,{"@type":"ListItem",position:3,url:'https://moroccotourshub.com/'+U,name:NAME}); o.itemListElement.forEach((x,i)=>x.position=i+1);
  ag=ag.replace(j[1],JSON.stringify(o));
  ag=ag.replace('Add a night in a tent to the <a class="sdh-link" href="../tours/agafay-desert-camel-ride-dinner-show.html">camel ride and dinner show</a> and you wake up to the sunrise over the hills; we drive you back to Marrakech in the morning.','Our <a class="sdh-link" href="../tours/agafay-desert-camp-overnight.html">Agafay desert camp overnight</a> adds a night in your own tent to the camel ride and dinner show: you wake up to the sunrise over the hills and we drive you back to Marrakech in the morning.');
  ag=ag.replace('Add a night in a tent to the camel ride and dinner show and you wake up to the sunrise over the hills; we drive you back to Marrakech in the morning.','Our Agafay desert camp overnight adds a night in your own tent to the camel ride and dinner show: you wake up to the sunrise over the hills and we drive you back to Marrakech in the morning.');
  fs.writeFileSync('destinations/agafay.html',ag); console.log('hub ok');
}
let sm=fs.readFileSync('sitemap.xml','utf8');
if(!sm.includes(U)){ sm=sm.replace(/(  <url><loc>https:\/\/moroccotourshub\.com\/tours\/agafay-desert-quad-biking\.html<\/loc>[^\n]*\n)/,`$1  <url><loc>https://moroccotourshub.com/${U}</loc><lastmod>2026-11-18</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>\n`); fs.writeFileSync('sitemap.xml',sm); console.log('sitemap ok'); }
let cd=fs.readFileSync('tours/agafay-desert-camel-ride-dinner-show.html','utf8');
if(!cd.includes('agafay-desert-camp-overnight.html">')){ cd=cd.replace('<span>Stay the night in a tent and wake up in the desert</span>','<span><a href="agafay-desert-camp-overnight.html">Stay the night in a tent</a> and wake up in the desert</span>'); fs.writeFileSync('tours/agafay-desert-camel-ride-dinner-show.html',cd); console.log('camel ok'); }
