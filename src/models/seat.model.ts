import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbconfig";

export class Seat extends Model {
    declare uuid: number;
    declare row: string;
    declare column: string;
    declare isAvailable: boolean;
}

Seat.init(
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
        isAvailable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Seat',
        tableName: 'seats',
        timestamps: true
    }
);
