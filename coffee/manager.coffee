'use strict'

YoutubeHandler = require "./handlers/youtube_handler.js"
utils = require "./utils.js"

module.exports = class Manager

    constructor: (options) ->
        {@ticks, @onTick} = options
        @prev_fired = false

        # append the first element
        @ticks.unshift("0:00")
        @ticks.sort()

        # convet string ticks to numeric ticks
        @ticks_num = @toNumericTicks(@ticks)
        # generate an index of ticks
        @ticks_index = @toTickIndex(@ticks_num)

        @Handler = options.handler ? YoutubeHandler

        @prev_tick = false

        # start video handler
        @player = new @Handler(options)

        @player.onPlay = =>
            # check for ticks each second
            setInterval(@checkTicks.bind(this), 1000);

    toNumericTicks: (string_ticks)->
        # transform ticks to numbers
        ticks_abs = (@_tickToSeconds(tick) for tick in string_ticks)
        return ticks_abs

    toTickIndex: (numeric_ticks) ->
        ticks_index = []
        for tick, i in numeric_ticks
            if not numeric_ticks[i + 1]
                range_width = 1
            else
                range_width = numeric_ticks[i + 1] - tick
            ticks_index.push(i) for j in [1..range_width]

        return ticks_index

    checkTicks: () ->
        current_time = @player.getCurrentTime()

        if current_time is false
            return

        if current_time > @ticks_index.length
            @fireTick(@ticks_index[@ticks_index.length - 1])
            return

        tick_to_fire = @ticks_index[current_time]

        if tick_to_fire != @prev_tick
            @fireTick(tick_to_fire)

    fireTick: (tick_num) ->
        @prev_tick = tick_num
        @onTick(@ticks[tick_num], @ticks)

    goToTick: (tick) ->
        @player.goTo(@_tickToSeconds(tick))

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

