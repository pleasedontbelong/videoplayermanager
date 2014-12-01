// Load Botify object
VideoPlayerManager = require('../dist/videoplayermanager.js');

// Load test classes
assert = require("assert");
chai = require("chai");
sinon = require("sinon");
sinonChai = require("sinon-chai");
chai.use(sinonChai);

should = chai.should();
expect = chai.expect;