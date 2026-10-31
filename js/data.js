/* Bangla alphabet data: 11 sorborno + 39 bynjonborno = 50 letters.
   Bengali text is stored as \uXXXX escapes so sources stay pure ASCII. */
var BA_LETTERS = [
  {
    "ch": "\u0985",
    "name": "Sh\u00f4re \u00d4",
    "bnName": "\u09b8\u09cd\u09ac\u09b0\u09c7 \u0985",
    "type": "vowel",
    "ex": {
      "bn": "\u0985\u099c\u0997\u09b0",
      "tr": "\u00f4j\u00f4g\u00f4r",
      "en": "python"
    },
    "pos": "initial"
  },
  {
    "ch": "\u0986",
    "name": "Sh\u00f4re A",
    "bnName": "\u09b8\u09cd\u09ac\u09b0\u09c7 \u0986",
    "type": "vowel",
    "ex": {
      "bn": "\u0986\u09ae",
      "tr": "am",
      "en": "mango"
    },
    "pos": "initial"
  },
  {
    "ch": "\u0987",
    "name": "R\u00f4shsho I",
    "bnName": "\u09b9\u09cd\u09b0\u09b8\u09cd\u09ac \u0987",
    "type": "vowel",
    "ex": {
      "bn": "\u0987\u0981\u09a6\u09c1\u09b0",
      "tr": "\u0129dur",
      "en": "rat"
    },
    "pos": "initial"
  },
  {
    "ch": "\u0988",
    "name": "Dirgho I",
    "bnName": "\u09a6\u09c0\u09b0\u09cd\u0998 \u0988",
    "type": "vowel",
    "ex": {
      "bn": "\u0988\u0997\u09b2",
      "tr": "ig\u00f4l",
      "en": "eagle"
    },
    "pos": "initial"
  },
  {
    "ch": "\u0989",
    "name": "R\u00f4shsho U",
    "bnName": "\u09b9\u09cd\u09b0\u09b8\u09cd\u09ac \u0989",
    "type": "vowel",
    "ex": {
      "bn": "\u0989\u099f",
      "tr": "u\u1e6d",
      "en": "camel"
    },
    "pos": "initial"
  },
  {
    "ch": "\u098a",
    "name": "Dirgho U",
    "bnName": "\u09a6\u09c0\u09b0\u09cd\u0998 \u098a",
    "type": "vowel",
    "ex": {
      "bn": "\u098a\u09b7\u09be",
      "tr": "u\u1e63a",
      "en": "dawn"
    },
    "pos": "initial"
  },
  {
    "ch": "\u098b",
    "name": "Ri",
    "bnName": "\u098b",
    "type": "vowel",
    "ex": {
      "bn": "\u098b\u09b7\u09bf",
      "tr": "ri\u1e63i",
      "en": "sage"
    },
    "pos": "initial"
  },
  {
    "ch": "\u098f",
    "name": "E",
    "bnName": "\u098f",
    "type": "vowel",
    "ex": {
      "bn": "\u098f\u0995",
      "tr": "\u00eak",
      "en": "one"
    },
    "pos": "initial"
  },
  {
    "ch": "\u0990",
    "name": "Oi",
    "bnName": "\u0990",
    "type": "vowel",
    "ex": {
      "bn": "\u0990\u09b0\u09be\u09ac\u09a4",
      "tr": "\u00f4irab\u00f4t",
      "en": "Airavat (mythical elephant)"
    },
    "pos": "initial"
  },
  {
    "ch": "\u0993",
    "name": "O",
    "bnName": "\u0993",
    "type": "vowel",
    "ex": {
      "bn": "\u0993\u09b2",
      "tr": "\u00f4l",
      "en": "yam"
    },
    "pos": "initial"
  },
  {
    "ch": "\u0994",
    "name": "Ou",
    "bnName": "\u0994",
    "type": "vowel",
    "ex": {
      "bn": "\u0994\u09b7\u09a7",
      "tr": "\u00f4u\u1e63\u00f4dh",
      "en": "medicine"
    },
    "pos": "initial"
  },
  {
    "ch": "\u0995",
    "name": "K\u00f4",
    "bnName": "\u0995",
    "type": "consonant",
    "ex": {
      "bn": "\u0995\u09b2\u09ae",
      "tr": "k\u00f4l\u00f4m",
      "en": "pen"
    },
    "pos": "initial"
  },
  {
    "ch": "\u0996",
    "name": "Kh\u00f4",
    "bnName": "\u0996",
    "type": "consonant",
    "ex": {
      "bn": "\u0996\u09ac\u09b0",
      "tr": "kh\u00f4b\u00f4r",
      "en": "news"
    },
    "pos": "initial"
  },
  {
    "ch": "\u0997",
    "name": "G\u00f4",
    "bnName": "\u0997",
    "type": "consonant",
    "ex": {
      "bn": "\u0997\u09b0\u09c1",
      "tr": "g\u00f4ru",
      "en": "cow"
    },
    "pos": "initial"
  },
  {
    "ch": "\u0998",
    "name": "Gh\u00f4",
    "bnName": "\u0998",
    "type": "consonant",
    "ex": {
      "bn": "\u0998\u09a1\u09bc\u09bf",
      "tr": "gh\u00f4\u1e5bi",
      "en": "clock"
    },
    "pos": "initial"
  },
  {
    "ch": "\u0999",
    "name": "Ung\u00f4",
    "bnName": "\u0999",
    "type": "consonant",
    "ex": {
      "bn": "\u09b0\u0999",
      "tr": "r\u00f4ng",
      "en": "colour"
    },
    "pos": "final"
  },
  {
    "ch": "\u099a",
    "name": "Ch\u00f4",
    "bnName": "\u099a",
    "type": "consonant",
    "ex": {
      "bn": "\u099a\u09be\u0981\u09a6",
      "tr": "ch\u00e3d",
      "en": "moon"
    },
    "pos": "initial"
  },
  {
    "ch": "\u099b",
    "name": "Chh\u00f4",
    "bnName": "\u099b",
    "type": "consonant",
    "ex": {
      "bn": "\u099b\u09ac\u09bf",
      "tr": "chh\u00f4bi",
      "en": "picture"
    },
    "pos": "initial"
  },
  {
    "ch": "\u099c",
    "name": "J\u00f4",
    "bnName": "\u099c",
    "type": "consonant",
    "ex": {
      "bn": "\u099c\u09b2",
      "tr": "j\u00f4l",
      "en": "water"
    },
    "pos": "initial"
  },
  {
    "ch": "\u099d",
    "name": "Jh\u00f4",
    "bnName": "\u099d",
    "type": "consonant",
    "ex": {
      "bn": "\u099d\u09a1\u09bc",
      "tr": "jh\u00f4\u1e5b",
      "en": "storm"
    },
    "pos": "initial"
  },
  {
    "ch": "\u099e",
    "name": "Ni\u00f4",
    "bnName": "\u099e",
    "type": "consonant",
    "ex": {
      "bn": "\u099a\u099e\u09cd\u099a\u09b2",
      "tr": "ch\u00f4nch\u00f4l",
      "en": "restless"
    },
    "pos": "middle"
  },
  {
    "ch": "\u099f",
    "name": "\u1e6c\u00f4",
    "bnName": "\u099f",
    "type": "consonant",
    "ex": {
      "bn": "\u099f\u09bf\u09af\u09bc\u09be",
      "tr": "\u1e6dia",
      "en": "parrot"
    },
    "pos": "initial"
  },
  {
    "ch": "\u09a0",
    "name": "\u1e6ch\u00f4",
    "bnName": "\u09a0",
    "type": "consonant",
    "ex": {
      "bn": "\u09a0\u09cb\u0981\u099f",
      "tr": "\u1e6dh\u00f5\u1e6d",
      "en": "lips"
    },
    "pos": "initial"
  },
  {
    "ch": "\u09a1",
    "name": "\u1e0c\u00f4",
    "bnName": "\u09a1",
    "type": "consonant",
    "ex": {
      "bn": "\u09a1\u09be\u09ac",
      "tr": "\u1e0dab",
      "en": "green coconut"
    },
    "pos": "initial"
  },
  {
    "ch": "\u09a2",
    "name": "\u1e0ch\u00f4",
    "bnName": "\u09a2",
    "type": "consonant",
    "ex": {
      "bn": "\u09a2\u09cb\u09b2",
      "tr": "\u1e0dh\u00f4l",
      "en": "drum"
    },
    "pos": "initial"
  },
  {
    "ch": "\u09a3",
    "name": "N\u00f4 (retroflex)",
    "bnName": "\u09a3",
    "type": "consonant",
    "ex": {
      "bn": "\u09ac\u09b0\u09cd\u09a3",
      "tr": "b\u00f4r\u1e47\u00f4",
      "en": "letter"
    },
    "pos": "middle"
  },
  {
    "ch": "\u09a4",
    "name": "T\u00f4",
    "bnName": "\u09a4",
    "type": "consonant",
    "ex": {
      "bn": "\u09a4\u09be\u09b2",
      "tr": "tal",
      "en": "palm fruit"
    },
    "pos": "initial"
  },
  {
    "ch": "\u09a5",
    "name": "Th\u00f4",
    "bnName": "\u09a5",
    "type": "consonant",
    "ex": {
      "bn": "\u09a5\u09be\u09b2\u09be",
      "tr": "thala",
      "en": "plate"
    },
    "pos": "initial"
  },
  {
    "ch": "\u09a6",
    "name": "D\u00f4",
    "bnName": "\u09a6",
    "type": "consonant",
    "ex": {
      "bn": "\u09a6\u09b0\u099c\u09be",
      "tr": "d\u00f4rja",
      "en": "door"
    },
    "pos": "initial"
  },
  {
    "ch": "\u09a7",
    "name": "Dh\u00f4",
    "bnName": "\u09a7",
    "type": "consonant",
    "ex": {
      "bn": "\u09a7\u09be\u09a8",
      "tr": "dhan",
      "en": "paddy"
    },
    "pos": "initial"
  },
  {
    "ch": "\u09a8",
    "name": "N\u00f4",
    "bnName": "\u09a8",
    "type": "consonant",
    "ex": {
      "bn": "\u09a8\u09a6\u09c0",
      "tr": "n\u00f4di",
      "en": "river"
    },
    "pos": "initial"
  },
  {
    "ch": "\u09aa",
    "name": "P\u00f4",
    "bnName": "\u09aa",
    "type": "consonant",
    "ex": {
      "bn": "\u09aa\u09be\u0996\u09bf",
      "tr": "pakhi",
      "en": "bird"
    },
    "pos": "initial"
  },
  {
    "ch": "\u09ab",
    "name": "Ph\u00f4",
    "bnName": "\u09ab",
    "type": "consonant",
    "ex": {
      "bn": "\u09ab\u09b2",
      "tr": "ph\u00f4l",
      "en": "fruit"
    },
    "pos": "initial"
  },
  {
    "ch": "\u09ac",
    "name": "B\u00f4",
    "bnName": "\u09ac",
    "type": "consonant",
    "ex": {
      "bn": "\u09ac\u0987",
      "tr": "b\u00f4i",
      "en": "book"
    },
    "pos": "initial"
  },
  {
    "ch": "\u09ad",
    "name": "Bh\u00f4",
    "bnName": "\u09ad",
    "type": "consonant",
    "ex": {
      "bn": "\u09ad\u09be\u09a4",
      "tr": "bhat",
      "en": "rice"
    },
    "pos": "initial"
  },
  {
    "ch": "\u09ae",
    "name": "M\u00f4",
    "bnName": "\u09ae",
    "type": "consonant",
    "ex": {
      "bn": "\u09ae\u09be\u099b",
      "tr": "machh",
      "en": "fish"
    },
    "pos": "initial"
  },
  {
    "ch": "\u09af",
    "name": "J\u00f4 (palatal)",
    "bnName": "\u09af",
    "type": "consonant",
    "ex": {
      "bn": "\u09af\u09be\u09a6\u09c1",
      "tr": "jadu",
      "en": "magic"
    },
    "pos": "initial"
  },
  {
    "ch": "\u09b0",
    "name": "R\u00f4",
    "bnName": "\u09b0",
    "type": "consonant",
    "ex": {
      "bn": "\u09b0\u09be\u09a4",
      "tr": "rat",
      "en": "night"
    },
    "pos": "initial"
  },
  {
    "ch": "\u09b2",
    "name": "L\u00f4",
    "bnName": "\u09b2",
    "type": "consonant",
    "ex": {
      "bn": "\u09b2\u09c7\u09ac\u09c1",
      "tr": "lebu",
      "en": "lemon"
    },
    "pos": "initial"
  },
  {
    "ch": "\u09b6",
    "name": "Sh\u00f4",
    "bnName": "\u09b6",
    "type": "consonant",
    "ex": {
      "bn": "\u09b6\u09be\u09aa\u09b2\u09be",
      "tr": "shapla",
      "en": "water lily"
    },
    "pos": "initial"
  },
  {
    "ch": "\u09b7",
    "name": "\u1e62\u00f4",
    "bnName": "\u09b7",
    "type": "consonant",
    "ex": {
      "bn": "\u09b7\u09be\u0981\u09a1\u09bc",
      "tr": "\u1e63\u00e3\u1e5b",
      "en": "bull"
    },
    "pos": "initial"
  },
  {
    "ch": "\u09b8",
    "name": "S\u00f4",
    "bnName": "\u09b8",
    "type": "consonant",
    "ex": {
      "bn": "\u09b8\u09be\u09aa",
      "tr": "sap",
      "en": "snake"
    },
    "pos": "initial"
  },
  {
    "ch": "\u09b9",
    "name": "H\u00f4",
    "bnName": "\u09b9",
    "type": "consonant",
    "ex": {
      "bn": "\u09b9\u09be\u09a4\u09bf",
      "tr": "hati",
      "en": "elephant"
    },
    "pos": "initial"
  },
  {
    "ch": "\u09a1\u09bc",
    "name": "\u1e5a\u00f4",
    "bnName": "\u09a1\u09bc",
    "type": "consonant",
    "ex": {
      "bn": "\u0997\u09be\u09a1\u09bc\u09bf",
      "tr": "ga\u1e5bi",
      "en": "car"
    },
    "pos": "middle"
  },
  {
    "ch": "\u09a2\u09bc",
    "name": "\u1e5ah\u00f4",
    "bnName": "\u09a2\u09bc",
    "type": "consonant",
    "ex": {
      "bn": "\u0986\u09b7\u09be\u09a2\u09bc",
      "tr": "a\u1e63a\u1e5bh",
      "en": "Asharh (Bengali month)"
    },
    "pos": "middle"
  },
  {
    "ch": "\u09af\u09bc",
    "name": "Y\u00f4",
    "bnName": "\u09af\u09bc",
    "type": "consonant",
    "ex": {
      "bn": "\u09ad\u09af\u09bc",
      "tr": "bh\u00f4y",
      "en": "fear"
    },
    "pos": "final"
  },
  {
    "ch": "\u09ce",
    "name": "Khanda-t\u00f4",
    "bnName": "\u09ce",
    "type": "consonant",
    "ex": {
      "bn": "\u09b9\u09a0\u09be\u09ce",
      "tr": "h\u00f4\u1e6dhat",
      "en": "suddenly"
    },
    "pos": "middle"
  },
  {
    "ch": "\u0982",
    "name": "Anusshar",
    "bnName": "\u0982",
    "type": "consonant",
    "ex": {
      "bn": "\u09b8\u09bf\u0982\u09b9",
      "tr": "singh\u00f4",
      "en": "lion"
    },
    "pos": "middle"
  },
  {
    "ch": "\u0983",
    "name": "Bish\u00f4rg\u00f4",
    "bnName": "\u0983",
    "type": "consonant",
    "ex": {
      "bn": "\u09a6\u09c1\u0983\u0996",
      "tr": "dukkh\u00f4",
      "en": "sorrow"
    },
    "pos": "middle"
  },
  {
    "ch": "\u0981",
    "name": "Ch\u00f4ndrobindu",
    "bnName": "\u0981",
    "type": "consonant",
    "ex": {
      "bn": "\u099a\u09be\u0981\u09a6",
      "tr": "ch\u00e3d",
      "en": "moon"
    },
    "pos": "middle"
  }
];
if (typeof module !== 'undefined' && module.exports) module.exports = { BA_LETTERS: BA_LETTERS };
