'use strict'

YoutubeHandler = require "./handlers/youtube_handler.js"
utils = require "./utils.js"

module.exports = class VideoTutorial

    constructor: (options) ->
        {@ticks, @onTick} = options
        Handler = options.handler ? YoutubeHandler
        @last_tick = false
        # start video handler
        @player = new Handler(options)
        # check for ticks each second
        setInterval(@checkTicks.bind(this), 1000);

    checkTicks: () ->
        current_time = @player.getCurrentTime()
        if not current_time
            return
        # get the tick that was fired before
        prev_tick = utils.find(@ticks, "fired", true)
        console.log "prev_tick", prev_tick
        # user can manually change the current time on the player
        # we must verify that the last tick was fired 
        if prev_tick && @last_tick != prev_tick
            @last_tick = prev_tick
            @onTick(@ticks[@last_tick], @player, true)
            return

        # check all ti
        for tick, args of @ticks
            if @_tickToSeconds(tick) == current_time
                @last_tick = tick
                @onTick(args, @player, false)
                return

    _fireTick: (tick_id, options, player, is_manual) ->
        @last_tick = tick_id
        @onTick(@ticks[@last_tick], @player, true)
        return
            
    _tickToSeconds: (tick) ->
        splited = tick.split(':')
        (parseInt(splited[0], 10) * 60) + parseInt(splited[1], 10)

    _secondsToTick: (seconds) ->
        min = Math.floor(seconds / 60)
        sec = (seconds - min * 60)
        min + ":" + ("0" + sec).slice(-2)

    _getPrevTick: (time) ->
        prev_tick = false
        for tick, args of @ticks
            if time < @_tickToSeconds(tick)
                return prev_tick
            prev_tick = tick
        return prev_tick
