const Sale = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    sellerId: {
      type: DataTypes.INTEGER,
      field: 'seller_id'
    },
    totalPrice: {
      allowNull: false,
      type: DataTypes.DECIMAL,
      field: 'total_price'
    },
    deliveryAddress: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'delivery_address'
    },
    deliveryNumber: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'delivery_number'
    },
    saleDate: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'sale_date'
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
    tableName: 'sales',
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user'
    });

    Sale.belongsTo(models.User, {
      foreignKey: 'sellerId', as: 'seller'
    });
  }

  return Sale;
};

module.exports = Sale;