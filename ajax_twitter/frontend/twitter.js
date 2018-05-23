const FollowToggle = require("./follow_toggle.js");

$ ( () => {
  $('button.follow-toggle').each( (i, btn) => new FollowToggle(btn, {}) );
}

);
