const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Medida = sequelize.define('Medida', 
      { 
        titulo: DataTypes.STRING,
        medidaFile: DataTypes.BLOB,
        estado: DataTypes.ENUM('sometida', 'en_evaluacion', 'radicada'),
        tipo: DataTypes.ENUM('P. de la C.', 'R. de la C.', 'R.C. de la C.', 'R.Conc. de la C.', 'Voto Explicativo', 'Plan de Reorganización')
        
      }
    );
    const Representante = sequelize.define('Representante', { 
        nombre: DataTypes.STRING,
        inicial: DataTypes.STRING,
        apellido1: DataTypes.STRING,
        apellido2: DataTypes.STRING,
        siglas_partido: DataTypes.STRING
     });
    const RepresentanteMedidas = sequelize.define('RepresentanteMedidas', {
      MedidaId: {
        type: DataTypes.INTEGER,
        references: {
          model: Medida, // 'Medidas' would also work
          key: 'id'
        }
      },
      RepresentanteId: {
        type: DataTypes.INTEGER,
        references: {
          model: Representante, // 'Representantes' would also work
          key: 'id'
        }
      }
    },{
      timestamps:false});
    Medida.belongsToMany(Representante, { through: RepresentanteMedidas });
    Representante.belongsToMany(Medida, { through: RepresentanteMedidas });
    //many-to-many => belongsToMany
   
 /* const User = sequelize.define('User', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'John',
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Doe'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    timestamps:true,
  });

  const ContactInfo = sequelize.define('ContactInfo', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    freezeTableName: true,
    timestamps:true,
  });

  const Tweet = sequelize.define('Tweet', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },{
    timestamps:true,
  });

  //hasOne, belognsTo, hasMany, belongsToMany

  //one-to-one => hasOne, belognsTo
  User.hasOne(ContactInfo, {
    foriegnKey: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });
  ContactInfo.belongsTo(User);

  //one-to-many => hasMany, belognsTo
  User.hasMany(Tweet, {
    foriegnKey: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });
  Tweet.belongsTo(User);

  //many-to-many => belongsToMany
  User.belongsToMany(User, {as: "User", foreignKey: "UserId", through: "Follow"});
  User.belongsToMany(User, {as: "Followed", foreignKey: "FollowedId", through: "Follow"});*/

  sequelize.sync({alter: true}); //force: true
}