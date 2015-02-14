class OthersController < ApplicationController

  def simple_game
  end
  
  def users
    @users = User.all.to_a
  end
end
