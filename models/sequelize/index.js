const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Medida = sequelize.define('Medida', 
      { 
        titulo: DataTypes.STRING,
        estado: DataTypes.ENUM('sometida', 'en_evaluacion', 'radicada'),
        tipo: DataTypes.ENUM('p_de_la_c', 'r_de_la_c', 'rc_de_la_c', 'r_conc_de_la_c', 'plan_de_reorganizacion'),
        numeroAsignado: DataTypes.INTEGER,
        sometidaPor: DataTypes.STRING
      }
    );
    const VotoExplicativo = sequelize.define('VotoExplicativo', 
      { 
        titulo: DataTypes.STRING,
        estado: DataTypes.ENUM('sometido', 'en_evaluacion', 'radicado'),
        sometidaPor: DataTypes.STRING
      }, {
        tableName: 'VotosExplicativos'
      }
    );

    const InformeDeComision = sequelize.define('InformeDeComision', 
      { 
        titulo: DataTypes.STRING,
        estado: DataTypes.ENUM('sometido', 'en_evaluacion', 'radicado'),
        sometidaPor: DataTypes.STRING
      }, {
        tableName: 'InformesDeComisiones'
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

     const File = sequelize.define('File', { 
        filename: DataTypes.STRING
   });


    //Relacion Many to Many (autores de medida)
    Medida.belongsToMany(Representante, { through: 'Representante_Medida' });
    Representante.belongsToMany(Medida, { through: 'Representante_Medida' });

    Representante.belongsToMany(InformeDeComision, { through: 'Representante_InformeDeComision' });
    InformeDeComision.belongsToMany(Representante, { through: 'Representante_InformeDeComision'});

    Representante.belongsToMany(VotoExplicativo, { through: 'Representante_VotoExplicativo'});
    VotoExplicativo.belongsToMany(Representante, { through: 'Representante_VotoExplicativo'});
    
    VotoExplicativo.belongsTo(Medida);
    Medida.hasOne(VotoExplicativo);

    InformeDeComision.belongsTo(Medida);
    Medida.hasOne(InformeDeComision);

    InformeDeComision.hasMany(File);
    File.belongsTo(InformeDeComision);

    Medida.hasMany(File);
    File.belongsTo(Medida);

    VotoExplicativo.hasMany(File);
    File.belongsTo(VotoExplicativo);

    // USING FORCE WILL DELETE DATA ! 
   // sequelize.sync({force: true}); //force: true
}