class ApplicationController < ActionController::API
  def get_token(user)
    JWT.encode(user.id, 'secret')
  end

  def authorize_request
    header = request.headers['Authorization']

    begin
      @decoded = JWT.decode(header, 'secret', true, algorithm: 'HS256')
      @current_user_id = @decoded[0]
      @current_user = User.find(@current_user_id)
    rescue JWT::DecodeError
      render json: {
        error: {
          message: 'Not Authorized'
        }
      }, status: :unauthorized
    end
  end
end
