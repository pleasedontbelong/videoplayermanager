'use strict'

module.exports = 
    defaults: (target, source) ->
        for key, value of source
            if typeof target[key] != "undefined" and typeof source[key] != "undefined"
                target[key] = source[key]
        target
