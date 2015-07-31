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

The base class was built with coffeescript and browserify. I've tried to avoid all
conflicts with different libraries (I'm not even using jquery).


### Installation

```shell
git clone git@github.com:pleasedontbelong/videoplayermanager.git
cd videoplayermanager
npm install
```

### Workflow

There's a grunt watch task that will compile and build the code

```
grunt watch
```

Unit tests can be lauched with

```
grunt test
```

### License

The MIT License (MIT)

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/pleasedontbelong/videoplayermanager/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

