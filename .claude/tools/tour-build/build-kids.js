// Builds blog/sahara-desert-with-kids.html (one-off; don't re-run on the finished page after hand edits).
// Shell (header, footer, scripts) = blog/luxury-vs-standard-desert-camp.html. Content = kids-main.html.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '../../..');
const shell = fs.readFileSync(path.join(root, 'blog/luxury-vs-standard-desert-camp.html'), 'utf8');
let main = fs.readFileSync(path.join(__dirname, 'kids-main.html'), 'utf8');

const url = 'https://moroccotourshub.com/blog/sahara-desert-with-kids.html';
const title = 'Sahara Desert with Kids: Family Guide to Merzouga &amp; Agafay';
const titleTxt = 'Sahara Desert with Kids: Family Guide to Merzouga & Agafay';
const desc = 'Taking kids to the Sahara? Find the right desert and trip length for their age, activity ages, the best months, the drive day by day and a packing list.';
const img = 'https://moroccotourshub.com/assets/images/merzouga-camel-ride-group.jpg';

const faqs = [
  ['What is the best age to take kids to the Sahara?', 'From about 6, children enjoy everything: their own camel, sandboarding and a buggy. Younger children can go too, on a slower private tour of 4 days or more, or to Agafay near Marrakech.'],
  ['Can we take a baby or toddler to the desert?', 'Yes. For babies and toddlers, a night in Agafay, 40 to 60 minutes from Marrakech, is the easy choice. Merzouga works on a private tour of 5 days or more, with child seats and stops whenever you need them.'],
  ['How old do children need to be to ride a camel?', 'From about 3, a child shares a camel with a parent, and the camel man leads it on foot. From about 6, most children ride their own camel, still led by the guide.'],
  ['Is the 3-day desert tour too much for children?', 'Often, yes. Its last day is 9 to 10 hours in the car back to Marrakech. With young children, take 4 days or more so no day is over about 6 hours.'],
  ['Is the Sahara safe for kids?', 'Yes, with the right trip. The roads to Merzouga are paved, the camels walk slowly and are led by hand, and your driver stays with you all trip. The real risks are sun, heat and cold nights, so pick the right months and pack well.'],
  ['When is the best time to visit the Sahara with kids?', 'March to May and September to November. Winter days are sunny but nights get close to freezing; from June to August the dunes pass 40 °C, too hot for young children.']
];
const plus = '<span class="hfaq-item__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span>';
const faqHtml = faqs.map(([q, a], i) => `          <details class="hfaq-item"${i === 0 ? ' open' : ''}>
            <summary><h3>${q}</h3>${plus}</summary>
            <div class="hfaq-item__a"><p>${a}</p></div>
          </details>`).join('\n');
main = main.replace('FAQ_ITEMS', faqHtml);

// CTA buttons copied from the shell's closing banner
const cta = shell.match(/<div class="hcta__actions">([\s\S]*?)<\/div>/)[1].trim();
main = main.replace('CTA_ACTIONS', cta);

const esc = s => s.replace(/"/g, '\\"');
const ldArticle = JSON.stringify({
  '@context': 'https://schema.org', '@type': 'Article', headline: "Sahara Desert with Kids: A Family Guide to Morocco's Dunes",
  description: desc, image: img, datePublished: '2026-11-23', dateModified: '2026-11-23',
  author: { '@type': 'Organization', name: 'Morocco Tours Hub' },
  publisher: { '@type': 'Organization', name: 'Morocco Tours Hub', logo: { '@type': 'ImageObject', url: 'https://moroccotourshub.com/assets/images/hero-desert-caravan.webp' } },
  mainEntityOfPage: url
});
const ldFaq = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const ldCrumb = JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moroccotourshub.com/' },
  { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://moroccotourshub.com/blog.html' },
  { '@type': 'ListItem', position: 3, name: 'Sahara Desert with Kids', item: url }] });

const travelAgency = shell.match(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"TravelAgency"[\s\S]*?<\/script>/)[0];
const headBits = shell.match(/<link rel="preconnect"[\s\S]*?<link rel="icon"[^>]*>/)[0];

const head = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${url}">
<link rel="alternate" hreflang="x-default" href="${url}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Morocco Tours Hub">
<meta property="og:title" content="${titleTxt}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${img}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${titleTxt}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${img}">
<link rel="preload" as="image" href="/assets/images/merzouga-camel-ride-group.jpg">
${headBits}
${travelAgency}
<script type="application/ld+json">${ldArticle}</script>
<script type="application/ld+json">${ldFaq}</script>
<script type="application/ld+json">${ldCrumb}</script>
</head>`;

const bodyStart = shell.indexOf('<body');
const mainStart = shell.indexOf('<main>');
const mainEnd = shell.indexOf('</main>') + '</main>'.length;
const headerPart = shell.slice(bodyStart, mainStart);
let tail = shell.slice(mainEnd);

const tabsJs = `<script>
(function(){var tabs=[].slice.call(document.querySelectorAll('.kd-finder__tabs [role=tab]'));
function show(t,focus){tabs.forEach(function(b){var on=b===t;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;document.getElementById(b.getAttribute('aria-controls')).hidden=!on;});if(focus)t.focus();}
tabs.forEach(function(b,i){b.addEventListener('click',function(){show(b);});b.addEventListener('keydown',function(e){var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(d){e.preventDefault();show(tabs[(i+d+tabs.length)%tabs.length],true);}});});
var box=document.querySelector('.kd-toc__box');if(box&&window.matchMedia('(max-width:1024px)').matches)box.open=false;
var links=[].slice.call(document.querySelectorAll('.kd-toc__box nav a'));if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('is-on',a.getAttribute('href')==='#'+e.target.id);});}});},{rootMargin:'-20% 0px -70% 0px'});links.forEach(function(a){var s=document.querySelector(a.getAttribute('href'));if(s)io.observe(s);});}})();
</script>
`;
tail = tail.replace('<script src="/assets/js/main.js" defer></script>', '<script src="/assets/js/main.js" defer></script>\n' + tabsJs);

fs.writeFileSync(path.join(root, 'blog/sahara-desert-with-kids.html'), head + '\n' + headerPart + main + tail);
console.log('written blog/sahara-desert-with-kids.html');
