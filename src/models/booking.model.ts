import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbconfig";
import { Seat } from "./seat.model";

export class booking extends Model {
    declare uuid: number;
    declare seatNumber: string;
    declare UserId: number;
    declare bookingStatus: string;
}

booking.init(
    {
        uuid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        seatNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bookingStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'booked'
        }
    },
    {
        sequelize,
        modelName: 'booking',
        tableName: 'bookings',
        timestamps: true
    }
);

booking.belongsTo(Seat, { foreignKey: 'seatNumber', targetKey: 'seatNumber' }); 