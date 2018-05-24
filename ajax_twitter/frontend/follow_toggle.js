const APIUtil = require("./api_util.js");

function FollowToggle (el) {
  this.el = $(el);
  this.userId = this.el.data("user-id");
  this.followState = this.el.data("initial-follow-state");

  this.render();
  this.el.on("click", this.handleClick.bind(this));
  // this.handleClick();
}

FollowToggle.prototype.render = function() {
  if (this.followState === 'unfollowed') {
    this.el.text("Follow!");
  } else if (this.followState === 'followed') {
    this.el.text("Unfollow!");
  } else if (this.followState === 'unfollowing') {
    this.el.text('Unfollowing...');
  } else {
    this.el.text('Following...');
  }
};

FollowToggle.prototype.handleClick = function(e){
  e.preventDefault();

  if (this.followState === 'followed') {
    this.followState = 'unfollowing';
    this.render();

    APIUtil.unfollowUser(this.userId).then( () => {
      this.followState = 'unfollowed';
      this.render();
    });
  } else {
    this.followState = 'following';
    this.render();

    APIUtil.followUser(this.userId).then( () => {
      this.followState = 'followed';
      this.render();
    });
  }
};

// FollowToggle.prototype.handleClick = function(e){
//   e.preventDefault();
//   const self = this;
//
//   if (this.followState === 'followed') {
//     $.ajax({
//       method: "DELETE",
//       url: `/users/${self.userId}/follow`,
//       dataType: 'json',
//       success: () => {
//         self.followState = 'unfollowed';
//         self.render();
//       }
//     });
//   } else {
//       $.ajax({
//         method: "POST",
//         url: `/users/${self.userId}/follow`,
//         dataType: 'json',
//         success: () => {
//           self.followState = 'followed';
//           self.render();
//         }
//     });
//   }
// };
module.exports = FollowToggle;
