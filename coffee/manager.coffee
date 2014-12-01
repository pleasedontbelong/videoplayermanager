'use strict'

YoutubeHandler = require "./handlers/youtube_handler.js"
utils = require "./utils.js"

module.exports = class Manager

    constructor: (options) ->
        {@ticks, @onTick} = options

        Handler = options.handler ? YoutubeHandler

        # start video handler
        @player = new Handler(options)
        # check for ticks each second
        setInterval(@checkTicks.bind(this), 1000);

    checkTicks: () ->
        current_time = @player.getCurrentTime()

        if not current_time
            return

        # get the tick that was fired before
        prev_tick = false

        # check all ticks
        for tick in @ticks
            if @_tickToSeconds(tick.time) == current_time
                @prev_tick = tick
                @onTick(tick)
                return

    ###
     # Converts a tick (time) representation into seconds
     # @param  {string} tick a time representation
     # @return {int} number of seconds
    ###
    _tickToSeconds: (tick) ->
        splited = tick.split(':')
        (parseInt(splited[0], 10) * 60) + parseInt(splited[1], 10)

    _secondsToTick: (seconds) ->
        min = Math.floor(seconds / 60)
        sec = (seconds - min * 60)
        min + ":" + ("0" + sec).slice(-2)

