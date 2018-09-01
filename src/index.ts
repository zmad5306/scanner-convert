const speechService = require('ms-bing-speech-service');

const args = process.argv.slice(2);
const subscriptionKey = args[0];
const file = args[1];

(async function() {

  const options = {
    language: 'en-US',
    subscriptionKey: subscriptionKey
  };
	
  const recognizer = new speechService(options);
  await recognizer.start();

  recognizer.on('recognition', (e: any) => {
    if (e.RecognitionStatus === 'Success') console.log(e);
  });
  
  recognizer.on('turn.end', async (e: any) => {
    console.log('recognizer is finished.');
    
    await recognizer.stop();
    console.log('recognizer is stopped.');
  });
	
  await recognizer.sendFile(file);
  console.log('file sent.');

})();