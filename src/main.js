const PulseSet = function() {
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
    start(name, time, action, error) {
        this.end(name);
        let self = this;
        let pulse = {
            name,
            time
        };
        let actionMethod = function() {
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
        let actionPulse = function() {
            pulse.id = setTimeout(actionMethod, time);
        };

        actionMethod();
        this.set.push(pulse);
    },
    end(name) {
        let index = this.set.findIndex(v => v.name === name);

        if (index > -1) {
            let pulse = this.set[index];

            clearTimeout(pulse.id);
            this.set.splice(index, 1);
        }
    }
};

const ps = new PulseSet();
export default ps;
