// Сервис управления пользователями.
import GuildService from './GuildService.js';

// Класс пользователя.
export default class Guild {
  // Конструктор класса.
  constructor(obj) {
    this.id = obj?.id;
    this.channels = obj?.channels;
    this.roles = obj?.roles;
    this.messages = obj?.messages;
  }

  // Получаем гильдию.
  async get({ id }) {
    try {
      const guildDb = await new GuildService().get({ id });

      return new Guild(guildDb);
    } catch (err) {
      console.log(err);
    }
  }

  // Устанавливаем каналы гильдии.
  async setChannelId({ type, id }) {
    try {
      this.channels[type].id = id;

      await this.update({ channels: this.channels });
    } catch (err) {
      console.log(err);
    }
  }

  // Устанавливаем каналы гильдии.
  async setRoleId({ type, id }) {
    try {
      this.roles[type].id = id;

      await this.update({ roles: this.roles });
    } catch (err) {
      console.log(err);
    }
  }

  // Устанавливаем роли гильдии.
  async setLevelRoleId({ level, id }) {
    try {
      // Ищем индекс роли.
      const index = this.roles.levels.findIndex((el) => el.level === level);

      // Если индекс найден.
      if (index >= 0) {
        this.roles.levels[index].role.id = id;
      } else {
        // Если на таком уровне роли нет, то записываем её.
        this.roles.levels.push({ level, role: { id } });
      }

      this.roles.levels.sort((a, b) => a.level - b.level);

      await this.update({ roles: this.roles });
    } catch (err) {
      console.log(err);
    }
  }

  // Удаление лвльной роли.
  async removeLevelRoleId({ level }) {
    try {
      // Ищем индекс роли.
      const index = this.roles.levels.findIndex((el) => el.level === level);

      // Если индекс найден.
      if (index >= 0) {
        this.roles.levels.splice(index, 1);
      } else {
        return;
      }

      await this.update({ roles: this.roles });
    } catch (err) {
      console.log(err);
    }
  }

  // Добавление сообщения.
  async setMessage({
    member,
    channel,
    time,
    channelSend,
    urlCheck,
    link,
    messageContent,
    embed,
  }) {
    try {
      this.messages.push({
        userId: member.id,
        channelId: channel.id,
        date: new Date(time),
        channelSendId: channelSend.id,
        urlCheck,
        link,
        messageContent,
        embed: {
          title: embed.data?.title,
          description: embed.data?.description,
          color: embed.data.color,
          imageUrl: embed.image?.url,
        },
      });

      await this.update({ messages: this.messages });
    } catch (err) {
      console.log(err);
    }
  }

  async deleteMessage({ id }) {
    try {
      const index = this.messages.findIndex((message) => message.id === id);

      this.messages.splice(index, 1);

      await this.update({ messages: this.messages });
    } catch (err) {
      console.log(err);
    }
  }

  // Обновление базы данных пользователя.
  async update(obj) {
    try {
      await new GuildService().update({
        id: this.id,
        ...obj,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
