import Sequelize from 'sequelize';

export default function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const <%= camelName %> = sequelizeClient.define('<%= kebabName %>', {
    text: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  <%= camelName %>.associate = function (models) { 
    
  };

  return <%= camelName %>;
};
