import { meetTheCheshireCat } from "../chapter_2/chapter_2_cheshire_cat";
import { endAdventure } from "../..";
import { askQuestion, clear, print } from "../ui/console";
import { parseCakeInput } from "../ui/parse_input";

export const CAKE_TYPES = [
  "chocolate",
  "carrot",
  "red velvet",
  "fruit",
  "vanilla sponge",
] as const;

export type CakeType = typeof CAKE_TYPES[number]

type Cake = { cakeType: CakeType; slicesRemaining: number };

const cakes: Array<Cake> = [
  { cakeType: "chocolate", slicesRemaining: 10 },
  { cakeType: "carrot", slicesRemaining: 12 },
  { cakeType: "red velvet", slicesRemaining: 4 },
  { cakeType: "fruit", slicesRemaining: 6 },
  { cakeType: "vanilla sponge", slicesRemaining: 8 },
];

//export function eatMe(startingHeight: number = 1): void {
export function eatMe(): void {
  clear(true);
  print("The tiny door 🚪 is locked. 🔐😫");
  print("You left the key on the table but now you're too small to reach it!");
  print("You see a variety of cakes 🍰🎂😋!");
  
  let height = 1;

  cakes.forEach((c, i) =>
    print(
      `   ${i} - This cake is ${c.cakeType} and there are ${c.slicesRemaining} slices left`
    )
  );
  askQuestion("Which number cake will you choose?", chooseCake);
  // if (height === 5 return meetTheCheshireCat();
}

function chooseCake(input: string): void {
  const cake = parseCakeInput(input);
  if (cake === undefined) {
    print(`😮`);
    print(`${input} is an invalid input 😭`);
    return endAdventure();
  }

  return eatCake(cake);
}

function eatCake(cake: CakeType): void {
    if (cake === 'carrot') {
        print(`You eat the ${cake} cake`);
    
    print("Now you are tall enough to reach the key!");
    print("You then drink a little more Lucozade to shrink again to fit through the door!")
    return askQuestion("Press ENTER to continue! ", meetTheCheshireCat)
    } else {
        print("OH NO! 😑");
        print("You are still too small to reach the key!");
        return endAdventure();
    }
}
