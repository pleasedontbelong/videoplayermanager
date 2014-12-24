# Video Player Manager

A "simple" class that helps you manage a few video players (for now only Youtube
player is supported).

It allows you to define some ticks (time events) that will be fired when the player
reaches that lapse of time

## Example

```js

<div id="ytapiplayer">Video Player</div>

<script src="../videoplayermanager.js"></script>

<script type="text/javascript">
  $(function() {
  player = new VideoPlayerManager.Manager({
    'video_id': '<your youtube video id>',
    'element_id': 'ytapiplayer',
    'ticks': ['0:10', '0:30', '1:10'],
    'onTick': function(tick, ticks){
      console.log("the player is now at " + tick);
    }
  });
});
</script>
```

## Developement

### Installation

### Workflow

### License
