var eventStream = require('docker-event-stream');
var Slack = require('slack-node');

webhookUri = process.env.SLACK_WEB_HOOK;
dockerHost = process.env.DOCKER_HOST;

// Log
console.log("Slack Web Hook: " + webhookUri);
console.log("Docker Host: " + dockerHost);

// Init Slack
slack = new Slack();
slack.setWebhook(webhookUri);

// Stream Docker events
eventStream(function(err, stream) {
  if (err) throw err;
  console.log('Connected!');
  stream.on('data', docker_event);
});

// Event occurs
function docker_event(evt) {
  console.log('---------- DOCKER EVENT -----------');
  console.log(evt);
  if (evt.Type == 'container') {
    slack_notify(evt.Actor.Attributes.name + ' : ' + evt.Action);
  }
};

// Notify Slack
function slack_notify(text) { 
  slack.webhook({
    username: "ArkhoBot",
    icon_emoji: ":whale:",
    text: text
  }, function(err, response) {
    console.log('---------- SLACK RESPONSE -----------');
    console.log(response);
  });
};