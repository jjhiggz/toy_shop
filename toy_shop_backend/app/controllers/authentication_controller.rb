class AuthenticationController < ApplicationController
  def signup
    potential_user = User.create(signup_params)
    unless potential_user.valid?
      render json: {
        error: {
          message: 'Invalid user information'
        }
      }, status: :bad_request
      return
    end
    render(json: {
             user: {
               email: potential_user.email,
               token: get_token(potential_user)
             }
           }, status: :ok)
  end

  def login
    email = login_params[:email]
    password = login_params[:password]

    user = User.find_by(email: email)

    unless user
      render json: {
        error: {
          message: "User with email #{email} not found"
        }
      }, status: :bad_request
      return
    end

    unless user.authenticate(password)
      render json: {
        error: {
          message: 'Invalid Credentials'
        }
      }, status: :unauthorized
      return
    end

    render json: {
      token: get_token(user)
    }, status: :ok
  end

  def signup_params
    params.require(:user).permit(:email, :password)
  end

  def login_params
    params.permit(:email, :password)
  end
end
