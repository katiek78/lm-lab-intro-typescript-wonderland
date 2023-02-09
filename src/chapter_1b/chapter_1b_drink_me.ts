import { endAdventure } from "../..";
import { askQuestion, clear, print } from "../ui/console";
import { eatMe } from "../chapter_1c/chapter_1c_eat_me";
import { parseDrinkInput } from "../ui/parse_input";

export const BOTTLED_DRINKS = [
  "tequila",
  "original Lucozade",
  "Frijj",
  "milk",
  "Diet Coke",
] as const;
export type BottledDrink = typeof BOTTLED_DRINKS[number];
type Bottle = { drink: BottledDrink; label: string };
const bottles: Array<Bottle> = [
  { drink: "tequila", label: "Drink me now!" },
  { drink: "original Lucozade", label: "Drink me" },
  { drink: "Frijj", label: "Do not drink me! 🤮" },
  { drink: "milk", label: "Do not not drink me" },
  { drink: "Diet Coke", label: "Drink me if you like" },
];

export function drinkMe(): void {
  clear(true);
  print("You can see a tiny door 🚪 and a number of drinks in bottles: 🍾🍼🍸");
  bottles.forEach((b, i) =>
    print(
      `   ${i} - This bottle contains ${b.drink} and is labelled "${b.label}"`
    )
  );
  askQuestion("Which number bottle will you choose?", chooseDrink);
}

function chooseDrink(input: string): void {
  const drink = parseDrinkInput(input);

  if (drink === undefined) {
    print(`😮`);
    print(`${input} is an invalid input 😭`);
    return endAdventure();
  }

  return drinkDrink(drink);
}

export function drinkDrink(drink: BottledDrink): void {
  if (drink === "original Lucozade") {
    print(
      "You drink the contents of the bottle and suddenly you shrink to twelve inches high!"
    );
    print("Now you can fit through the door...");
    return askQuestion("Press ENTER to continue! ", eatMe);
  } else {
    print(`UH-OH! 🤯`);
    print(`You are too big for the door!`);
    return endAdventure();
  }
}
