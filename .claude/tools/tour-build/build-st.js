// Build the 6 student/group tours (2026-11-17). ORIGINAL ROUTES KEPT (owner rule). Owner answers 2026-11-17:
// group tour stays SHARED (other travellers, shared minibus); student tours = private for the student group, with a free place for
// the teacher/organiser on large groups and a lower price per person for bigger groups (no amounts); 5-day Tangier tour keeps the
// Marrakech -> Tangier last day (OSRM 568 km, 6.5 h), train offered as an option.
// Research (WebSearch; OpenSEO out of credits): student tours online (Desert Discovery Tours 3-day + 4-day student trips, TourRadar 3-day
// student tours from ~US$163-269, Local Adventures ~US$167, GoOverseas listings) all run Marrakech -> Dades/Todra -> Erg Chebbi camp ->
// long drive back (~554 km, ~9 h). Shared 3-day tours: group caps 14-18 (some up to 50), complaints = long day 3 (up to 12 h in the
// vehicle), early starts, shared spaces/privacy, cold winter nights. School trips: operators give 1 free teacher place per 8-10 students.
// Usage: node build-st.js <key|all>. Never re-run on a finished page (it wipes later edits).
const { build } = require('./st-lib.js');
const FLEET = '(<a href="../index.html#fleet">see our fleet</a>)';
const m = (km, bed, food) => [['car', km], ['bed', bed], ['food', food]];
const end = (km, where, food) => [['car', km], ['flag', where], ['food', food]];
const GM = (o, d, w) => `https://www.google.com/maps/dir/?api=1&amp;origin=${o}&amp;destination=${d}&amp;waypoints=${w.join('%7C')}&amp;travelmode=driving`;
const TEACHER = ['Do teachers or organisers travel free?', 'On large groups, one place is free for the teacher or organiser, and the price per person goes down as the group gets bigger. Tell us how many you are and we send your group price.'];
const SIZE = ['How many students can come?', 'From a few friends to a whole year group: a minivan for small groups, a Sprinter minibus for larger ones, and full-size coaches for 50 or more. Tell us your numbers when you ask.'];
const STD_LEFT = ['Private tour', 'Families', 'honeymoon', 'couple'];

const D1_ABH = (who) => ({ t: 'Marrakech → Tizi n’Tichka → Aït Ben Haddou → Dades Valley', p: `Early pick-up at your Marrakech hotel or riad (the nearest gate for medina riads), with the time confirmed on WhatsApp the day before. ${who} climbs into the High Atlas by the Tizi n’Tichka pass, walks up through the old ksar of Aït Ben Haddou, then drives through Ouarzazate and the Valley of Roses to the Dades Valley for dinner.`, meta: m('About 320 km, about 7 hours with stops', 'Night: Dades Valley', 'Dinner') });
const D2_MZ = (who) => ({ t: 'Dades Valley → Todra Gorge → Merzouga', p: `A walk between the high red walls of the Todra Gorge, then east through Erfoud and Rissani to the Erg Chebbi dunes. In the late afternoon ${who} rides camels into the dunes for the sunset (about an hour), then dinner, drums and a fire under the stars at the desert camp.`, meta: m('About 270 km, about 5 hours on the road', 'Night: Desert camp', 'Breakfast and dinner') });
const D3_BACK = { t: 'Merzouga → Draa Valley → Ouarzazate → Marrakech', p: 'Sunrise over the dunes, back by camel or 4×4 for breakfast, then the road home by Alnif, the palm groves of the Draa Valley and Ouarzazate, and over the High Atlas once more, with stops for lunch and photos. Back in Marrakech in the evening.', meta: end('About 560 km, about 9 to 10 hours with stops', 'Ends at your Marrakech hotel or riad', 'Breakfast') };
const LD_MZ3 = ['Tizi n’Tichka and Aït Ben Haddou', 'Dades Valley (night 1)', 'Todra Gorge', 'Merzouga desert camp (night 2)', 'Draa Valley', 'Marrakech'];

const C = {};
// ---------------------------------------------------------------- shared group tour
C.gp3 = {
  key: 'gp3', tpl: '3-days-desert-tour-marrakech-to-merzouga.html', out: '3-day-marrakech-merzouga-group-tour.html',
  name: '3-Day Marrakech to Merzouga Group Tour',
  title: '3-Day Shared Desert Tour: Marrakech to Merzouga | Group Tour',
  desc: 'Shared 3-day group tour from Marrakech to the Merzouga dunes and back: Aït Ben Haddou, the Dades Valley, the Todra Gorge, a sunset camel ride and a night in a desert camp, travelling with other travellers.',
  keywords: 'Morocco group tour, shared desert tour Marrakech, 3 day group tour Merzouga, Marrakech desert tour 3 days, Sahara tour for solo travellers, budget Morocco desert tour',
  hero: 'sahara-camel-group.jpg', heroAlt: 'A group riding camels in the Sahara dunes', crumb: '3-Day Merzouga Group Tour',
  h1: '3-Day Marrakech to Merzouga Group Tour', script: 'Share the Road to the Sahara', chip: 'Marrakech',
  facts: [['Duration', '3 days / 2 nights'], ['Start &amp; end', 'Marrakech'], ['Format', 'Shared group'], ['Departures', 'Ask for the next date']],
  overview: [
    'Three days from Marrakech to the Erg Chebbi dunes and back, sharing a minibus and a driver with other travellers. It is the simple way to see the Sahara on a smaller budget, and the easy way to meet people if you travel solo.',
    'You cross the High Atlas by the Tizi n’Tichka pass, walk up through Aït Ben Haddou, sleep in the Dades Valley and walk in the Todra Gorge before the group rides camels into the dunes for sunset, dinner and music by the fire.',
  ],
  kf1: 'Marrakech', kfType: 'Shared group tour', kf4: ['Desert night', 'Camp in the dunes'],
  highlights: ['Over the High Atlas by Tizi n’Tichka', 'The ksar of Aït Ben Haddou', 'A night in the Dades Valley', 'A walk in the Todra Gorge', 'Camels into the dunes at sunset', 'Dinner and drums at the camp', 'Sunrise over Erg Chebbi', 'New friends from around the world'],
  gallery: [['ait-ben-haddou-walk.jpg', 'Walking up through Aït Ben Haddou'], ['dades-red-valley.jpg', 'The red rock of the Dades Valley'], ['todra-gorge-bridge.jpg', 'A bridge in the Todra Gorge'], ['merzouga-camel-ride-group.jpg', 'A group camel ride in the Merzouga dunes'], ['camel-dune-ridge.jpg', 'Camels on a dune ridge'], ['desert-camp-lanterns.jpg', 'Lanterns at a desert camp']],
  days: [D1_ABH('The minibus'), D2_MZ('the group'), D3_BACK],
  incl: ['Shared A/C minibus', 'English-speaking driver', 'Pick-up and drop-off at your Marrakech hotel', '2 nights as in the table below', '2 breakfasts and 2 dinners', 'Camel ride at sunset', 'Fuel'],
  notIncl: ['Lunches and drinks', 'Entrance fees', 'Local guides at the sites', 'Tips', 'Travel insurance'],
  gtk: ['This is a suggestion: tell us your preferences', 'Group size depends on the date', 'Day 3 is long: stops for lunch and photos', 'Small bag for the camp; luggage stays in the minibus', 'Desert nights are cold in winter: bring warm layers', 'Bring cash: few card machines on the road'],
  costs: ['<b>Lunches:</b> about €10–15 each; you choose where', 'All sites on the route are free to visit', '<b>Tips:</b> up to you'],
  nights: [['First night: Dades Valley', 'dades'], ['Second night: Merzouga', 'camp']],
  accIntro: 'The group sleeps in a comfortable hotel in the Dades Valley and a camp in the dunes. Want more comfort? Choose a higher level:',
  great: ['Solo travellers who want company', 'Backpackers and friends on a budget', 'Anyone happy to share the road and the camp'],
  think: [
    'Prefer your own car and stops? The <a href="3-days-desert-tour-marrakech-to-merzouga.html">private 3-day Merzouga tour</a> runs the same route just for you',
    'Travelling on to Fes? The <a href="3-day-marrakech-to-fes-desert-tour.html">3-day Marrakech to Fes tour</a> ends there, with no drive back',
    'Only want a taste of the desert? Our <a href="agafay-desert-camel-ride-dinner-show.html">Agafay camel ride and dinner</a> is 40 minutes from Marrakech',
  ],
  reviews: ['Sarah L.', 'James T.', 'Aisha K.'],
  faq: [
    ['Who will I travel with?', 'Other travellers who booked the same dates: solo travellers, couples and friends from many countries. You share the minibus, the driver and the camp; ask us if you want your own room and tent.'],
    ['How big is the group?', 'It depends on the date and the vehicle, and we tell you when you book. Want only your own group of friends? The same route runs as a private tour.'],
    ['Can I join as a solo traveller?', 'Yes, solo travellers are very welcome, and many book this tour to meet people. Tell us if you want a room and a tent of your own.'],
    ['Is the camel ride included?', 'Yes: about an hour into the dunes at sunset, and back by camel or 4×4 in the morning. If you would rather not ride, a 4×4 can take you to the camp.'],
    ['Is the last day very long?', 'Yes, it is about 560 km and 9 to 10 hours with stops, back over the High Atlas. Prefer a shorter day? The 3-day Marrakech to Fes tour ends in Fes instead.'],
  ],
  customLead: 'The route is set for the group, but these extras can be added. Tell us when you book.',
  custom: ['A room and a tent of your own', 'Upgrade to a luxury camp with a bathroom in the tent', 'Quad biking in the Merzouga dunes', 'A <a href="marrakech-medina-guided-tour.html">medina tour</a> in Marrakech before or after', 'A <a href="marrakech-hammam-experience.html">hammam</a> after the long road', 'Special diets, on request'],
  bookLabel: 'Shared group tour', mbar: '3-Day Group Tour',
  bannerTitle: 'Prefer a Private Tour?', bannerSub: 'The same 3-day route, with your own car and driver-guide.',
  touristType: ['Solo travellers', 'Backpackers', 'Groups of friends'], ldStops: LD_MZ3,
  leftovers: ['Private tour', 'your own driver-guide', 'Your own car'],
};
// ---------------------------------------------------------------- 3-day student, Marrakech round trip
C.st3 = {
  key: 'st3', tpl: '3-days-desert-tour-marrakech-to-merzouga.html', out: '3-day-marrakech-merzouga-student-tour.html',
  name: '3-Day Morocco Student Tour from Marrakech to Merzouga',
  title: '3-Day Student Desert Tour: Marrakech to Merzouga | Private',
  desc: 'Private 3-day student tour from Marrakech to the Merzouga dunes and back for Erasmus, university and school groups: Aït Ben Haddou, the Dades Valley, the Todra Gorge, a sunset camel ride and a desert camp.',
  keywords: 'Morocco student tour, student trip to Morocco, Erasmus Morocco trip, student desert tour Marrakech, school trip Morocco Sahara, 3 day student tour Merzouga',
  hero: 'sahara-sunset-camp-friends.jpg', heroAlt: 'Friends watching the sunset at a desert camp', crumb: '3-Day Merzouga Student Tour',
  h1: '3-Day Morocco Student Tour to Merzouga', script: 'The Sahara for Your Student Group', chip: 'Marrakech',
  facts: [['Duration', '3 days / 2 nights'], ['Start &amp; end', 'Marrakech'], ['Format', 'Private, your group'], ['Departures', 'Every day, all year']],
  overview: [
    'Three days from Marrakech to the Erg Chebbi dunes and back, private for your student group: Erasmus friends, a university club, a school class or a study-abroad group. Your own minivan or minibus, your own driver-guide, and dates that fit your term.',
    'Over the High Atlas to Aït Ben Haddou, a night in the Dades Valley and a walk in the Todra Gorge, then camels into the dunes for sunset, dinner, drums and a fire under the stars. On large groups the teacher or organiser travels free, and the price per person goes down as the group grows.',
  ],
  kf1: 'Marrakech', kfType: 'Private student tour', kf4: ['Teacher', 'Free place, big groups'],
  highlights: ['Over the High Atlas by Tizi n’Tichka', 'Aït Ben Haddou, the film-set ksar', 'The Dades Valley and its kasbahs', 'The Todra Gorge on foot', 'A sunset camel ride', 'Drums and a fire at the camp', 'Sunrise over the dunes', 'Group photos on the dunes'],
  gallery: [['ait-ben-haddou-terrace.jpg', 'The ksar of Aït Ben Haddou from a terrace'], ['dades-valley-green.jpg', 'The green Dades Valley'], ['todra-gorge-walk.jpg', 'Walking in the Todra Gorge'], ['merzouga-camel-caravan-guide.jpg', 'A camel guide leading a caravan in the dunes'], ['sahara-camel-pink-sunset.jpg', 'Camels at a pink Sahara sunset'], ['desert-camp-aerial-circular.jpg', 'A desert camp seen from above']],
  days: [D1_ABH('Your group'), D2_MZ('your group'), D3_BACK],
  incl: [`Private A/C minivan or minibus ${FLEET}`, 'English-speaking driver-guide', 'Pick-up and drop-off in Marrakech', '2 nights as in the table below', '2 breakfasts and 2 dinners', 'Camel ride at sunset', 'Fuel'],
  notIncl: ['Lunches and drinks', 'Entrance fees', 'Local guides at the sites', 'Tips', 'Travel insurance'],
  gtk: ['This is a suggestion: tell us your preferences', 'Large groups: one free place for the teacher', 'Day 3 is long: stops for lunch and photos', 'Small bag for the camp; luggage stays in the vehicle', 'Desert nights are cold in winter: bring warm layers', 'Bring cash: few card machines on the road'],
  costs: ['<b>Lunches:</b> about €10–15 each; you choose where', 'All sites on the route are free to visit', '<b>Tips:</b> up to you'],
  nights: [['First night: Dades Valley', 'dades'], ['Second night: Merzouga', 'camp']],
  accIntro: 'Most student groups choose Standard. Tell us how you want to share the rooms and tents:',
  great: ['Erasmus and study-abroad students', 'University clubs and school classes', 'Friends with a long weekend'],
  think: [
    'Have one more day? The <a href="4-day-marrakech-merzouga-student-tour.html">4-day student tour</a> sleeps in Ouarzazate on the way back',
    'Moving on to Fes? The <a href="3-day-marrakech-to-fes-student-tour.html">3-day student tour to Fes</a> ends there, with no drive back',
    'Travelling solo? Our <a href="3-day-marrakech-merzouga-group-tour.html">shared group tour</a> takes the same road with other travellers',
  ],
  reviews: ['Sarah L.', 'Chloé D.', 'Lukas M.'],
  faq: [
    ['Who can book a student tour?', 'Any student group: Erasmus and exchange students, university clubs and associations, school classes with their teachers, or friends travelling together. The tour is private for your group, so nobody else joins.'],
    TEACHER, SIZE,
    ['Can we share rooms and tents?', 'Yes. Tell us how you want to split the group and we book shared rooms in the Dades Valley and shared tents at the camp. The camps in our table have a bathroom in each tent.'],
    ['Is the last day very long?', 'Yes, about 560 km and 9 to 10 hours with stops. With one more day, the 4-day student tour sleeps in Ouarzazate and gets back to Marrakech in the afternoon.'],
  ],
  customLead: 'It is your group’s private tour, so the plan moves with you. Tell us what you would like when you book.',
  custom: ['Sandboarding at sunrise', 'Quad biking in the Merzouga dunes', 'A night in Ouarzazate to split the drive back', 'A <a href="marrakech-medina-guided-tour.html">medina tour</a> for the group in Marrakech', 'Upgrade to a luxury camp', 'Vegetarian or other diets, on request'],
  bookLabel: 'Private student tour', mbar: '3-Day Student Tour',
  touristType: ['Students', 'Erasmus students', 'School groups'], ldStops: LD_MZ3, leftovers: STD_LEFT,
};
// ---------------------------------------------------------------- 3-day student, Marrakech -> Fes
C.stf3 = {
  key: 'stf3', tpl: '3-day-marrakech-to-fes-desert-tour.html', out: '3-day-marrakech-to-fes-student-tour.html',
  name: '3-Day Morocco Student Tour from Marrakech to Fes via Merzouga',
  title: '3-Day Student Tour: Marrakech to Fes via Merzouga | Private',
  desc: 'Private 3-day student tour from Marrakech to Fes by the Sahara: Aït Ben Haddou, the Dades Valley, the Todra Gorge, a sunset camel ride and a desert camp, then the Ziz Valley, the cedar forest and Ifrane to Fes.',
  keywords: 'student tour Marrakech to Fes, Morocco student trip, Erasmus desert tour, Marrakech to Fes via Merzouga, student Sahara tour, school trip Morocco',
  hero: 'merzouga-camel-ride-group.jpg', heroAlt: 'A group camel ride in the Merzouga dunes', crumb: '3-Day Student Tour: Marrakech to Fes',
  h1: '3-Day Morocco Student Tour to Fes', script: 'Through the Sahara, Ending in Fes', chip: 'Marrakech',
  facts: [['Duration', '3 days / 2 nights'], ['Route', 'Marrakech → Fes'], ['Format', 'Private, your group'], ['Departures', 'Every day, all year']],
  overview: [
    'Three days from Marrakech to Fes by way of the Sahara, private for your student group. No drive back to Marrakech: the route crosses the south, sleeps in the dunes and carries on north to Fes, ready for the next part of your trip.',
    'Aït Ben Haddou and the Dades Valley on day one, the Todra Gorge and a sunset camel ride on day two, then the Ziz Valley, the cedar forest of the Middle Atlas and Ifrane on the way to Fes. On large groups the teacher or organiser travels free, and bigger groups pay less per person.',
  ],
  kf1: 'Marrakech → Fes', kfType: 'Private student tour', kf4: ['Ends in', 'Fes, no drive back'],
  highlights: ['Over the High Atlas by Tizi n’Tichka', 'The ksar of Aït Ben Haddou', 'The Todra Gorge on foot', 'A sunset camel ride', 'Sandboarding on the dunes', 'The palm gorges of the Ziz Valley', 'Barbary macaques in the cedar forest', 'Ifrane, the mountain town'],
  gallery: [['ait-ben-haddou-village.jpg', 'The village of Aït Ben Haddou'], ['dades-valley-red-green.jpg', 'Red rock and green fields in the Dades Valley'], ['merzouga-camel-orange-dusk.jpg', 'Camels in the dunes at dusk'], ['sandboarding.jpg', 'Sandboarding down a dune'], ['ziz-valley-plateau.jpg', 'The Ziz Valley from the plateau'], ['desert-camp-lanterns.jpg', 'Lanterns at a desert camp']],
  days: [
    D1_ABH('Your group'), D2_MZ('your group'),
    { t: 'Merzouga → Ziz Valley → Midelt → Ifrane → Fes', p: 'Sunrise and sandboarding on the dunes, back by camel or 4×4 for breakfast, then north through the palm gorges of the Ziz Valley to Midelt for lunch. Over the Middle Atlas past the cedar forest near Azrou, home of the Barbary macaques, and through Ifrane to your Fes hotel in the evening.', meta: end('About 470 km, 8 to 9 hours with stops', 'Ends at your hotel in Fes', 'Breakfast') },
  ],
  incl: [`Private A/C minivan or minibus ${FLEET}`, 'English-speaking driver-guide', 'Pick-up in Marrakech, drop-off in Fes', '2 nights as in the table below', '2 breakfasts and 2 dinners', 'Camel ride and sandboarding', 'Fuel'],
  notIncl: ['Lunches and drinks', 'Entrance fees', 'Quad biking', 'Hotels in Marrakech and Fes', 'Tips', 'Travel insurance'],
  gtk: ['This is a suggestion: tell us your preferences', 'Large groups: one free place for the teacher', 'Don’t feed the macaques in the cedar forest', 'Small bag for the camp; luggage stays in the vehicle', 'Desert nights are cold in winter: bring warm layers', 'Bring cash: few card machines on the road'],
  costs: ['<b>Lunches:</b> about €10–15 each; you choose where', 'All sites on the route are free to visit', '<b>Tips:</b> up to you'],
  nights: [['First night: Dades Valley', 'dades'], ['Second night: Merzouga', 'camp']],
  accIntro: 'Most student groups choose Standard. Tell us how you want to share the rooms and tents:',
  great: ['Erasmus students heading north after Marrakech', 'Student groups flying out of Fes', 'Clubs who want the desert and the cities'],
  think: [
    'Going back to Marrakech? The <a href="3-day-marrakech-merzouga-student-tour.html">3-day student tour</a> returns there on day 3',
    'Want an easier pace? The <a href="4-day-marrakech-merzouga-student-tour.html">4-day student tour</a> adds a night on the way back',
    'Travelling solo? Our <a href="3-day-marrakech-merzouga-group-tour.html">shared group tour</a> mixes you with other travellers',
  ],
  reviews: ['James T.', 'Lukas M.', 'Aisha K.'],
  faq: [
    ['Why end in Fes and not Marrakech?', 'Because the road north from the desert is shorter than the road back, and Fes is where many student trips go next. You see the Middle Atlas on the way and skip a long drive back to Marrakech.'],
    ['How long is the last day?', 'About 470 km and 8 to 9 hours with stops: the Ziz Valley, lunch in Midelt, the cedar forest and Ifrane. The group reaches Fes in the evening.'],
    ['Will we see the monkeys?', 'Often, yes. Barbary macaques live in the cedar forest near Azrou and are usually close to the road. Look and take photos, but please don’t feed them.'],
    TEACHER,
    ['Can we share rooms and tents?', 'Yes. Tell us how you want to split the group and we book shared rooms in the Dades Valley and shared tents at the camp. The camps in our table have a bathroom in each tent.'],
  ],
  customLead: 'It is your group’s private tour, so the plan moves with you. Tell us what you would like when you book.',
  custom: ['A guided Fes medina day for the group', 'Quad biking in the Merzouga dunes', 'Drop-off at Fes airport or the train station', 'A night in Midelt to split the last day', 'Upgrade to a luxury camp', 'Vegetarian or other diets, on request'],
  bookLabel: 'Private student tour', mbar: '3-Day Student Tour to Fes',
  touristType: ['Students', 'Erasmus students', 'School groups'],
  ldStops: ['Tizi n’Tichka and Aït Ben Haddou', 'Dades Valley (night 1)', 'Todra Gorge', 'Merzouga desert camp (night 2)', 'Ziz Valley and Midelt', 'Cedar forest and Ifrane', 'Fes'], leftovers: STD_LEFT,
};
// ---------------------------------------------------------------- 4-day student, Marrakech round trip with a Ouarzazate night
C.st4 = {
  key: 'st4', tpl: '4-day-marrakech-to-fes-desert-tour-via-merzouga.html', out: '4-day-marrakech-merzouga-student-tour.html', newMap: true,
  name: '4-Day Morocco Student Tour from Marrakech to Merzouga',
  title: '4-Day Student Desert Tour from Marrakech to Merzouga | Private',
  desc: 'Private 4-day student tour from Marrakech to the Merzouga dunes and back: Aït Ben Haddou, the Dades Valley, the Todra Gorge, a sunset camel ride, a desert camp and a night in Ouarzazate to break the drive home.',
  keywords: '4 day student tour Morocco, student desert tour Marrakech, Erasmus Sahara trip, school trip Morocco desert, Marrakech to Merzouga student tour, Morocco student travel',
  hero: 'merzouga-camel-ride-dunes.jpg', heroAlt: 'A camel ride through the Merzouga dunes', crumb: '4-Day Merzouga Student Tour',
  h1: '4-Day Morocco Student Tour to Merzouga', script: 'The Sahara at an Easier Pace', chip: 'Marrakech',
  facts: [['Duration', '4 days / 3 nights'], ['Route', 'Marrakech round trip'], ['Format', 'Private, your group'], ['Departures', 'Every day, all year']],
  overview: [
    'Four days from Marrakech to the Erg Chebbi dunes and back, private for your student group. The extra night in Ouarzazate breaks the long road home, so the group gets back to Marrakech in the afternoon instead of late at night.',
    'Aït Ben Haddou, the Dades Valley and the Todra Gorge on the way out, a sunset camel ride and a night in the dunes, then the palm groves of the Draa Valley on the way back. On large groups the teacher or organiser travels free, and bigger groups pay less per person.',
  ],
  kf1: 'Marrakech round trip', kfType: 'Private student tour', kf4: ['Easier return', 'Night in Ouarzazate'],
  highlights: ['Over the High Atlas by Tizi n’Tichka', 'The ksar of Aït Ben Haddou', 'The Todra Gorge on foot', 'A sunset camel ride', 'Sandboarding on the dunes', 'Dinner and drums at the camp', 'The palm groves of the Draa Valley', 'An evening in Ouarzazate'],
  gallery: [['ait-ben-haddou-river-crossing.jpg', 'Crossing the river below Aït Ben Haddou'], ['dades-road.jpg', 'The winding road of the Dades Gorge'], ['todra-gorge-bridge.jpg', 'A bridge in the Todra Gorge'], ['merzouga-camel-caravan.jpg', 'A camel caravan in the Erg Chebbi dunes'], ['sandboarding.jpg', 'Sandboarding down a dune'], ['luxury-camp-night.jpg', 'A desert camp at night']],
  days: [
    D1_ABH('Your group'), D2_MZ('your group'),
    { t: 'Merzouga → Draa Valley → Ouarzazate', p: 'Sunrise and sandboarding on the dunes, back by camel or 4×4 for breakfast, then west by Alnif and N’Kob into the palm groves of the Draa Valley, with stops for lunch and photos. An evening in Ouarzazate, with time for the Taourirt Kasbah if the group arrives early.', meta: m('About 360 km, about 7 hours with stops', 'Night: Ouarzazate', 'Breakfast and dinner') },
    { t: 'Ouarzazate → Tizi n’Tichka → Marrakech', p: 'A relaxed morning, then back over the High Atlas by the Tizi n’Tichka pass, with viewpoint stops on the way down. Drop-off at your Marrakech hotel or riad in the afternoon.', meta: end('About 200 km, about 4 hours with stops', 'Ends at your Marrakech hotel or riad', 'Breakfast') },
  ],
  incl: [`Private A/C minivan or minibus ${FLEET}`, 'English-speaking driver-guide', 'Pick-up and drop-off in Marrakech', '3 nights as in the table below', '3 breakfasts and 3 dinners', 'Camel ride and sandboarding', 'Fuel'],
  notIncl: ['Lunches and drinks', 'Entrance fees', 'Quad biking', 'Tips', 'Travel insurance'],
  gtk: ['This is a suggestion: tell us your preferences', 'Large groups: one free place for the teacher', 'Car-sick? Sit in front on the mountain bends', 'Small bag for the camp; luggage stays in the vehicle', 'Desert nights are cold in winter: bring warm layers', 'Bring cash: few card machines on the road'],
  costs: ['<b>Lunches:</b> about €10–15 each; you choose where', '<b>Taourirt Kasbah:</b> small fee, if you go in', 'All other sites are free', '<b>Tips:</b> up to you'],
  mapNote: 'Marrakech to the Sahara and back, about 1,150 km in 4 days.',
  mapLink: GM('Marrakech,Morocco', 'Marrakech,Morocco', ['Ait+Ben+Haddou,Morocco', 'Boumalne+Dades,Morocco', 'Tinghir,Morocco', 'Merzouga,Morocco', 'Zagora,Morocco', 'Ouarzazate,Morocco']),
  nights: [['1: Dades Valley', 'dades'], ['2: Desert camp', 'camp'], ['3: Ouarzazate', 'ouarzazate']],
  accIntro: 'Most student groups choose Standard. Tell us how you want to share the rooms and tents:',
  great: ['Student groups who want an easier pace', 'School classes who need a shorter last day', 'Friends with four days to spare'],
  think: [
    'Only have 3 days? The <a href="3-day-marrakech-merzouga-student-tour.html">3-day student tour</a> keeps the camp night and drives back on day 3',
    'Moving on to Fes? The <a href="3-day-marrakech-to-fes-student-tour.html">3-day student tour to Fes</a> ends there, with no drive back',
    'Want a whole day in the dunes? The <a href="5-day-morocco-student-desert-tour-marrakech.html">5-day student tour</a> adds a 4×4 day around Merzouga',
  ],
  reviews: ['Sarah L.', 'Maria G.', 'Lukas M.'],
  faq: [
    ['Why a night in Ouarzazate?', 'It splits the long road from the desert to Marrakech in two. Day 3 crosses the Draa Valley at an easy pace, and day 4 is a short drive over the High Atlas, back in the afternoon.'],
    TEACHER, SIZE,
    ['What is the desert camp like for a group?', 'A camp of Berber tents in the dunes, with dinner, drums and a fire for the whole group. Tell us how you want to share the tents; the camps in our table have a bathroom in each tent.'],
    ['What should students pack?', 'Layers for cold desert nights, a scarf for sun and sand, closed shoes for the gorge walk, a small bag for the camp night and some cash: card machines are few on the road.'],
  ],
  customLead: 'It is your group’s private tour, so the plan moves with you. Tell us what you would like when you book.',
  custom: ['Quad biking in the Merzouga dunes', 'The Atlas Film Studios in Ouarzazate', 'A <a href="marrakech-medina-guided-tour.html">medina tour</a> for the group in Marrakech', 'A <a href="agafay-desert-camel-ride-dinner-show.html">camel ride and dinner in Agafay</a> on your last night', 'Upgrade to a luxury camp', 'Vegetarian or other diets, on request'],
  bookLabel: 'Private student tour', mbar: '4-Day Student Tour',
  touristType: ['Students', 'Erasmus students', 'School groups'],
  ldStops: ['Tizi n’Tichka and Aït Ben Haddou', 'Dades Valley (night 1)', 'Todra Gorge', 'Merzouga desert camp (night 2)', 'Draa Valley', 'Ouarzazate (night 3)', 'Marrakech'], leftovers: [...STD_LEFT, 'Fes', 'Midelt', 'Ifrane'],
};
// ---------------------------------------------------------------- 5-day student, Marrakech airport round trip
C.st5m = {
  key: 'st5m', tpl: '6-day-morocco-family-tour-marrakech-merzouga.html', out: '5-day-morocco-student-desert-tour-marrakech.html', newMap: true,
  name: '5-Day Morocco Student Desert Tour from Marrakech',
  title: '5-Day Student Desert Tour from Marrakech | Airport to Sahara',
  desc: 'Private 5-day student desert tour from Marrakech airport: a night in Marrakech, the High Atlas to the Merzouga dunes, a sunset camel ride and a desert camp, a 4×4 day around Erg Chebbi, and both airport transfers.',
  keywords: '5 day student tour Morocco, student desert tour Marrakech, school trip Morocco Sahara, Erasmus Morocco trip, Marrakech airport desert tour, student group Merzouga',
  hero: 'desert-acacia-camels.jpg', heroAlt: 'Camels by an acacia tree in the Sahara', crumb: '5-Day Student Desert Tour from Marrakech',
  h1: '5-Day Morocco Student Desert Tour', script: 'From the Airport to the Dunes', chip: 'Marrakech',
  facts: [['Duration', '5 days / 4 nights'], ['Route', 'Marrakech airport'], ['Format', 'Private, your group'], ['Departures', 'Every day, all year']],
  overview: [
    'Five days from Marrakech airport and back, private for your student group, with every transfer arranged. A first night in Marrakech after the flight, two nights by the Erg Chebbi dunes and a last night in Marrakech before you fly home.',
    'The heart of the trip is a whole day in the desert: sunrise on the dunes, a 4×4 tour to the Gnawa musicians of Khamlia and a nomad family, and time for sandboarding. On large groups the teacher or organiser travels free, and bigger groups pay less per person.',
  ],
  kf1: 'Marrakech airport', kfType: 'Private student tour', kf4: ['Airport', 'Both transfers included'],
  highlights: ['An evening at Jemaa el-Fnaa', 'Over the High Atlas by Tizi n’Tichka', 'A sunset camel ride', 'A night in a desert camp', 'Sunrise over Erg Chebbi', 'Gnawa music in Khamlia', 'Tea with a nomad family', 'Sandboarding on the dunes'],
  gallery: [['jemaa-el-fna-dusk-stalls.jpg', 'Food stalls on Jemaa el-Fnaa at dusk'], ['merzouga-white-camel.jpg', 'A white camel in the Merzouga dunes'], ['khamlia-gnawa.jpg', 'Gnawa musicians in Khamlia'], ['nomad-tent-tea.jpg', 'Tea in a nomad tent'], ['sandboarding.jpg', 'Sandboarding down a dune'], ['desert-camp-dunes.jpg', 'A desert camp in the dunes']],
  days: [
    { t: 'Marrakech airport → your hotel', p: 'Your driver meets the group in arrivals with a name sign, whatever time the flight lands, and drives you to your Marrakech hotel. Free time after the flight; if you land early, a first walk to Jemaa el-Fnaa for the evening stalls.', meta: [['car', 'About 15 km'], ['bed', 'Night: Marrakech'], ['food', 'No meals today']] },
    { t: 'Marrakech → High Atlas → Ouarzazate → Merzouga', p: 'An early start over the High Atlas by the Tizi n’Tichka pass, then through Ouarzazate and the Dades and Todra valleys to Erfoud and the Erg Chebbi dunes, with stops for lunch and photos. Camels into the dunes at sunset (if the road runs late, a 4×4 takes the group to camp), then dinner and music at the camp.', meta: m('About 560 km, 9 to 10 hours with stops', 'Night: Desert camp', 'Breakfast and dinner') },
    { t: 'Merzouga: a day in the desert by 4×4', p: 'Sunrise over the dunes, then a 4×4 day around Erg Chebbi: Gnawa music in the village of Khamlia, tea with a nomad family and free time for sandboarding and photos. Quad bikes can be added. Night in a Merzouga hotel.', meta: m('4×4 day around the dunes', 'Night: Merzouga hotel', 'Breakfast') },
    { t: 'Merzouga → Rissani → Draa Valley → Marrakech', p: 'Through the old market town of Rissani, then west by the palm groves of the Draa Valley and Ouarzazate, and back over the High Atlas, with stops for lunch and photos. Evening in Marrakech.', meta: m('About 560 km, 9 to 10 hours with stops', 'Night: Marrakech', 'Breakfast') },
    { t: 'Marrakech → airport', p: 'A free morning, depending on your flight: a last walk in the medina or time at the hotel. The driver takes the group to Marrakech airport at the agreed time.', meta: end('About 15 km', 'Ends at Marrakech airport', 'Breakfast') },
  ],
  incl: [`Private A/C minivan or minibus ${FLEET}`, 'English-speaking driver-guide', 'Marrakech airport pick-up and drop-off', '4 nights as in the table below', '4 breakfasts and 1 dinner at the camp', 'Camel ride and sandboarding', '4×4 day around Merzouga', 'Fuel, tolls and parking'],
  notIncl: ['Flights', 'Lunches, drinks, other dinners', 'Entrance fees', 'Quad bikes', 'Tips', 'Travel insurance'],
  gtk: ['This is a suggestion: tell us your preferences', 'Large groups: one free place for the teacher', 'Days 2 and 4 are long: plenty of stops', 'Small bag for the camp; luggage stays in the vehicle', 'Desert nights are cold in winter: bring warm layers', 'Bring cash: few card machines on the road'],
  costs: ['<b>Lunches:</b> about €10–15 each; you choose where', '<b>Quad bikes in Merzouga:</b> priced before you ride, if you want them', 'All sites on the route are free to visit', '<b>Tips:</b> up to you'],
  mapNote: 'Marrakech to the Sahara and back, about 1,150 km in 5 days.',
  mapLink: GM('Marrakech,Morocco', 'Marrakech,Morocco', ['Ouarzazate,Morocco', 'Boumalne+Dades,Morocco', 'Tinghir,Morocco', 'Merzouga,Morocco', 'Rissani,Morocco', 'Zagora,Morocco']),
  nights: [['1: Marra&shy;kech', 'marrakech'], ['2: Desert camp', 'camp'], ['3: Merzouga', 'merz'], ['4: Marra&shy;kech', 'marrakech']],
  accIntro: 'Most student groups choose Standard. Tell us how you want to share the rooms and tents:',
  great: ['Student groups flying in and out of Marrakech', 'Schools that want every transfer arranged', 'Groups who want a whole day in the dunes'],
  think: [
    'Long road days worry you? The <a href="4-day-marrakech-merzouga-student-tour.html">4-day student tour</a> sleeps in the Dades Valley and Ouarzazate',
    'Already in Marrakech? The <a href="3-day-marrakech-merzouga-student-tour.html">3-day student tour</a> starts at your hotel',
    'Arriving in Tangier? The <a href="5-day-morocco-student-tour-from-tangier.html">5-day student tour from Tangier</a> crosses the north and the Sahara',
  ],
  reviews: ['Lukas M.', 'Aisha K.', 'James T.'],
  faq: [
    ['What if our flight lands late?', 'No problem: we follow your flight and the driver waits in arrivals with a name sign, at any hour. Day 1 has no fixed plan, so a late landing changes nothing.'],
    ['How long are the road days?', 'Days 2 and 4 are about 560 km and 9 to 10 hours with stops, over the High Atlas. Prefer shorter days? The 4-day student tour sleeps on the way.'],
    ['Will we make the sunset camel ride?', 'We leave Marrakech early to reach the dunes for the sunset. If the road runs late, a 4×4 takes the group to the camp, and the dunes are yours again at sunrise.'],
    TEACHER,
    ['Can students try quad biking?', 'Yes, quads can be added on the desert day: drivers from 16, with a helmet and a guide. The price is agreed before anyone rides.'],
  ],
  customLead: 'It is your group’s private tour, so the plan moves with you. Tell us what you would like when you book.',
  custom: ['A <a href="marrakech-medina-guided-tour.html">medina tour</a> on day 1 or 5', 'A <a href="marrakech-food-tour.html">food tour</a> on the last evening', 'Quad biking in the Merzouga dunes', 'A night at Aït Ben Haddou on the way back', 'Upgrade to a luxury camp', 'Vegetarian or other diets, on request'],
  bookLabel: 'Private student tour', mbar: '5-Day Student Desert Tour',
  touristType: ['Students', 'School groups', 'University groups'],
  ldStops: ['Marrakech (night 1)', 'Tizi n’Tichka', 'Merzouga desert camp (night 2)', '4×4 day: Khamlia and a nomad family (night 3)', 'Rissani and the Draa Valley', 'Marrakech (night 4)'], leftovers: [...STD_LEFT, 'Erfoud hotel', 'Ziz'],
};
// ---------------------------------------------------------------- 5-day student, Tangier round trip
C.st5t = {
  key: 'st5t', tpl: '5-day-morocco-tour-tangier-to-marrakech.html', out: '5-day-morocco-student-tour-from-tangier.html', newMap: true,
  name: '5-Day Morocco Student Tour from Tangier',
  title: '5-Day Student Tour from Tangier: Fes, Sahara &amp; Marrakech',
  desc: 'Private 5-day student tour from Tangier port: Chefchaouen and Fes, the Middle Atlas to the Merzouga dunes, a sunset camel ride and a desert camp, the Todra Gorge, Dades and Aït Ben Haddou to Marrakech, then back to Tangier.',
  keywords: 'student tour from Tangier, Morocco student trip from Spain, Erasmus Morocco tour, Tangier to Merzouga student tour, school trip Morocco Tangier, student Sahara tour',
  hero: 'merzouga-blue-dress-camel.jpg', heroAlt: 'A camel ride in the Merzouga dunes', crumb: '5-Day Student Tour from Tangier',
  h1: '5-Day Morocco Student Tour from Tangier', script: 'The North, the Sahara and Back', chip: 'Tangier',
  facts: [['Duration', '5 days / 4 nights'], ['Route', 'Tangier round trip'], ['Format', 'Private, your group'], ['Departures', 'Every day, all year']],
  overview: [
    'Five days from Tangier and back, private for your student group: the driver meets you off the ferry and drops you at the port at the end. Built for groups coming over from Spain who want the blue town, Fes, the Sahara and Marrakech in one short trip.',
    'Chefchaouen on the way to Fes, the cedar forest and the Ziz Valley to the Erg Chebbi dunes, a sunset camel ride and a night in the camp, then the Todra Gorge and Aït Ben Haddou to Marrakech. On large groups the teacher or organiser travels free, and bigger groups pay less per person.',
  ],
  kf1: 'Tangier round trip', kfType: 'Private student tour', kf4: ['Ferry', 'Met at Tangier port'],
  highlights: ['The blue lanes of Chefchaouen', 'Barbary macaques in the cedar forest', 'The palm gorges of the Ziz Valley', 'A sunset camel ride', 'A night in a desert camp', 'The Todra Gorge on foot', 'The ksar of Aït Ben Haddou', 'An evening in Marrakech'],
  gallery: [['chefchaouen-city.webp', 'The blue town of Chefchaouen'], ['ziz-valley-plateau.jpg', 'The Ziz Valley from the plateau'], ['sahara-camel-group.jpg', 'A group riding camels in the dunes'], ['todra-gorge-walk.jpg', 'Walking in the Todra Gorge'], ['ait-ben-haddou-kasbah.jpg', 'The kasbah of Aït Ben Haddou'], ['jemaa-el-fna-evening-aerial.jpg', 'Jemaa el-Fnaa in the evening']],
  days: [
    { t: 'Tangier port → Chefchaouen → Fes', p: 'Your driver meets the group at Tangier port with a name sign, timed to your ferry. Into the Rif to Chefchaouen for the blue lanes, the Outa el-Hammam square and lunch, then on through the countryside to your hotel in Fes for the evening.', meta: m('About 320 km, about 6 hours with stops', 'Night: Fes', 'No meals today') },
    { t: 'Fes → Ifrane → Midelt → Ziz Valley → Merzouga', p: 'South over the Middle Atlas by Ifrane and the cedar forest near Azrou, where Barbary macaques live, to Midelt for lunch. Down the palm gorges of the Ziz Valley to the Erg Chebbi dunes, camels into the dunes at sunset, then dinner and music at the camp.', meta: m('About 470 km, about 8 hours with stops', 'Night: Desert camp', 'Breakfast and dinner') },
    { t: 'Merzouga → Rissani → Todra Gorge → Dades Valley', p: 'Sunrise and sandboarding on the dunes, back by camel or 4×4, then the old market town of Rissani, Erfoud and Tinghir. A walk between the high walls of the Todra Gorge, then the Dades Valley for dinner.', meta: m('About 270 km, about 5 hours on the road', 'Night: Dades Valley', 'Breakfast and dinner') },
    { t: 'Dades → Ouarzazate → Aït Ben Haddou → Marrakech', p: 'West through the Valley of Roses and Ouarzazate to Aït Ben Haddou, to walk up through the old ksar, then over the High Atlas by the Tizi n’Tichka pass to Marrakech. Free evening at Jemaa el-Fnaa if the group has the energy.', meta: m('About 320 km, about 6 hours with stops', 'Night: Marrakech', 'Breakfast') },
    { t: 'Marrakech → Casablanca → Rabat → Tangier', p: 'An early start north on the motorway past Casablanca and Rabat, with stops for meals and rest, timed to your ferry or onward plans. Drop-off at Tangier port or another place in the city.', meta: end('About 570 km, about 7 hours with stops', 'Ends at Tangier port', 'Breakfast') },
  ],
  incl: [`Private A/C minivan or minibus ${FLEET}`, 'English-speaking driver-guide', 'Pick-up and drop-off at Tangier port', '4 nights as in the table below', '4 breakfasts and 2 dinners', 'Camel ride and sandboarding', 'Fuel, tolls and parking'],
  notIncl: ['Ferry tickets and flights', 'Lunches, drinks, other dinners', 'Entrance fees', 'Local city guides', 'Quad bikes', 'Tips', 'Travel insurance'],
  gtk: ['This is a suggestion: tell us your preferences', 'Large groups: one free place for the teacher', 'Send us your ferry times when you book', 'Small bag for the camp; luggage stays in the vehicle', 'Desert nights are cold in winter: bring warm layers', 'Bring cash: few card machines on the road'],
  costs: ['<b>Lunches:</b> about €10–15 each; you choose where', 'All sites on the route are free to visit', '<b>Tips:</b> up to you'],
  mapNote: 'Tangier to the Sahara, Marrakech and back, about 1,950 km in 5 days.',
  mapLink: GM('Tangier,Morocco', 'Tangier,Morocco', ['Chefchaouen,Morocco', 'Fes,Morocco', 'Merzouga,Morocco', 'Boumalne+Dades,Morocco', 'Ait+Ben+Haddou,Morocco', 'Marrakech,Morocco']),
  nights: [['1: Fes', 'fes'], ['2: Desert camp', 'camp'], ['3: Dades Valley', 'dades'], ['4: Marra&shy;kech', 'marrakech']],
  accIntro: 'Most student groups choose Standard. Tell us how you want to share the rooms and tents:',
  great: ['Student groups coming over from Spain', 'Erasmus students based in the north', 'School classes on a Spain and Morocco trip'],
  think: [
    'Not going back to Tangier? The <a href="5-day-morocco-tour-tangier-to-marrakech.html">5-day Tangier to Marrakech tour</a> ends in Marrakech',
    'Want more time in the north? The <a href="5-day-tangier-chefchaouen-fes-tour.html">5-day Tangier, Chefchaouen &amp; Fes tour</a> sleeps in all three',
    'Flying into Marrakech? The <a href="5-day-morocco-student-desert-tour-marrakech.html">5-day student desert tour</a> starts at the airport',
  ],
  reviews: ['Chloé D.', 'Lukas M.', 'Maria G.'],
  faq: [
    ['Can you meet us off the ferry?', 'Yes. Ferries from Tarifa arrive at the Tangier city port and ferries from Algeciras at Tanger Med; send us your crossing and the driver waits with a name sign. Tangier airport works too.'],
    ['Is the last day very long?', 'It is about 570 km on the motorway, around 7 hours with stops. If the group prefers, you can take the train back to Tangier instead, and we drop you at Marrakech station.'],
    ['How long do we have in Chefchaouen?', 'A few hours for the blue lanes, the Outa el-Hammam square and lunch, then the drive to Fes. Want more? A night in Chefchaouen can be added.'],
    TEACHER, SIZE,
  ],
  customLead: 'It is your group’s private tour, so the plan moves with you. Tell us what you would like when you book.',
  custom: ['A night in Chefchaouen', 'A guided Fes medina morning', 'Quad biking in the Merzouga dunes', 'The train back to Tangier instead of the drive', 'Upgrade to a luxury camp', 'Vegetarian or other diets, on request'],
  bookLabel: 'Private student tour', mbar: '5-Day Student Tour, Tangier',
  touristType: ['Students', 'Erasmus students', 'School groups'],
  ldStops: ['Tangier port', 'Chefchaouen', 'Fes (night 1)', 'Ifrane and the cedar forest', 'Merzouga desert camp (night 2)', 'Todra Gorge', 'Dades Valley (night 3)', 'Aït Ben Haddou', 'Marrakech (night 4)', 'Tangier'], leftovers: STD_LEFT,
};

const arg = process.argv[2];
for (const k of (arg === 'all' ? Object.keys(C) : [arg])) build(C[k]);
