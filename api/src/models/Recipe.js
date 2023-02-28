const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    spoonacularScore:{
      type: DataTypes.INTEGER,
      validate: {
        min:0,
        max: 100
      }

    },

    healthScore:{
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {
        min: 0,
        max: 100
      }
      
    },

    steps:{
      type: DataTypes.STRING,
    },

    servings: {
      type: DataTypes.INTEGER,
    },

    readyInMinutes: {
      type: DataTypes.INTEGER,
    }, 

    image:{
      type: DataTypes.STRING,
      defaultValue: "https://previews.123rf.com/images/margolana/margolana1706/margolana170600029/80490007-vector-verduras-ensalada-estilo-de-dibujos-animados-ensalada-taz%C3%B3n-comida-fresca-saludable-en-un-pla.jpg"
    },

    MadeOnDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      },

      dishTypes: {
        type: DataTypes.ARRAY(DataTypes.JSON)
      }


  });
};