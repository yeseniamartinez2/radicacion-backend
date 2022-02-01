const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Medida = sequelize.define('Medida', 
      { 
        titulo: DataTypes.STRING,
        filename: DataTypes.STRING,
        estado: DataTypes.ENUM('sometida', 'en_evaluacion', 'radicada'),
        tipo: DataTypes.ENUM('p_de_la_c', 'r_de_la_c', 'rc_de_la_c', 'r_conc_de_la_c', 'voto_explicativo', 'plan_de_reorganizacion'),
        numeroAsignado: DataTypes.INTEGER,
        sometidaPor: DataTypes.STRING
      }
    );
    const Representante = sequelize.define('Representante', { 
        nombre: DataTypes.STRING,
        inicial: DataTypes.STRING,
        apellido1: DataTypes.STRING,
        apellido2: DataTypes.STRING,
        siglas_partido: DataTypes.STRING,
        email: DataTypes.STRING
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
   

    // USING FORCE WILL DELETE DATA ! 
  //sequelize.sync({alter: true}); //force: true
}