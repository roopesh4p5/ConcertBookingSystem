'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //     declare uuid: number;
    // declare seatNumber: string;
    // declare UserId: number;
    // declare bookingStatus: string;
    await queryInterface.createTable('bookings', {
      uuid: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      seatNumber: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
              model: 'seats',
              key: 'seatNumber'
          },
          onDelete: 'CASCADE'
      },
      UserId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'users',
              key: 'uuid'
          },
          onDelete: 'CASCADE'
      },
      bookingStatus: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'booked'
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
