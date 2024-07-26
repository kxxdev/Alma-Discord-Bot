const guns = [
  {
    id: 'stick', // Уникальный идентификатор оружия
    rarity: 'Мусор', // Наименование редкости оружия
    type: 'Одноручное', // Тип оружия
    imageUrl:
      'https://cdn0.iconfinder.com/data/icons/symbolicons-camping/28/stick-512.png',
    levels: [
      {
        level: 1,
        name: 'Сломанная палка',
        damage: '1d4',
        imageURL:
          'https://static.wikia.nocookie.net/the-forest-survivor/images/a/aa/Stick.png/revision/latest?cb=20171212093911&path-prefix=ru',
        description:
          'Это обычная сломанная палка. Ничего особенного. Каждый удар для нее может стать последним',
      },
      {
        level: 2,
        name: 'Укрепленная сломанная палка',
        damage: '1d4+1',
        imageURL:
          'https://static.wikia.nocookie.net/the-forest-survivor/images/a/aa/Stick.png/revision/latest?cb=20171212093911&path-prefix=ru',
        description:
          'Это обычная сломанная палка, укрепленная нитками вокруг, что позволяет ей не ломаться при первом же ударе еще сильнее.',
      },
      {
        level: 3,
        name: 'Заостренная палка',
        damage: '2d4',
        imageURL:
          'https://static.wikia.nocookie.net/the-forest-survivor/images/a/aa/Stick.png/revision/latest?cb=20171212093911&path-prefix=ru',
        description:
          'Когда-то древние люди придумали копье и начинали они, очевидно, с этого.',
      },
    ],
  },
];

export default guns;
