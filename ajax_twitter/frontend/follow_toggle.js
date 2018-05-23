function FollowToggle ($el, options) {
  this.userId = this.$el.data("user-id");
  this.followState = this.$el.data("initial-follow-state");
  this.$el = $el;

  this.render();
}

FollowToggle.prototype.render = () => {
  if (this.followState === "unfollowed") {
    this.$el.text("Follow!");
  } else {
    this.$el.text("Unfollow!");
  }
};

FollowToggle.prototype.handleClick = (e) => {
  e.preventDefault();
  if (this.followState === "unfollowed") {
    $.ajax({
      method: "POST",
      url: "/users/:user_id/follow"
    });
  } else {
    $.ajax({
      method: "DELETE",
      url: "/users/:user_id/follow"
    });
  }
};


module.exports(FollowToggle);
