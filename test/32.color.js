#!/usr/bin/env mocha -R spec

var assert = require("assert");
var fs = require("fs");
var rdotjson = require("../rdotjson");
var TITLE = __filename.replace(/^.*\//, "") + ":";

/* jshint mocha:true */

describe(TITLE, function() {
  it("color.xml", function(done) {
    var xml = fs.readFileSync(__dirname + "/values/color.xml");
    assert.ok(xml);
    rdotjson(xml, function(err, R) {
      assert.ok(!err, err);
      assert.ok(R);
      assert.ok(R.color);
      assert.equal(R.color.opaque_red + "", "#ff0000");
      assert.equal(R.color.invisible_red + "", "#00ff0000");
      assert.equal(R.color.translucent_red + "", "#80ff0000");

      var csv = rdotjson.format("csv")(R);
      assert.ok(csv);
      assert.ok(csv.indexOf("color,opaque_red,#ff0000") > -1);
      assert.ok(csv.indexOf("color,invisible_red,#00ff0000") > -1);
      assert.ok(csv.indexOf("color,translucent_red,#80ff0000") > -1);
      done();
    });
  });
});