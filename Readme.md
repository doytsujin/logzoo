# ohlog

** right now it is not implemented %-) **

Simple logger zoo.

It generates different loggers that all use `console.log()` to output messages,
however each logger corresponds to some named part of your application (e.g.
'HTTP', 'Storage', 'Model') and have the same set of levels (e.g 'error', 'warn',
'info', 'debug').

## Example

```javascript
// this is app.js
const ohlog = require('ohlog')(
  'CORE, HTTP, STORAGE, Model',
  'error, warn, info, debug'
);

ohlog.setLogLevel('warn'); // no info and debug

const log = ohlog.get('core');

log.info('Ohlog looks fine: %j', ohlog); // skipped since log level
log.warn('Some useless warning'); // console.log('CORE [warn] Some useless warning');
```

```javascript
// this is http.js
const log = require('ohlog').get('http');

log.error('connection is not established!');// console.log('HTTP [error] connection is not established');
```
