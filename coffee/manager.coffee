'use strict'

YoutubeHandler = require "./handlers/youtube_handler.js"
utils = require "./utils.js"

module.exports = class Manager

    constructor: (options) ->
        {@ticks, @onTick} = options
        @prev_fired = false

        # transform ticks to numbers
        @ticks_abs = (@_tickToSeconds(tick) for tick in @ticks)
        # append the first element
        @ticks_abs.unshift(0)

        Handler = options.handler ? YoutubeHandler

        # start video handler
        @player = new Handler(options)
        # check for ticks each second
        setInterval(@checkTicks.bind(this), 1000);

    checkTicks: () ->
        current_time = @player.getCurrentTime()

        if current_time is false
            return

        # check all ticks
        for tick, i in @ticks_abs
            if current_time >= tick and (not @ticks_abs[i + 1] or current_time < @ticks_abs[i + 1])
                if not @prev_fired or @prev_fired != @ticks_abs[i]
                    # fire tick
                    @onTick(@ticks[i - 1] || @ticks[i], @ticks)
                    @prev_fired = @ticks_abs[i]
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

