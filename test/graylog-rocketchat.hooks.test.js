const fs = require('fs');
const path = require('path');

const scriptLoader = require('./script-loader');
const Script = scriptLoader(path.join(__dirname, '..', 'graylog-rocketchat.hooks.js'));


const getRequest = (filename) => {
    const src = fs.readFileSync(path.join(__dirname, 'resources', filename), 'utf8');
    let content = JSON.parse(src);
    return {request:{content: content}};
};

test('Handles dummy alert', () => {
    const response = new Script().process_incoming_request(getRequest('dummy-alert.json'));
    //console.log(response.content);
    expect(response.content.attachments[0].text).toContain('Dummy alert to test notifications');
});

test('Handles error alert', () => {
    const response = new Script().process_incoming_request(getRequest('error-alert.json'));
    const expected = [
        ':warning: *Alert*: Log level is error', 
        '*Message*: A global exception on URL http://www.example.com, headers: {Cookie=__cfduid=dd00f87ca1571f030cd86dc107ce0fbee1502342427; language=ro; JSESSIONID=example1rw0aif2vail73dck6kkzx1hk.example1; searches=1; gender=; birthyear=, CF', 
        '*Source*: www.example.com',
        '[Display complete message](https://graylog.example.com/messages/graylog_7/f7bc4d31-cf47-11e7-84b1-0242ac120004)'
    ];
    //console.log(response.content);
    expect(response.content.attachments[0].text.split('\n')).toEqual(expected);
});

test('Aggregates same messages in error', () => {
    const response = new Script().process_incoming_request(getRequest('multimessage-alert.json'));
    const expected = [
        ':warning: *Alert*: Errors on www.example.com',
        '*Message*: java.lang.NullPointerException',
        'URL: http://www.example.com',
        '*Source*: www.example.com',
        '[Display complete message](https://graylog.example.com/messages/graylog_7/d369a310-d0f5-11e7-84b1-0242ac120004), [#2](https://graylog.example.com/messages/graylog_7/d28117d1-d0f5-11e7-84b1-0242ac120004)'
    ];

    //console.log(response.content);

    expect(response.content.attachments[0].text.split('\n')).toEqual(expected);
});

test('Grayloag Oficial Payload Example', () => {
    const response = new Script().process_incoming_request(getRequest('oficial-payload-example.json'));
    const expected = [
        ':warning: *Alert*: Stream had 2 messages in the last 1 minutes with trigger condition more than 1 messages. (Current grace time: 1 minutes)',
        '*Message*: WARN: System is failing',
        '*Source*: 127.0.0.1',
        '[Display complete message](https://graylog.example.com/messages/graylog2_7/b7b08150-57a0-11e5-b2a2-d6b4cd83d1d5)',
        '-------------',
        '*Message*: ERROR: This is an example error message',
        '*Source*: 127.0.0.1',
        '[Display complete message](https://graylog.example.com/messages/graylog2_7/afd71342-57a0-11e5-b2a2-d6b4cd83d1d5)'
      ];  

    //console.log(response.content.attachments[0].text.split('\n'));
    expect(response.content.attachments[0].text.split('\n')).toEqual(expected);
    //console.log(response.content)
})