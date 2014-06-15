'use strict'

YoutubeHandler = require "./handlers/youtube_handler.js"

module.exports = class VideoTutorial

    constructor: (options) ->
        {@ticks, @onTick} = options
        handler = options.handler ? YoutubeHandler
        @player = new handler(options)
