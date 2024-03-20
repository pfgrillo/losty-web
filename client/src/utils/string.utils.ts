export const toCamelCase = (input: string): string => {
    return input
        .split(' ')
        .map((word, index) => {
            if (index === 0) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
            return ' ' + word.charAt(0).toLowerCase() + word.slice(1).toLowerCase();
        })
        .join('');
};





