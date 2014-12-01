describe('VideoManager', function(){
    describe('getUrl', function(){
        it('should return the crawl endpoint', function(){
            var VideoHandler = require("./mocks/video_handler.js");
            VideoHandler.prototype.getCurrentTime = sinon.stub().returns(10);

            var callback = sinon.stub();
            
            var manager = new VideoPlayerManager.Manager({
                'handler': VideoHandler,
                'ticks': [
                    {'time': '0:10', 'return': "5 sec something"},
                    {'time': '0:30', 'return': "30 sec something"},
                    {'time': '1:10', 'return': "1 min 10 sec something"},
                ],
                'onTick': callback
            });
            manager.checkTicks();
            expect(callback.calledOnce).to.be.true;
            expect(callback.calledWith({'time': '0:10', 'return': "5 sec something"})).to.be.true;
        });
    });
});