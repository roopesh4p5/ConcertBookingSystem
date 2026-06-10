'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  //   {
      //     uuid: {
      //         type: DataTypes.INTEGER,
      //         autoIncrement: true,
      //         primaryKey: true
      //     },
      //     seatNumber: {
      //         type: DataTypes.STRING,
      //         allowNull: false,
      //         unique: true
      //     },
      //     isAvailable: {
      //         type: DataTypes.BOOLEAN,
      //         allowNull: false,
      //         defaultValue: true
      //     },
      //     createdAt: {
      //         type: DataTypes.DATE,
      //         allowNull: false
      //     },
      //     updatedAt: {
      //         type: DataTypes.DATE,
      //         allowNull: false
      //     }
      // },
    await queryInterface.createTable('seats', {
      uuid: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      seatNumber: {
          type: Sequelize.STRING,
          allowNull: false, 
          unique: true
      },
      isAvailable: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true
      },
      createdAt: {
          type: Sequelize.DATE,
          allowNull: false
      },
      updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
      }
    }); 
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
