const fs = require('fs');
try {
  const content = fs.readFileSync(
    'c:/Cyboring_Global/5_Ventures/sbu-legal-website/corporate-web/src/messages/es.json',
    'utf8'
  );
  JSON.parse(content);
  console.log('JSON is valid');
} catch (e) {
  console.error('JSON Error:', e.message);
}
