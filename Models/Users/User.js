// Сервис управления пользователями.
import UserService from './UserService.js';

// Управление датой.
import { isPast, addMinutes } from 'date-fns';

import rolesConfig from '../../Config/roles-config.json' assert { type: 'json' };
import shopConfig from '../../Config/shop-config.json' assert { type: 'json' };

// Класс пользователя.
export default class User {
  // Конструктор класса.
  constructor(obj) {
    this.id = obj?.id;
    this.notice = obj?.notice;
    this.guild = obj?.guild;
    this.levels = obj?.levels;
    this.money = obj?.money;
    this.birthday = obj?.birthday;
    this.signature = obj?.signature;
    this.work = obj?.work;
    this.inventory = obj?.inventory;
    this.quests = obj?.quests;
    this.voiceStates = obj?.voiceStates;
    this.textStates = obj?.textStates;
  }

  // Получаем пользователя.
  static async get({ id, guildId }) {
    try {
      const userDb = await new UserService().get({ id, guildId });

      return new User(userDb);
    } catch (err) {
      console.log(err);
    }
  }

  // Получение всех пользователей в гильдии.
  static async getAllInGuild({ guildId }) {
    try {
      const users = await new UserService().getAllInGuild({ guildId });

      return users;
    } catch (err) {
      console.log(err);
    }
  }

  // Получение инвентаря магазина
  async getShopInventory({ type }) {
    try {
      switch (type) {
        case 'profile-backgrounds':
          const profileBackgrounds = [];
          this.inventory.shop.profileCards.cards.forEach((element) => {
            const nameArray = element.name.split('-');
            profileBackgrounds.push({
              label: nameArray[1],
              value: element.name,
              emoji: '1169666285123141773',
            });
          });
          return profileBackgrounds;
        case 'profile-frames':
          const profileFrames = [];
          this.inventory.shop.profileFrames.frames.forEach((element) => {
            const nameArray = element.name.split('-');
            profileFrames.push({
              label: nameArray[1],
              value: element.name,
              emoji: '1169666285123141773',
            });
          });
          return profileFrames;
        case 'profile-shadows':
          const profileShadows = [];
          this.inventory.shop.profileShadows.shadows.forEach((element) => {
            const nameArray = element.name.split('-');
            profileShadows.push({
              label: nameArray[1],
              value: element.name,
              emoji: '1169666285123141773',
            });
          });
          return profileShadows;
        default:
          return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Установка твинка.
  async setTwink({ value, notice }) {
    try {
      if (value != true && value != false) return;
      this.notice.twink.status = value;
      this.notice.twink.notice = notice;

      await this.update({ notice: this.notice });
    } catch (err) {
      console.log(err);
    }
  }

  // Выдача опыта за сообщения.
  async giveExp({ type, num }) {
    try {
      // Записываем количество опыта для повышения.
      const amount = num ? num : 1;

      // Проверка, был ли указан тип опыта.
      if (type === 'text') {
        // Записываем дату последнего обновления опыта.
        const updateDate = this.levels.dates[type];

        // Если с момента прибавления даты прошла 1 минута.
        if (!isPast(addMinutes(updateDate, 1))) return;

        // Обновляем дату.
        this.levels.dates[type] = new Date();
      } else if (type === 'voice') {
        // Добавляем счетчик минут в войс
        this.voiceStates.minutesInVoice += 1;
        this.voiceStates.tempStates += 1;
        await this.update({ voiceStates: this.voiceStates });
      }

      // Создаем переменную уровня.
      let level;

      // Прибавляем опыт.
      this.levels.exp += amount;

      // Проверяем, хватает ли для повышения уровня.
      if (this.levels.exp >= (this.levels.level + 1) * 100) {
        // Записываем оставшийся опыт.
        const exp = (this.levels.level + 1) * 100 - this.levels.exp;

        // Повышаем уровень и записываем текущий уровень.
        level = await this.levelUp(exp);
      }

      // Обновляем пользователя в БД.
      await this.update({ levels: this.levels });

      // Выводим сообщение в консоль.
      console.log(`Выдано exp пользователю ${this.id} в количестве ${amount}.`);

      // Возвращаем уровень.
      return level;
    } catch (err) {
      console.log(err);
    }
  }

  // Выдача моры за сообщения.
  async giveEris({ type, num }) {
    try {
      // Записываем количество опыта для повышения.
      const amount = num ? num : 1;

      // Проверка, был ли указан тип опыта.
      if (type === 'text') {
        // Записываем дату последнего обновления опыта.
        const updateDate = this.money.eris.dates[type];

        // Если с момента прибавления даты прошла 1 минута.
        if (!isPast(addMinutes(updateDate, 1))) return;

        // Обновляем дату.
        this.money.eris.dates[type] = new Date();
      }

      // Прибавляем мору.
      this.money.eris.value += amount;

      // Округляем.
      this.money.eris.value = Math.floor(this.money.eris.value);

      // Обновляем пользователя в БД.
      await this.update({ money: this.money });

      // Выводим сообщение в консоль.
      console.log(
        `Выдано eris пользователю ${this.id} в количестве ${amount}.`
      );
    } catch (err) {
      console.log(err);
    }
  }

  // Убираение моры.
  async subEris({ num }) {
    try {
      // Записываем количество опыта для повышения.
      const amount = num ? num : 1;

      // Убавляем мору.
      this.money.eris.value -= amount;

      // Округляем.
      this.money.eris.value = Math.floor(this.money.eris.value);

      // Обновляем пользователя в БД.
      await this.update({ money: this.money });

      // Выводим сообщение в консоль.
      console.log(`Снята eris пользователю ${this.id} в количестве ${amount}.`);
    } catch (err) {
      console.log(err);
    }
  }

  // Сброс временного войс-стата.
  async nullTempVoiceStates() {
    try {
      this.voiceStates.tempStates = 0;

      await this.update({ voiceStates: this.voiceStates });
    } catch (err) {
      console.log(err);
    }
  }

  // Повышение уровня.
  async levelUp(exp) {
    try {
      // Повышаем уровень.
      this.levels.level += 1;

      // Обновляем опыт.
      this.levels.exp = exp;

      return this.levels.level;
    } catch (err) {
      console.log(err);
    }
  }

  // Установка подписи.
  async setSignature({ signature }) {
    try {
      this.signature = signature;

      await this.update({ signature: this.signature });
    } catch (err) {
      console.log(err);
    }
  }

  // Установка даты рождения.
  async setBirthday({ day, month }) {
    try {
      this.birthday.day = Math.floor(day);
      this.birthday.month = Math.floor(month);

      await this.update({ birthday: this.birthday });
    } catch (err) {
      console.log(err);
    }
  }

  // Установка даты оповещения о дне рождения.
  async setBirthdaySendDate() {
    try {
      this.birthday.sendDate = new Date();

      await this.update({ birthday: this.birthday });
    } catch (err) {
      console.log(err);
    }
  }

  // Устройство на работу.
  async getWork({ value, member }) {
    try {
      this.work.currently = value;

      if (value === 'Фермер') {
        await member.roles
          .add(rolesConfig.farmer)
          .catch((err) => console.log(err));
      } else if (value === 'Пивовар') {
        await member.roles
          .add(rolesConfig.brewer)
          .catch((err) => console.log(err));
      } else if (value === 'Безработный') {
        if (member.roles.cache.has(rolesConfig.farmer)) {
          await member.roles
            .remove(rolesConfig.farmer)
            .catch((err) => console.log(err));
        }
        if (member.roles.cache.has(rolesConfig.brewer)) {
          await member.roles
            .remove(rolesConfig.brewer)
            .catch((err) => console.log(err));
        }
      }

      await this.update({ work: this.work });
    } catch (err) {
      console.log(err);
    }
  }

  // Начало работы.
  async workRun({ value }) {
    try {
      let workName = 'Безработный';
      switch (this.work.currently) {
        case 'Фермер':
          workName = 'farmer';
          break;
        case 'Пивовар':
          workName = 'brewer';
          break;
        default:
          break;
      }

      if (workName === 'Безработный') {
        switch (value) {
          case 'wheat':
          case 'hops':
          case 'grapes':
            workName = 'farmer';
            break;
          case 'lemonade':
          case 'whiteBeer':
          case 'darkBeer':
            workName = 'brewer';
            break;
          default:
            return;
        }
      }

      const work = this.work[workName];
      work.products[value].status = !work.products[value].status;
      work.products[value].date = new Date();

      this.work[workName] = work;

      await this.update({ work: this.work });
    } catch (err) {
      console.log(err);
    }
  }

  // Улучшение опыта работы.
  async workUp() {
    try {
      let workName = 'Безработный';
      switch (this.work.currently) {
        case 'Фермер':
          workName = 'farmer';
          break;
        case 'Пивовар':
          workName = 'brewer';
          break;
        default:
          break;
      }

      if (workName === 'Безработный') return;

      const work = this.work[workName];
      work.levels.exp++;
      if (work.levels.exp >= work.levels.level * 10) {
        work.levels.exp = 0;
        work.levels.level++;
      }

      this.work[workName] = work;

      await this.update({ work: this.work });
    } catch (err) {
      console.log(err);
    }
  }

  // Проверка наличия рамки профиля.
  async checkProfileFrames({ name }) {
    try {
      const profile = this.inventory.shop.profileFrames.frames.find(
        (card) => card.name === name
      );

      return !!profile;
    } catch (err) {
      console.log(err);
    }
  }

  // Проверка наличия фона аватара профиля
  async checkProfileShadows({ name }) {
    try {
      const profile = this.inventory.shop.profileShadows.shadows.find(
        (card) => card.name === name
      );

      return !!profile;
    } catch (err) {
      console.log(err);
    }
  }

  // Проверка наличия карточки профиля.
  async checkProfileBackground({ name }) {
    try {
      const profile = this.inventory.shop.profileCards.cards.find(
        (card) => card.name === name
      );

      return !!profile;
    } catch (err) {
      console.log(err);
    }
  }

  // Выдача карточки профиля.
  async giveProfileCardBackground({ name }) {
    try {
      // Устанавливаем карточку в профиль.
      await this.setProfileCardBackground({ name });

      // Добавляем карточку в инвентарь
      this.inventory.shop.profileCards.cards.push({ name });

      await this.update({ inventory: this.inventory });
    } catch (err) {
      console.log(err);
    }
  }

  // Установка карточки профиля.
  async setProfileCardBackground({ name }) {
    try {
      this.inventory.shop.profileCards.active = name;

      await this.update({ inventory: this.inventory });
    } catch (err) {
      console.log(err);
    }
  }

  // Снятие всех ролей профиля.
  async removeProfileRoles({ member }) {
    try {
      this.inventory.shop.profileCards.cards.forEach(async (card) => {
        const profileCard = shopConfig.backgrounds[card.name];

        if (member.roles.cache.has(profileCard.roleId)) {
          await member.roles.remove(profileCard.roleId).catch();
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Добавляем квест в базу.
  async questStart({ id }) {
    try {
      const quest = this.quests.find((quest) => quest.id === id);

      if (quest) return;

      this.quests.push({
        id,
        stage: 'start',
      });

      await this.update({ quests: this.quests });
    } catch (err) {
      console.log(err);
    }
  }

  // Выдача рамки профиля.
  async giveProfileCardFrame({ name }) {
    try {
      // Устанавливаем карточку в профиль.
      await this.setProfileCardFrame({ name });

      // Добавляем карточку в инвентарь
      this.inventory.shop.profileFrames.frames.push({ name });

      await this.update({ inventory: this.inventory });
    } catch (err) {
      console.log(err);
    }
  }

  // Установка рамки профиля.
  async setProfileCardFrame({ name }) {
    try {
      this.inventory.shop.profileFrames.active = name;

      await this.update({ inventory: this.inventory });
    } catch (err) {
      console.log(err);
    }
  }

  // Выдача тени профиля.
  async giveProfileCardShadow({ name }) {
    try {
      // Устанавливаем карточку в профиль.
      await this.setProfileCardShadow({ name });

      // Добавляем карточку в инвентарь
      this.inventory.shop.profileShadows.shadows.push({ name });

      await this.update({ inventory: this.inventory });
    } catch (err) {
      console.log(err);
    }
  }

  // Установка тени профиля.
  async setProfileCardShadow({ name }) {
    try {
      this.inventory.shop.profileShadows.active = name;

      await this.update({ inventory: this.inventory });
    } catch (err) {
      console.log(err);
    }
  }

  // Ищем квест по айди.
  async getQuest({ id }) {
    try {
      return this.quests.find((quest) => quest.id === id);
    } catch (err) {
      console.log(err);
    }
  }

  // Изменяем стадию квеста.
  async setQuestStage({ id, stage }) {
    try {
      const quest = await this.getQuest({ id });
      const questIndex = this.quests.findIndex((quest) => quest.id === id);

      if (!quest || (!questIndex && questIndex != 0)) return false;

      this.quests[questIndex].stage = stage;

      await this.update({ quests: this.quests });

      return true;
    } catch (err) {
      console.log(err);
    }
  }

  // Получение текущего оружия.
  async getActiveWeapon() {
    try {
      const weapon = this.inventory.weapons.find((weapon) => weapon.id === id);
      if (!weapon)
        return {
          rareLevel: 1,
          name: 'Тайна мира',
          description:
            'Неизвестное оружие, имеющее за собой что-то таинственное.',
          level: 1,
          type: 'Посох',
          damage: 1,
          price: 1,
        };

      return weapon;
    } catch (err) {
      console.log(err);
    }
  }

  // Установка оружия активным.
  async getWeapon({ id }) {
    try {
      const weapon = this.inventory.weapons.find((weapon) => weapon.id === id);
      if (!weapon)
        return {
          rareLevel: 1,
          name: 'Тайна мира',
          description:
            'Неизвестное оружие, имеющее за собой что-то таинственное.',
          level: 1,
          type: 'Посох',
          damage: 1,
          price: 1,
        };

      this.inventory.weapon.id = weapon.id;

      await this.update({ inventory: { weapon: this.inventory.weapon } });

      return weapon;
    } catch (err) {
      console.log(err);
    }
  }

  // Добавление нового оружия
  async giveWeapon({ weapon }) {
    try {
      this.inventory.weapons.push(weapon);

      await this.update({ inventory: { weapons: this.inventory.weapons } });
      return weapon;
    } catch (err) {
      console.log(err);
    }
  }

  // Удаление оружия
  async removeWeapon({ index }) {
    try {
      this.inventory.weapons.splice(index, 1);

      await this.update({ inventory: { weaposn: this.inventory.weapons } });
    } catch (err) {
      console.log(err);
    }
  }

  // Обновление базы данных пользователя.
  async update(obj) {
    try {
      await new UserService().update({
        id: this.id,
        guild: { id: this.guild.id },
        ...obj,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
