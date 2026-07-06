// Dump the script library (with stable keys) for the voice-variant builder.
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'scripts_data.js'), 'utf8');
const {TOPICS, SCRIPTS, ADVISORS} = new Function(src + '\nreturn {TOPICS, SCRIPTS, ADVISORS};')();

// stable key: djb2-xor over identity fields, base36 (mirrored in scripts.html + builder)
function skey(s){
  let h = 5381;
  const str = s.title + '|' + s.adv + '|' + s.ch + '|' + s.t;
  for (const c of str) h = (((h * 33) | 0) ^ c.charCodeAt(0)) >>> 0;
  return h.toString(36);
}

const topicName = Object.fromEntries(TOPICS.map(t => [t[0], t[1]]));
const out = SCRIPTS.map(s => ({key: skey(s), t: s.t, topic: topicName[s.t] || s.t,
  ch: s.ch, adv: s.adv, title: s.title, body: s.body}));
const dupes = out.length - new Set(out.map(o => o.key)).size;
fs.writeFileSync(path.join(__dirname, 'scripts_dump.json'), JSON.stringify({
  advisors: ADVISORS, scripts: out}, null, 0));
console.log('dumped', out.length, 'scripts,', ADVISORS.length, 'advisors, dupe keys:', dupes);
