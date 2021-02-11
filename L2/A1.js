let diceRoll=[1,6,6,2,3,4,6];

function get6s_v1 (dices) {
  dices.forEach((dice, i) => {
    if (dice === 6) {
      console.log(i.toString() + ":" + dice);
    }
  });
}

function is6 (v) {
  return v === 6;
}

function get6s_v2 (dices) {
  dices.forEach((dice, i) => {
    if (is6(dice)) {
      console.log(i.toString() + ":" + dice);
    }
  });
}

function get6s_v3 (dices, compare) {
  dices.forEach((dice, i) => {
    if (compare(dice)) {
      console.log(i.toString() + ":" + dice);
    }
  });
}

function findDices_v1 (dices, compare) {
  dices.forEach((dice, i) => {
    if (compare(dice)) {
      console.log(i.toString() + ":" + dice.toString());
    }
  });
}

function lessThanEqual (i) {
  return j => j <= i;
}

get6s_v1(diceRoll);
console.log("\n");
get6s_v2(diceRoll);
console.log("\n");
get6s_v3(diceRoll, is6);
console.log("\n");
findDices_v1(diceRoll, dice => {
  return dice === 1;
});
console.log("\n");
findDices_v1(diceRoll, lessThanEqual(3));