'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var PulseSet = function PulseSet() {
    this.set = [];
};

PulseSet.prototype = {
    /**
     * Start and cache a pulse
     * @param  {string} name  Pulse name
     * @param  {int} time   Pulse timestamp
     * @param  {function} action Pulse action
     * @param  {function} error  Emit when exception occures in action running
     */
    start: function start(name, time, action, error) {
        this.end(name);
        var self = this;
        var pulse = {
            name: name,
            time: time
        };
        var actionMethod = function actionMethod() {
            try {
                // if action return false then end the pulse
                if (action() === false) {
                    self.end(name);
                } else {
                    actionPulse();
                }
            } catch (e) {
                console.error(e);
                if (typeof error === 'function') {
                    error();
                }
            }
        };
        var actionPulse = function actionPulse() {
            pulse.id = setTimeout(actionMethod, time);
        };

        actionMethod();
        this.set.push(pulse);
    },
    end: function end(name) {
        var index = this.set.findIndex(function (v) {
            return v.name === name;
        });

        if (index > -1) {
            var pulse = this.set[index];

            clearTimeout(pulse.id);
            this.set.splice(index, 1);
        }
    }
};

var ps = new PulseSet();
exports.default = ps;

//# sourceMappingURL=main.js.map