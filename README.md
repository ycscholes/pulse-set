# pulse-set
A singleton for pulse set (interval set)

## Why
* Easy to manage all the intervals in one place
* It's more convenient to manage all the interval cache by name than id
* Use setTimeout instead of setInterval so can stop the interval only return false in the action
* Enable to catch the exception

## Usage
```javascript
import PS from 'pulse-set.js';
PS.start('pulse', 1000, () => {
        console.log('Trigger an action');
    }, 
    () => {
        console.log('error');
    }
);

PS.end('pulse');
```

## API
`PS.start(name, time, action, error) - Start and cache a pulse`
* `name` {string}  Pulse name
* `time` {int}  Pulse timestamp
* `action` {function}  Pulse action
* `error` {function}  Emit when exception occures in action running

`PS.end(name) - End and remove the pulse`
* `name` {string}  Pulse name
