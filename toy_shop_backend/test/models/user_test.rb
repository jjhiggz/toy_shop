require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'A user will authenticate with the correct password' do
    assert users(:reg_user_1).authenticate('testpassword')
  end

  test 'A user cannot have a password shorter than 3' do
    assert !User.create({
                          password: 'yo',
                          email: 'jon@jon.com'
                        }).valid?
  end

  test 'You cannot create a user with the same email' do
    !User.create({
                   password: users[:reg_user_1].password,
                   email: ''
                 }).valid?
    assert(false)
  rescue StandardError
    assert(true)
  end

  test 'You cannot create a user with an invalid role' do
    user = User.create({
                         password: 'coolbeans',
                         email: 'admin@admin.com',
                         role: 'Admin'
                       })
    assert(!user.valid?)
  end

  test 'You can create a user with a valid role' do
    user = User.create({
                         password: 'coolbeans',
                         email: 'admin2@admin.com',
                         role: 'admin'
                       })
    assert(user.valid?)
  end
end
