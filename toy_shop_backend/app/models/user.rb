class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 3 }
  validates :role, presence: true, inclusion: { in: %w[admin user] }
end
