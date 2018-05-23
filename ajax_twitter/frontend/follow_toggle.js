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
  }
};

FollowToggle.prototype.handleClick = function(e){
  e.preventDefault();
  const self = this;

  if (this.followState === 'followed') {
    $.ajax({
      method: "DELETE",
      url: `/users/${self.userId}/follow`,
      dataType: 'json',
      success: () => {
        self.followState = 'unfollowed';
        self.render();
      }
    });
  } else {
      $.ajax({
        method: "POST",
        url: `/users/${this.userId}/follow`,
        dataType: 'json',
        success: () => {
          this.followState = 'followed';
          this.render();
        }
    });
  }
};

// FollowToggle.prototype.handleClick = (e) => {
//   e.preventDefault();
//   this.render();
// };

// FollowToggle.prototype.handleClick = (event) => {
//     event.preventDefault();
//
//     if (this.followState === 'followed') {
//       this.followState = 'unfollowing';
//       this.render();
//       APIUtil.unfollowUser(this.userId).then(() => {
//         followToggle.followState = 'unfollowed';
//         followToggle.render();
//       });
//     } else if (this.followState === 'unfollowed') {
//       this.followState = 'following';
//       this.render();
//       APIUtil.followUser(this.userId).then(() => {
//         followToggle.followState = 'followed';
//         followToggle.render();
//       });
//     }
//   }
//
//   FollowToggle.prototype.render = function() {
//     switch (this.followState) {
//       case 'followed':
//         this.$el.prop('disabled', false);
//         this.$el.html('Unfollow!');
//         break;
//       case 'unfollowed':
//         this.$el.prop('disabled', false);
//         this.$el.html('Follow!');
//         break;
//       case 'following':
//         this.$el.prop('disabled', true);
//         this.$el.html('Following...');
//         break;
//       case 'unfollowing':
//         this.$el.prop('disabled', true);
//         this.$el.html('Unfollowing...');
//         break;
//     }
//   }
// };


module.exports = FollowToggle;
