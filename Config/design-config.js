let MODE = 'DEVELOPMENT';

const SetDesignConfigMode = (modeName) => {
  MODE = modeName;
};

const GetDesignConfig = () => {
  return MODE === 'DEVELOPMENT' ? DESIGN_DEVELOPMENT : DESIGN_PRODUCTION;
};

const DESIGN_GENERAL = {
  footer: {
    greyLineURL: 'https://i.imgur.com/EbcNZBA.png',
    purpleGifLineURL:
      'https://media.tenor.com/XISdXhhFDhwAAAAC/line-border.gif',
  },
  emojis: {
    success: '✅',
    denie: '❌',
    danger: '❗️',
    clear: '🔰',
    textStar: '★',
    gun: '⚔️',
    getWork: '🔰',
    selectCategory: '📚',
    perks: '💪',
    profile: '🧙‍♀️',
    spells: '✨',
    inventory: '🎒',
    sell: '💰',
    upgrade: '♻️',
    equip: '🧩',
    update: '🔄',
  },
  colors: {
    default: Number(0x2f3136),
    success: Number(0xd8cbf8),
    purple: Number(0x8000ff),
    guns: Number(0x6495ed),
    spells: Number(0xda70d6),
    perks: Number(0xffefd5),
    error: Number(0xe76c86),
    levels: Number(0x483d8b),
    work: Number(0xf4a460),
    info: Number(0x5f9ea0),
    shop: Number(0xffd700),
    inventory: Number(0x8000ff),
  },
};

const DESIGN_PRODUCTION = {
  ...DESIGN_GENERAL,
  guildEmojis: {
    actions: {
      main: '<:ActionMain:1266330249021489192>',
      bonus: '<:ActionBonus:1266330247104827463>',
    },
    top: {
      diamond: '<:Top_Diamond:1169669622115598547>',
      platinum: '<:Top_Platinum:1169669620555337728>',
      gold: '<:Top_Gold:1169669617652859071>',
      silver: '<:Top_Silver:1169669615748665344>',
      bronze: '<:Top_Bronze:1169669612615508040>',
    },
    gs: '<:green:1072353757007986750>',
    ps: '<:pink:1072353875958444082>',
    eris: '<:eris:1266293736787410945>',
    exp: '<:exp:1266349569445462099>',
    farmerWork: '<:farmerWork:1266297023288573964>',
    brewerWork: '<:brewerWork:1266297021778755584>',
    offWork: '❌',
    shop: '<:shop:1266302175198314557>',
    wheat: '<:wheat:1266303886906363958>',
    hops: '<:hops:1266303888781479936>',
    grape: '<:grape:1266303885413453836>',
    lemonade: '<:lemonade:1266303892027867199>',
    lightBeer: '<:lightbeer:1266303893520781392>',
    darkBeer: '<:darkbeer:1266303890345693235>',
    health: '❤️',
    mana: '💧',
    endurance: '⚡️',
    armor: '🛡',
    healthRegen: '❤️‍🩹',
    manaRegen: '💦',
    enduranceRegen: '💥',
    spells: '✨',
    inventory: '🎒',
    perks: '💪',
    manaStones: '🧊',
    damage: '💥',
    gun: '⚔️',
    duration: '<:Duration:1266339768682418208>',
    bonus: '<:Bonus:1266343290589020171>',
  },
};

const DESIGN_DEVELOPMENT = {
  ...DESIGN_GENERAL,
  guildEmojis: {
    actions: {
      main: '<:ActionMain:1266329709046923265>',
      bonus: '<:ActionBonus:1266329984671154216>',
    },
    top: {
      diamond: '<:Diamond:1266347381444579359>',
      platinum: '<:Platinum:1266347379217666161>',
      gold: '<:Gold:1266347377556721735>',
      silver: '<:Silver:1266347375929065482>',
      bronze: '<:Bronze:1266347374100349009>',
    },
    gs: '<:green:1010853618905264149>',
    ps: '<:pink:1010824936446754816>',
    eris: '<:eris:1266293596055801950>',
    exp: '<:exp:1266349485269975041> ',
    farmerWork: '<:farmerWork:1266297259813896232>',
    brewerWork: '<:brewerWork:1266297258127921172>',
    offWork: '❌',
    shop: '<:shop:1266302016045453312>',
    wheat: '<:wheatIcon:1168512203163443210>',
    hops: '<:hopsIcon:1168512200743321652>',
    grape: '<:grapeIcons:1168512197530501180>',
    lemonade: '<:barrel_of_lemonade:1180242936923963443>',
    lightBeer: '<:barrel_of_light_beer:1180242840459157535>',
    darkBeer: '<:barrel_of_dark_beer:1180242893374492693>',
    health: '❤️',
    mana: '💧',
    endurance: '⚡️',
    armor: '🛡',
    healthRegen: '❤️‍🩹',
    manaRegen: '💦',
    enduranceRegen: '💥',
    spells: '✨',
    inventory: '🎒',
    perks: '✨',
    manaStones: '🧊',
    damage: '💥',
    gun: '⚔️',
    duration: '<:Duration:1266339655926808659>',
    bonus: '<:Bonus:1266343146187522158>',
  },
};

export {
  SetDesignConfigMode,
  GetDesignConfig,
  DESIGN_GENERAL,
  DESIGN_PRODUCTION,
  DESIGN_DEVELOPMENT,
};
