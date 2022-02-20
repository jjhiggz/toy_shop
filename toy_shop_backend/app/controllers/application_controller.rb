class ApplicationController < ActionController::API
  def get_token(user)
    JWT.encode(user.id.to_s, 'secret')
  end

  def authorize_admin
    unless @current_user.role == 'admin'
      render json: {
        error: {
          message: 'Not Authorized'
        }
      }, status: :unauthorized
    end
  end

  def authorize_request
    token = request.headers['Authorization'].split(' ').last

    begin
      @decoded = JWT.decode(token, 'secret')
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
