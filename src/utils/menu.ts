export const getMenuTitle = (type: string): string => {
    const names = { bun: "Булки", sauce: "Соусы", main: "Начинки" };
    return names[type];
};
