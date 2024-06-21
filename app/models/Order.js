import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
  "orders",
  `${process.env.DB_USER}`,
  `${process.env.DB_PASS}`,
  {
    host: `${process.env.BILLING_DATABASE_DNS}`,
    dialect: "postgres",
    define: {
      timestamps: false,
    },
  }
);

await sequelize.authenticate();
console.log("Connection has been established successfully.");

export const Order = sequelize.define("orders", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  number_of_items: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  total_amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});
