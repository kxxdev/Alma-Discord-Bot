import gunsConfig from '../Config/guns-config.js';

// Поиск оружия в концигурации по id и level.
const getGunConfig = ({ id, level = 1 }) => {
  const item = gunsConfig.find((item) => item.id === id) || gunsConfig[0];

  const levelInfo = item.levels[level - 1] || item.levels[item.levels.length];

  item.name = levelInfo.name;
  item.damage = levelInfo.damage;
  item.imageURL = levelInfo.imageURL;
  item.description = levelInfo.description;

  return item;
};

export { getGunConfig };
