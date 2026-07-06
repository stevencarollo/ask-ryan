// Validate scripts_data.js: every topic has >=4 scripts per channel, all advisors present.
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'scripts_data.js'), 'utf8');
const fn = new Function(src + '\nreturn {TOPICS, SCRIPTS, ADVISORS};');
const {TOPICS, SCRIPTS, ADVISORS} = fn();

const counts = {};
for (const s of SCRIPTS) {
  counts[s.t] = counts[s.t] || {};
  counts[s.t][s.ch] = (counts[s.t][s.ch] || 0) + 1;
}
const bad = [];
for (const [tid] of TOPICS)
  for (const ch of ['call', 'vm', 'text', 'email'])
    if (((counts[tid] || {})[ch] || 0) < 4) bad.push(`${tid}/${ch}=${(counts[tid]||{})[ch]||0}`);

const advNames = new Set(ADVISORS.map(a => a.n));
const usedAdv = new Set(SCRIPTS.map(s => s.adv));
const unknown = [...usedAdv].filter(a => !advNames.has(a));

console.log('total scripts:', SCRIPTS.length, '| topics:', TOPICS.length, '| roster:', ADVISORS.length);
console.log('unique advisors used:', usedAdv.size);
if (unknown.length) console.log('ADVISOR NAME MISMATCH:', unknown.join(', '));
console.log(bad.length ? 'UNDER 4: ' + bad.join(', ') : 'ALL topics have >=4 per channel');
process.exit(bad.length || unknown.length ? 1 : 0);
