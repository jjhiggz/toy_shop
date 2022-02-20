Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  post '/signup', to: 'authentication#signup'
  post '/login', to: 'authentication#login'
  get '/fake_items', to: 'fake_items#index'
  get '/fake_items/:id', to: 'fake_items#show'
end
