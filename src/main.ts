type Recipe = {
    id: number;
    name: string;
    userId: number;
    message?: string;
};

type User = {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    message?: string;
};

async function getChefBirthday(id: number): Promise<string> {
    let recipe: Recipe;

    try {
        const recipeResponse: Response = await fetch(`https://dummyjson.com/recipes/${id}`);
        recipe = await recipeResponse.json() as Recipe;
    } catch (error) {
        throw new Error(`Errore nella richiesta della ricetta con id ${id}`);
    }

    if (recipe.message) {
        throw new Error(recipe.message);
    }

    let user: User;

    try {
        const userResponse: Response = await fetch(`https://dummyjson.com/users/${recipe.userId}`);
        user = await userResponse.json() as User;
    } catch (error) {
        throw new Error(`Errore nella richiesta dell'utente con id ${recipe.userId}`);
    }

    if (user.message) {
        throw new Error(user.message);
    }

    return user.birthDate;
}

(async (): Promise<void> => {
    try {
        const birthday: string = await getChefBirthday(1);
        console.log("Data di nascita dello chef:", birthday);
    } catch (error: any) {
        console.error("Errore:", error.message);
    }
})();