import { Hole, HOLES } from '../chapter_1/chapter_1.types';
import { BottledDrink, BOTTLED_DRINKS } from '../chapter_1b/chapter_1b_drink_me';
import { cakes, Cake } from '../chapter_1c/chapter_1c_eat_me';

// 💡 This `parseHoleInput` function exists to keep user input (which can be anything)
//    away from our logic, which we want to keep clean using our nice neat types like `Hole`
//    This function translates all possible user inputs into either:
//           a Hole    👈 if the input is valid
//			 undefined 👈 if the input is invalid
export function parseHoleInput(input: string): Hole | undefined {
	//  It might seem like we know this is a number,
	//  but of course the user can enter any nonsense to the prompt!
	const chosenHole = parseInt(input);

	// now we verify it's valid
	if (isNaN(chosenHole)) {
		return undefined;
	}

	if (chosenHole < 0 || chosenHole > HOLES.length - 1) {
		return undefined;
	}

	// we know the input is valid so we can return a Hole
	return HOLES[chosenHole];
}

export function parseDrinkInput(input: string): BottledDrink | undefined {
	const chosenDrink = parseInt(input);

	if (isNaN(chosenDrink)) {
		return undefined;
	}

	if (chosenDrink < 0 || chosenDrink > BOTTLED_DRINKS.length - 1) {
		return undefined;
	}

	// we know the input is valid so we can return a Drink
	return BOTTLED_DRINKS[chosenDrink];
}

/*export function parseCakeInput(input: string): CakeType | undefined {
	const chosenCake = parseInt(input);

	if (isNaN(chosenCake)) {
		return undefined;
	}

	if (chosenCake < 0 || chosenCake > CAKE_TYPES.length - 1) {
		return undefined;
	}

	// we know the input is valid so we can return a Drink
	return CAKE_TYPES[chosenCake];
}*/

export function parseCakeInput(input: string): Cake | undefined {
	const chosenCake = parseInt(input);

	if (isNaN(chosenCake) || chosenCake === null) {
		return undefined;
	}

	if (chosenCake < 0 || chosenCake > cakes.length - 1) {
		return undefined;
	}

	// we know the input is valid so we can return a Drink
	return cakes[chosenCake];
}