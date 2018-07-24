# Rocket.Chat webhook integration for Graylog webhook notifications

[![Build Status](https://travis-ci.org/jeanmorais/rocketchat-graylog-hook.svg?branch=master)](https://travis-ci.org/jeanmorais/rocketchat-graylog-hook)

## Overview

This project aims to provide an integration between RocketChat and Graylog, from a webhook.

## Installation

### Rocket.Chat
1. Login as admin user and go to:
Administration > Integrations > New Integration > Incoming WebHook

2. Set "Enabled" and "Script Enabled" to "`true`"

3. Set all channel, icons, etc. as you preference.

4. Paste contents of `graylog-rocketchat.hooks.js` into the Script field.

5. Copy WebHook URL as soon as you saved the integration and proceed to the configuration of webhook integration in Graylog.

More information about webhooks: https://rocket.chat/docs/administrator-guides/integrations

### Graylog

1. Login as admin user and go to:
Alerts > Manage Notifications > Add new notification > Select the stream > Select the notification type "HTTP Alarm Callback" >
Set a title for the alarm > Paste WebHook URL from Rocket.Chat

2. Click "test" to validate the integration

More information about HTTP alert notification: http://docs.graylog.org/en/2.4/pages/streams/alerts.html?highlight=alerts#http-alert-notification

## Screenshots

Example alert notification

![Example alert notificação](https://raw.githubusercontent.com/jeanmorais/rocketchat-graylog-hook/master/screenshots/screenshot1.PNG)
