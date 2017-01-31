var eventStream = require('docker-event-stream');
var Slack = require('slack-node');

//webhookUri = "https://hooks.slack.com/services/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";
webhookUri = process.env.webhook;

console.log("WebHook: " + webhookUri);
slack = new Slack();
slack.setWebhook(webhookUri);

eventStream(function(err, stream) {
  if (err) throw err;
  console.log('Connected!');
  stream.on('data', docker_event);
});

function docker_event(evt) {
  console.log(evt);
  if (evt.Type == 'container') {
    slack_notify(evt.Actor.Attributes.name + ' : ' + evt.Action);
  }
};

function slack_notify(text) {
  slack.webhook({
    username: "ArkhoBot",
    icon_emoji: ":whale:",
    text: text
  }, function(err, response) {
    console.log(response);
  });
};