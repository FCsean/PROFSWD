class User < ActiveRecord::Base
    has_many :game_equipments
end
