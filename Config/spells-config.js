const SpellsActionTypes = {
  main: 'Действие',
  bonus: 'Бонусное действие',
};

const Spells = [
  {
    id: 'Потусторонний разряд',
    price: 1,
    description: 'Создать луч трескучей энергии.',
    type: ['Damage'],
    action: 'main',
    levels: [
      {
        damage: '1d10',
      },
      {
        damage: '2d10',
      },
      {
        damage: '3d10',
      },
      {
        damage: '4d10',
      },
      {
        damage: '5d10',
      },
    ],
  },
  {
    id: 'Благословение',
    price: 1,
    type: ['BlessAttack', 'BlessTest'],
    action: 'bonus',
    description:
      'Благословить себя. Вы получаете бонус к броскам атаки и испытаниям.',
    levels: [
      {
        bonus: '1d4',
        duration: 3,
      },
      {
        bonus: '1d4',
        duration: 4,
      },
      {
        bonus: '1d4',
        duration: 5,
      },
      {
        bonus: '1d4',
        duration: 7,
      },
      {
        bonus: '1d4',
        duration: 10,
      },
    ],
  },
  {
    id: 'Пробирающий до костей холод',
    price: 1,
    description:
      'Не позволяет цели исцеляться до вашего следующего хода. Цель получает помеху при бросках атаки.',
    type: ['DebuffHeal', 'DebuffInterferenceAttack'],
    action: 'main',
    levels: [
      {
        duration: 1,
      },
      {
        duration: 2,
      },
      {
        duration: 3,
      },
    ],
  },
];

export { Spells, SpellsActionTypes };
