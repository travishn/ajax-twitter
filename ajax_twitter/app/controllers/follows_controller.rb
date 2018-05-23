class FollowsController < ApplicationController
  before_action :require_logged_in!

  def create
    # simulate latency
    sleep(1)

    @follow = current_user.out_follows.create!(followee_id: params[:user_id])

    respond_to do |format| #if we don't specify a dataType in our ajax request, it will return the first respond_to type specified in the controller.
      format.html { redirect_to request.referrer }
      format.json { render json: @follow }
    end
  end

  def destroy
    # simulate latency
    sleep(1)

    @follow = current_user.out_follows.find_by(followee_id: params[:user_id])
    @follow.destroy!

    respond_to do |format|
      format.html { redirect_to request.referrer }
      format.json { render json: @follow }
    end
  end
end
