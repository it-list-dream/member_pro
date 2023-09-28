class EventBus {
    constructor() {
        this.task = {};
    }
    on(name, cb) {
        if (!this.task[name]) {
            this.task[name] = []
        }
        typeof cb === 'function' && this.task[name].push(cb)
    }

    emit(name, ...arg) {
        let taskQueen = this.task[name]
        if (taskQueen && taskQueen.length > 0) {
            taskQueen.forEach(cb => {
               cb(...arg)
              console.log(cb)
            })
        }
    }

    off(name, cb) {
        let taskQueen = this.task[name]
        if (taskQueen && taskQueen.length > 0) {
            let index = taskQueen.indexOf(cb)
            index != -1 && taskQueen.splice(index, 1)
        }
    }

    once(name, cb) {
        function callback(...arg) {
            this.off(name, cb)
            cb(...arg)
        }
        typeof cb === 'function' && this.on(name, callback)
    }

}

export default EventBus