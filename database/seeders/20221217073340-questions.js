"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("questions", [
      {
        id: 1,
        questionaireId: 1,
        question: "What is your idea of perfect happiness?",
        questionCategory: "psychological information",
      },
      {
        id: 2,
        questionaireId: 1,
        question: "What is your greatest fear?",
        questionCategory: "psychological information",
      },
      {
        id: 3,
        questionaireId: 1,
        question: "What is the trait you most deplore in yourself?",
        questionCategory: "psychological information",
      },
      {
        id: 4,
        questionaireId: 1,
        question: "What is the trait you most deplore in others?",
        questionCategory: "psychological information",
      },
      {
        id: 5,
        questionaireId: 1,
        question: "Which living person do you most admire?",
        questionCategory: "psychological information",
      },
      {
        id: 6,
        questionaireId: 1,
        question: "What is your greatest extravagance?",
        questionCategory: "psychological information",
      },
      {
        id: 7,
        questionaireId: 1,
        question: "What is your current state of mind?",
        questionCategory: "psychological information",
      },
      {
        id: 8,
        questionaireId: 1,
        question: "What do you consider the most overrated virtue?",
        questionCategory: "psychological information",
      },
      {
        id: 9,
        questionaireId: 1,
        question: "On what occasion do you lie?",
        questionCategory: "psychological information",
      },
      {
        id: 10,
        questionaireId: 1,
        question: "What do you most dislike about your appearance?",
        questionCategory: "psychological information",
      },
      {
        id: 11,
        questionaireId: 1,
        question: "Which living person do you most despise?",
        questionCategory: "psychological information",
      },
      {
        id: 12,
        questionaireId: 1,
        question: "What is the quality you most like in a man?",
        questionCategory: "psychological information",
      },
      {
        id: 13,
        questionaireId: 1,
        question: "What is the quality you most like in a woman?",
        questionCategory: "psychological information",
      },
      {
        id: 14,
        questionaireId: 1,
        question: "Which words or phrases do you most overuse?",
        questionCategory: "psychological information",
      },
      {
        id: 15,
        questionaireId: 1,
        question: "What or who is the greatest love of your life?",
        questionCategory: "psychological information",
      },
      {
        id: 16,
        questionaireId: 1,
        question: "When and where were you happiest?",
        questionCategory: "psychological information",
      },
      {
        id: 17,
        questionaireId: 1,
        question: "Which talent would you most like to have?",
        questionCategory: "psychological information",
      },
      {
        id: 18,
        questionaireId: 1,
        question:
          "If you could change one thing about yourself, what would it be?",
        questionCategory: "psychological information",
      },
      {
        id: 19,
        questionaireId: 1,
        question: "What do you consider your greatest achievement?",
        questionCategory: "psychological information",
      },
      {
        id: 20,
        questionaireId: 1,
        question:
          "If you were to die and come back as a person or a thing, what would it be?",
        questionCategory: "psychological information",
      },
      {
        id: 21,
        questionaireId: 1,
        question: "Where would you most like to live?",
        questionCategory: "psychological information",
      },
      {
        id: 22,
        questionaireId: 1,
        question: "What is your most treasured possession?",
        questionCategory: "psychological information",
      },
      {
        id: 23,
        questionaireId: 1,
        question: "What do you regard as the lowest depth of misery?",
        questionCategory: "psychological information",
      },
      {
        id: 24,
        questionaireId: 1,
        question: "What is your favorite occupation?",
        questionCategory: "psychological information",
      },
      {
        id: 25,
        questionaireId: 1,
        question: "What is your most marked characteristic?",
        questionCategory: "psychological information",
      },
      {
        id: 26,
        questionaireId: 1,
        question: "What do you most value in your friends?",
        questionCategory: "psychological information",
      },
      {
        id: 27,
        questionaireId: 1,
        question: "Who are your favorite writers?",
        questionCategory: "psychological information",
      },
      {
        id: 28,
        questionaireId: 1,
        question: "Who is your hero of fiction?",
        questionCategory: "psychological information",
      },
      {
        id: 29,
        questionaireId: 1,
        question: "Which historical figure do you most identify with?",
        questionCategory: "psychological information",
      },
      {
        id: 30,
        questionaireId: 1,
        question: "Who are your heroes in real life?",
        questionCategory: "psychological information",
      },
      {
        id: 31,
        questionaireId: 1,
        question: "What are your favorite names?",
        questionCategory: "psychological information",
      },
      {
        id: 32,
        questionaireId: 1,
        question: "What is it that you most dislike?",
        questionCategory: "psychological information",
      },
      {
        id: 33,
        questionaireId: 1,
        question: "What is your greatest regret?",
        questionCategory: "psychological information",
      },
      {
        id: 34,
        questionaireId: 1,
        question: "How would you like to die?",
        questionCategory: "psychological information",
      },
      {
        id: 35,
        questionaireId: 1,
        question: "What is your motto?",
        questionCategory: "psychological information",
      },
      {
        id: 36,
        questionaireId: 2,
        question: "What is your favorite word?",
        questionCategory: "psychological information",
      },
      {
        id: 37,
        questionaireId: 2,
        question: "What is your least favorite word?",
        questionCategory: "psychological information",
      },
      {
        id: 38,
        questionaireId: 2,
        question: "What is your favorite drug?",
        questionCategory: "psychological information",
      },
      {
        id: 39,
        questionaireId: 2,
        question: "What sound or noise do you love?",
        questionCategory: "psychological information",
      },
      {
        id: 40,
        questionaireId: 2,
        question: "What sound or noise do you hate?",
        questionCategory: "psychological information",
      },
      {
        id: 41,
        questionaireId: 2,
        question: "What is your favorite curse word?",
        questionCategory: "psychological information",
      },
      {
        id: 42,
        questionaireId: 2,
        question: "Who would you like to see on a new banknote?",
        questionCategory: "psychological information",
      },
      {
        id: 43,
        questionaireId: 2,
        question:
          "What profession other than your own would you not like to attempt?",
        questionCategory: "psychological information",
      },
      {
        id: 44,
        questionaireId: 2,
        question:
          "If you were reincarnated as some other plant or animal, what would it be?",
        questionCategory: "psychological information",
      },
      {
        id: 45,
        questionaireId: 2,
        question:
          "If Heaven exists, what would you like to hear God say when you arrive at the Pearly Gates?",
        questionCategory: "psychological information",
      },
      {
        id: 46,
        questionaireId: 3,
        question: "What is your favorite word?",
        questionCategory: "psychological information",
      },
      {
        id: 47,
        questionaireId: 3,
        question: "What is your least favorite word?",
        questionCategory: "psychological information",
      },
      {
        id: 48,
        questionaireId: 3,
        question: "What turns you on creatively, spiritually or emotionally?",
        questionCategory: "psychological information",
      },
      {
        id: 49,
        questionaireId: 3,
        question: "What turns you off?",
        questionCategory: "psychological information",
      },
      {
        id: 50,
        questionaireId: 3,
        question: "What is your favorite curse word?",
        questionCategory: "psychological information",
      },
      {
        id: 51,
        questionaireId: 3,
        question: "What sound or noise do you love?",
        questionCategory: "psychological information",
      },
      {
        id: 52,
        questionaireId: 3,
        question: "What sound or noise do you hate?",
        questionCategory: "psychological information",
      },
      {
        id: 53,
        questionaireId: 3,
        question:
          "What profession other than your own would you like to attempt?",
        questionCategory: "psychological information",
      },
      {
        id: 54,
        questionaireId: 3,
        question: "What profession would you not like to do?",
        questionCategory: "psychological information",
      },
      {
        id: 55,
        questionaireId: 3,
        question:
          "If Heaven exists, what would you like to hear God say when you arrive at the Pearly Gates?",
        questionCategory: "psychological information",
      },
      {
        id: 56,
        questionaireId: 4,
        question: "Full name and aliases?",
        questionCategory: "brief history",
      },
      {
        id: 57,
        questionaireId: 4,
        question: "Addresses past and present with approximate dates?",
        questionCategory: "brief history",
      },
      {
        id: 58,
        questionaireId: 4,
        question: "Gender?",
        questionCategory: "brief history",
      },
      {
        id: 59,
        questionaireId: 4,
        question: "Race and culture?",
        questionCategory: "brief history",
      },
      {
        id: 60,
        questionaireId: 4,
        question: "Citizenship?",
        questionCategory: "brief history",
      },
      {
        id: 61,
        questionaireId: 4,
        question: "National origin?",
        questionCategory: "brief history",
      },
      {
        id: 62,
        questionaireId: 4,
        question: "Agewith date of birth?",
        questionCategory: "brief history",
      },
      {
        id: 63,
        questionaireId: 4,
        question: "Place of birth?",
        questionCategory: "brief history",
      },
      {
        id: 64,
        questionaireId: 4,
        question: "Occupationall known past and present jobs?",
        questionCategory: "brief history",
      },
      {
        id: 65,
        questionaireId: 4,
        question:
          "Ever in the military? If yes, where stationed? What occupation?",
        questionCategory: "brief history",
      },
      {
        id: 66,
        questionaireId: 4,
        question: "Parents names?",
        questionCategory: "brief history",
      },
      {
        id: 67,
        questionaireId: 4,
        question: "Parents living ? If yes, where ?",
        questionCategory: "brief history",
      },
      {
        id: 68,
        questionaireId: 4,
        question: "Where did character attend high school?",
        questionCategory: "brief history",
      },
      {
        id: 69,
        questionaireId: 4,
        question: "College?",
        questionCategory: "brief history",
      },
      {
        id: 70,
        questionaireId: 4,
        question: "College graduate?",
        questionCategory: "brief history",
      },
      {
        id: 71,
        questionaireId: 4,
        question: "Major in college?",
        questionCategory: "brief history",
      },
      {
        id: 72,
        questionaireId: 4,
        question: "Involved in athletics?",
        questionCategory: "brief history",
      },
      {
        id: 73,
        questionaireId: 4,
        question: "Any brothers or sisters? Names, addresses, occupations?",
        questionCategory: "brief history",
      },
      {
        id: 74,
        questionaireId: 4,
        question: "Other relatives? Names, addresses, occupations?",
        questionCategory: "brief history",
      },
      {
        id: 75,
        questionaireId: 4,
        question: "Marital status?",
        questionCategory: "brief history",
      },
      {
        id: 76,
        questionaireId: 4,
        question: "Married more than once?",
        questionCategory: "brief history",
      },
      {
        id: 77,
        questionaireId: 4,
        question: "Spouses full name?",
        questionCategory: "brief history",
      },
      {
        id: 78,
        questionaireId: 4,
        question: "Children? Names and ages?",
        questionCategory: "brief history",
      },
      {
        id: 79,
        questionaireId: 4,
        question: "Religious? Which faith?",
        questionCategory: "brief history",
      },
      {
        id: 80,
        questionaireId: 4,
        question: "Pets ?",
        questionCategory: "brief history",
      },
      {
        id: 81,
        questionaireId: 4,
        question: "Height:",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 82,
        questionaireId: 4,
        question: "weight:",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 83,
        questionaireId: 4,
        question: "build:",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 84,
        questionaireId: 4,
        question:
          "eyes (color, protruding, crossed, small, large, round, etc):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 85,
        questionaireId: 4,
        question: "hair (color, wears part, curly, wavy, bald, etc):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 86,
        questionaireId: 4,
        question:
          "complexion (florid, sallow, ruddy, dark, transparent, pocked, scarred, etc):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 87,
        questionaireId: 4,
        question: "visible marks or scars:",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 88,
        questionaireId: 4,
        question: "head (large, small, shape, inclined forward, or backward):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 89,
        questionaireId: 4,
        question: "forehead (high, low, medium, sloping, bulging, receding):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 90,
        questionaireId: 4,
        question:
          "eyebrows (slanting up or down, bushy, thin, arched, connected, penciled, faint):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 91,
        questionaireId: 4,
        question:
          "nose (large, small, pug, hooked, straight, flat, flaring nostrils):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 92,
        questionaireId: 4,
        question: "mustache (color, size, shape):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 93,
        questionaireId: 4,
        question: "mouth(large, small, arched up or down):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 94,
        questionaireId: 4,
        question: "lips (thick, thin, protruding, pouting, harelip, full):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 95,
        questionaireId: 4,
        question: "teeth (size, even, projecting, crowded, yellowed, missing):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 96,
        questionaireId: 4,
        question:
          "ears (size, close, projecting, missing, misaligned, cauliflower shape):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 97,
        questionaireId: 4,
        question: "chin (size, jutting, receding, square, double chin, cleft):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 98,
        questionaireId: 4,
        question:
          "face (long, round, square, sunken, high cheeks, bulging cheeks):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 99,
        questionaireId: 4,
        question:
          "neck (long, short, thick, thin, large adams apple, slender):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 100,
        questionaireId: 4,
        question: "shoulders (sloping, broad, narrow, erect, stooped, uneven):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 101,
        questionaireId: 4,
        question: "stomach (flat, bulging, firm):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 102,
        questionaireId: 4,
        question:
          "hands (large, small, rough, calloused, long or short fingers, manicured):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 103,
        questionaireId: 4,
        question: "posture (erect, slumping, military bearing, rigid, etc):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 104,
        questionaireId: 4,
        question:
          "walk (erect, stooped, slow, fast, graceful, limp, long or short strides, etc):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 105,
        questionaireId: 4,
        question:
          "speech (slow, fast, halting, mumbling, impediment, high or low pitch, sultry):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 106,
        questionaireId: 4,
        question:
          "characteristics (smacking of lips when eating, clicks false teeth, never smiles, laughs loudly, talks from side of mouth, other mannerisms):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 107,
        questionaireId: 4,
        question: "habits(clean, dirty, smokes, chews gum, obsessively clean):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 108,
        questionaireId: 4,
        question:
          "dress (neat, slovenly, cheap expensive, sports clothes, grunge, etc):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 109,
        questionaireId: 4,
        question:
          "health (chronic diseases or disability, deafness, frequent colds):",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 110,
        questionaireId: 4,
        question:
          "what does the character usually carry with them ? (sunglasses, satchel, notebook, lipstick) :",
        questionCategory: "physical description and unique characteristics",
      },
      {
        id: 111,
        questionaireId: 4,
        question: "favorite drink:",
        questionCategory: "psychological information",
      },
      {
        id: 112,
        questionaireId: 4,
        question: "favorite food:",
        questionCategory: "psychological information",
      },
      {
        id: 113,
        questionaireId: 4,
        question: "favorite color:",
        questionCategory: "psychological information",
      },
      {
        id: 114,
        questionaireId: 4,
        question: "favorite book:",
        questionCategory: "psychological information",
      },
      {
        id: 115,
        questionaireId: 4,
        question: "favorite movie:",
        questionCategory: "psychological information",
      },
      {
        id: 116,
        questionaireId: 4,
        question: "favorite season:",
        questionCategory: "psychological information",
      },
      {
        id: 117,
        questionaireId: 4,
        question: "favorite weather:",
        questionCategory: "psychological information",
      },
      {
        id: 118,
        questionaireId: 4,
        question: "hobby/skills:",
        questionCategory: "psychological information",
      },
      {
        id: 119,
        questionaireId: 4,
        question: "strong dislikes:",
        questionCategory: "psychological information",
      },
      {
        id: 120,
        questionaireId: 4,
        question: "biggest fear, why ?",
        questionCategory: "psychological information",
      },
      {
        id: 121,
        questionaireId: 4,
        question: "Long-term goal?",
        questionCategory: "psychological information",
      },
      {
        id: 122,
        questionaireId: 4,
        question: "Short-term goal?",
        questionCategory: "psychological information",
      },
      {
        id: 123,
        questionaireId: 4,
        question: "Most significant spiritual experience?",
        questionCategory: "psychological information",
      },
      {
        id: 124,
        questionaireId: 4,
        question: "Relationship with father?",
        questionCategory: "psychological information",
      },
      {
        id: 125,
        questionaireId: 4,
        question: "Relationship with mother?",
        questionCategory: "psychological information",
      },
      {
        id: 126,
        questionaireId: 4,
        question: "Relationship with siblings?",
        questionCategory: "psychological information",
      },
      {
        id: 127,
        questionaireId: 4,
        question: "Regrets?",
        questionCategory: "psychological information",
      },
      {
        id: 128,
        questionaireId: 4,
        question:
          "If character could change one major event in his/her life, what would it be?",
        questionCategory: "psychological information",
      },
      {
        id: 129,
        questionaireId: 4,
        question: "Easily angered?",
        questionCategory: "psychological information",
      },
      {
        id: 130,
        questionaireId: 4,
        question: "Melancholy?",
        questionCategory: "psychological information",
      },
      {
        id: 131,
        questionaireId: 4,
        question: "Introvert or extrovert?",
        questionCategory: "psychological information",
      },
      {
        id: 132,
        questionaireId: 4,
        question:
          "If character could choose the perfect job, what would it be?",
        questionCategory: "psychological information",
      },
      {
        id: 133,
        questionaireId: 4,
        question: "Ideal way to spend an evening?",
        questionCategory: "psychological information",
      },
      {
        id: 134,
        questionaireId: 4,
        question: "Top priority in characters life ?",
        questionCategory: "psychological information",
      },
      {
        id: 135,
        questionaireId: 4,
        question: "Most humiliating experience?",
        questionCategory: "psychological information",
      },
      {
        id: 136,
        questionaireId: 4,
        question: "Most triumphant experience?",
        questionCategory: "psychological information",
      },
      {
        id: 137,
        questionaireId: 4,
        question: "Type of people most comfortable spending time with?",
        questionCategory: "psychological information",
      },
      {
        id: 138,
        questionaireId: 4,
        question: "Personality traits most irritating in other people?",
        questionCategory: "psychological information",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("questions", null, {});
  },
};
