docker run \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -e SLACK_WEB_HOOK=https://hooks.slack.com/services/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 \
    -d \
    --name slack-docker-events \
    slack-docker-events