require 'test_helper'

class FakeItemsControllerTest < ActionDispatch::IntegrationTest
  test 'an unauthorized user cant access items' do
    get '/fake_items', headers: { 'Authorization' => 'bearer sdlkfjslkdjf' }

    assert_response :unauthorized
  end

  test 'an authorized user can access items' do
    user = users(:reg_user_1)
    token = ApplicationController.new.get_token(user)

    get '/fake_items', headers: { 'Authorization' => "bearer #{token}" }

    assert_response :success
  end

  test 'an admin user can access show' do
    user = users(:admin)
    token = ApplicationController.new.get_token(user)

    get '/fake_items/1', headers: { 'Authorization' => "bearer #{token}" }

    assert_response :success
  end
end
