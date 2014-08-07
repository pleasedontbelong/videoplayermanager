!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.VideoTutorial=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';
var BaseHandler;

module.exports = BaseHandler = (function() {
  function BaseHandler() {
    throw "Method is not implemented";
  }

  BaseHandler.prototype.start = function() {
    throw "Method is not implemented";
  };

  BaseHandler.prototype.stop = function() {
    throw "Method is not implemented";
  };

  BaseHandler.prototype.pause = function() {
    throw "Method is not implemented";
  };

  BaseHandler.prototype.goto = function(time) {
    throw "Method is not implemented";
  };

  return BaseHandler;

})();

},{}],2:[function(_dereq_,module,exports){
'use strict';
var BaseHandler, YoutubeHandler, utils,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

utils = _dereq_("../utils.js");

BaseHandler = _dereq_("./base_handler.js");

module.exports = YoutubeHandler = (function(_super) {
  __extends(YoutubeHandler, _super);

  YoutubeHandler.prototype.defaults = {
    video_id: "",
    element_id: "ytapiplayer",
    width: "425",
    height: "356",
    swf_params: {
      allowScriptAccess: "always"
    },
    swf_atts: {
      id: "myytplayer"
    }
  };

  function YoutubeHandler(options) {
    this.options = utils.defaults(this.defaults, options);
    window.onYouTubePlayerReady = this.onYouTubePlayerReady.bind(this);
    window.eventChanged = this.onYouTubePlayerChange.bind(this);
    swfobject.embedSWF("https://www.youtube.com/v/" + this.options.video_id + "?version=3&enablejsapi=1", this.options.element_id, this.options.width, this.options.height, "8", null, null, this.options.swf_params, this.options.swf_atts);
  }

  YoutubeHandler.prototype.start = function() {};

  YoutubeHandler.prototype.stop = function() {};

  YoutubeHandler.prototype.pause = function() {};

  YoutubeHandler.prototype.goto = function(time) {};

  YoutubeHandler.prototype.onYouTubePlayerReady = function() {
    this.player = document.getElementById("myytplayer");
    return this.player.addEventListener("onStateChange", "eventChanged");
  };

  YoutubeHandler.prototype.onYouTubePlayerChange = function() {};

  YoutubeHandler.prototype.getCurrentTime = function() {
    if (this.player) {
      return Math.round(this.player.getCurrentTime());
    }
  };

  return YoutubeHandler;

})(BaseHandler);

},{"../utils.js":5,"./base_handler.js":1}],3:[function(_dereq_,module,exports){
module.exports = {
  Tutorial: _dereq_('./tutorial.js')
};

},{"./tutorial.js":4}],4:[function(_dereq_,module,exports){
'use strict';
var VideoTutorial, YoutubeHandler;

YoutubeHandler = _dereq_("./handlers/youtube_handler.js");

module.exports = VideoTutorial = (function() {
  function VideoTutorial(options) {
    var Handler, _ref;
    this.ticks = options.ticks, this.onTick = options.onTick;
    Handler = (_ref = options.handler) != null ? _ref : YoutubeHandler;
    this.last_tick = false;
    this.player = new Handler(options);
    setInterval(this.checkTicks.bind(this), 1000);
  }

  VideoTutorial.prototype.checkTicks = function() {
    var args, current_time, prev_tick, tick, _ref;
    current_time = this.player.getCurrentTime();
    if (!current_time) {
      return;
    }
    prev_tick = this._getPrevTick();
    console.log("prev_tick", prev_tick);
    if (prev_tick && this.last_tick !== prev_tick) {
      this.last_tick = prev_tick;
      this.onTick(this.ticks[this.last_tick], this.player, true);
      return;
    }
    _ref = this.ticks;
    for (tick in _ref) {
      args = _ref[tick];
      if (this._tickToSeconds(tick) === current_time) {
        this.last_tick = tick;
        this.onTick(args, this.player, false);
        return;
      }
    }
  };

  VideoTutorial.prototype._fireTick = function(tick_id, options, player, is_manual) {
    this.last_tick = tick_id;
    this.onTick(this.ticks[this.last_tick], this.player, true);
  };

  VideoTutorial.prototype._tickToSeconds = function(tick) {
    var splited;
    splited = tick.split(':');
    return (parseInt(splited[0], 10) * 60) + parseInt(splited[1], 10);
  };

  VideoTutorial.prototype._secondsToTick = function(seconds) {
    var min, sec;
    min = Math.floor(seconds / 60);
    sec = seconds - min * 60;
    return min + ":" + ("0" + sec).slice(-2);
  };

  VideoTutorial.prototype._getPrevTick = function(time) {
    var args, prev_tick, tick, _ref;
    prev_tick = false;
    _ref = this.ticks;
    for (tick in _ref) {
      args = _ref[tick];
      if (time < this._tickToSeconds(tick)) {
        return prev_tick;
      }
      prev_tick = tick;
    }
    return prev_tick;
  };

  return VideoTutorial;

})();

},{"./handlers/youtube_handler.js":2}],5:[function(_dereq_,module,exports){
'use strict';
module.exports = {
  defaults: function(target, source) {
    var key, value;
    for (key in source) {
      value = source[key];
      if (typeof target[key] !== "undefined" && typeof source[key] !== "undefined") {
        target[key] = source[key];
      }
    }
    return target;
  },
  find: function(items, key, value) {
    var item, _i, _len;
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      if (item[key] === value) {
        return item;
      }
    }
    return false;
  }
};

},{}]},{},[3])
(3)
});