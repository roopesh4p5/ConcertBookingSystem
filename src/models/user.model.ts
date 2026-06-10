import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbconfig";

export class User extends Model {
    declare uuid: number;
    declare name: string;
    declare email: string;
}

User.init(
    {
        uuid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true
    }
);