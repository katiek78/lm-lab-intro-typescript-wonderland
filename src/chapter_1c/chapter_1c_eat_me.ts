import { meetTheCheshireCat } from "../chapter_2/chapter_2_cheshire_cat";
import { endAdventure } from "../..";
import { askQuestion, clear, print } from "../ui/console";
import { parseCakeInput } from "../ui/parse_input";

const CAKE_TYPES = [
  "chocolate",
  "carrot",
  "red velvet",
  "fruit",
  "vanilla sponge",
] as const;

type CakeType = typeof CAKE_TYPES[number];

export type Cake = { cakeType: CakeType; slicesRemaining: number; potency: number };

export const cakes: Array<Cake> = [
  { cakeType: "chocolate", slicesRemaining: 10, potency: 3 },
  { cakeType: "carrot", slicesRemaining: 12, potency: 4 },
  { cakeType: "red velvet", slicesRemaining: 4, potency: 1 },
  { cakeType: "fruit", slicesRemaining: 6, potency: 2 },
  { cakeType: "vanilla sponge", slicesRemaining: 8, potency: 5 },
];

let currentHeight = 1;
let selectedCake : Cake | null = null;

export function eatMe(): void {
  clear(true);
  print("The tiny door 🚪 is locked. 🔐😫");
  print("You left the key on the table but now you're too small to reach it!");
  print("You see a variety of cakes 🍰🎂😋!");

  return displayCakes();
}

function displayCakes(): void {
  cakes.forEach((c, i) =>
    print(
      `   ${i} - This is a ${c.cakeType} cake with a potency of ${c.potency} and there ${
        c.slicesRemaining === 1 ? "is" : "are"
      } ${c.slicesRemaining} slice${c.slicesRemaining === 1 ? "" : "s"} left`
    )
  );
  print(
    `Your current height is ${currentHeight
      .toFixed(2)
      .toString()} foot and you need to be at least 4 foot high to reach the key.`
  );
  askQuestion("Which number cake will you choose?", chooseCake);
}

function chooseCake(input: string): void {
  const cake = parseCakeInput(input);
  if (cake === undefined) {
    print(`😮`);
    print(`${input} is an invalid input 😭`);
    return endAdventure();
  }
  selectedCake = cake;
  askQuestion("How many slices will you eat?", chooseNumberOfSlices);
}

function chooseNumberOfSlices(input: string): void {
  if (selectedCake === null) return endAdventure();
  return eatCake(selectedCake, parseInt(input));
}

function eatCake(cake: Cake, numberOfSlices: number): void {  
  
  const slicesToBeEaten =
    numberOfSlices <= cake.slicesRemaining
      ? numberOfSlices
      : cake.slicesRemaining;

  if (slicesToBeEaten === 0) {
    print("OH NO! 😑");
    print("No slices left!");
    return displayCakes();
  }
  print(
    `You eat ${slicesToBeEaten.toString()} slice${
      cake.slicesRemaining === 1 ? "" : "s"
    } of the ${cake.cakeType} cake. It's delicious!`
  );

  //update height
  currentHeight += (cake.potency / 12) * numberOfSlices;
  print(
    `Your height is now ${currentHeight.toFixed(2).toString()} foot.`
  );

  //update slicesRemaining
  cake.slicesRemaining -= slicesToBeEaten;

  if (currentHeight >= 4) {
    print("Now you are tall enough to reach the key! 🗝");
    print(
      "You drink a little more Lucozade to shrink again to fit through the door!"
    );

    return askQuestion("Press ENTER to continue! ", meetTheCheshireCat);
  } else {
    print("OH NO! 😑");
    print("You are still too small to reach the key!");
    return displayCakes();
  }
}
