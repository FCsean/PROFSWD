class CreateGameEquipments < ActiveRecord::Migration
  def change
    create_table :game_equipments do |t|
      t.string :name
      t.integer :user_id
      t.integer :quantity
      t.float :weight
      t.date :date_bought
      t.boolean :fragile

      t.timestamps null: false
    end
  end
end
