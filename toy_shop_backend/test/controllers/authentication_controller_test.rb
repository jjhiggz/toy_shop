require 'test_helper'

class AuthenticationControllerTest < ActionDispatch::IntegrationTest
  test 'signup' do
    post '/signup', params: {
      user: {
        email: 'new_user@gmail.com',
        password: 'password'
      }
    }
    json_response = JSON.parse(response.body)
    user = json_response['user']
    assert user
    assert user['email'] == 'new_user@gmail.com'
    assert_response :success
  end

  test 'try to signup with existing email fails' do
    post '/signup', params: {
      user: {
        email: users(:reg_user_1).email,
        password: 'password'
      }
    }
    json_response = JSON.parse(response.body)
    assert(!json_response['error'].nil?)
  end

  test 'login' do
    post '/login', params: {
      email: users(:reg_user_1).email,
      password: 'testpassword'
    }

    json_response = JSON.parse(response.body)

    assert_response :success
  end
end
