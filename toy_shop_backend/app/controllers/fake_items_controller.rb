# This controller is just to test out tyhe authorization logic without having that tied to a specific problem space

class FakeItemsController < ApplicationController
  before_action :authorize_request

  def index
    render json: { items: [1, 2, 3] }, status: 200
  end

  #   fake only admin feature to make sure that we can test the admin feature
  def show
    authorize_admin
    render json: { item: 1 }, status: 200
  end
end
