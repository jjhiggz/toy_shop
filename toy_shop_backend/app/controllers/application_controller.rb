class ApplicationController < ActionController::API
  def get_token(user)
    JWT.encode(user.id, 'secret')
  end
end
