import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import { fileURLToPath } from 'url';
import configData from '../config/config.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configData[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

async function loadModels() {
  const files = fs.readdirSync(__dirname)
    .filter(file => (file !== basename) && file.endsWith('.js'));

  for (const file of files) {
    const modelPath = path.join(__dirname, file);
    const { default: model } = await import(modelPath);
    db[model.name] = model(sequelize, Sequelize.DataTypes);
  }

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
}

await loadModels();

export default db;
