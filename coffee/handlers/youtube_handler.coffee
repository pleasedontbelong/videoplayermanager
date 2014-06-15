'use strict'

utils = require "../utils.js"
BaseHandler = require "./base_handler.js"

module.exports = class YoutubeHandler extends BaseHandler

    defaults: 
        video_id: "" # the youtube video id (11 chars)
        element_id: "ytapiplayer" # Id of the dom element to replace with the player
        width: "425" # video width
        height: "356" # video height
        swf_params:
            allowScriptAccess: "always"
        swf_atts:
            id: "myytplayer"

    constructor: (options) ->
        @options = utils.defaults(@defaults, options)

        # set the callback function for the player
        window.onYouTubePlayerReady = @onYouTubePlayerReady.bind(this)
        window.eventChanged = @onYouTubePlayerChange.bind(this)

        swfobject.embedSWF("https://www.youtube.com/v/" + @options.video_id + "?version=3&enablejsapi=1",
                           @options.element_id,
                           @options.width,
                           @options.height,
                           "8",
                           null,
                           null,
                           @options.swf_params,
                           @options.swf_atts);

    start: ->

    stop: ->

    pause: ->

    goto: (time) ->

    onYouTubePlayerReady: ->
        # store the player instance
        @player = document.getElementById("myytplayer")

        # Add a listener for the changes on the player
        @player.addEventListener("onStateChange","eventChanged")

        setInterval(@updatePlayerInfo.bind(this), 600);

    onYouTubePlayerChange: ->
        console.log arguments

    updatePlayerInfo: ->
        console.log @player.getCurrentTime()        
