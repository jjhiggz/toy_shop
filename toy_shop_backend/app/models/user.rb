class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 3 }
  validates :role, presence: true, inclusion: { in: %w[admin user] }
  # has_many :shopping_cart_items, through: :shopping_carts, source: :product
end
