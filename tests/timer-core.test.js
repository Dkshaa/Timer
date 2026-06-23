import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { clampMinutes, formatTime, getNextTick, secondsFromMinutes } from "../src/timer-core.js";

describe("timer core helpers", () => {
  it("clamps minute values to the supported range", () => {
    assert.equal(clampMinutes("0"), 1);
    assert.equal(clampMinutes("25"), 25);
    assert.equal(clampMinutes("999"), 180);
    assert.equal(clampMinutes("later", 15), 15);
  });

  it("converts minutes to seconds", () => {
    assert.equal(secondsFromMinutes(5), 300);
    assert.equal(secondsFromMinutes(25), 1500);
  });

  it("formats remaining seconds for display", () => {
    assert.deepEqual(formatTime(0), { minutes: "00", seconds: "00" });
    assert.deepEqual(formatTime(65), { minutes: "01", seconds: "05" });
  });

  it("never ticks below zero", () => {
    assert.equal(getNextTick(1), 0);
    assert.equal(getNextTick(0), 0);
  });
});
