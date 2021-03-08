export const getSwimmingStyleText = (swimmingStyle: string): string => {
    switch (swimmingStyle) {
        case 'breaststroke':
            return 'Брасс';
        case 'butterfly':
            return 'Баттерфляй';
        case 'crawl':
            return 'Кроль';
        case 'freestyle':
            return 'Вольный стиль';
    }

    return '';
};

export const getAgeGroupText = (
    minAge: number | null,
    maxAge: number | null,
): string => {
    if (minAge !== null && maxAge !== null) {
        return minAge + ' - ' + maxAge;
    } else if (minAge === null && maxAge !== null) {
        return 'до ' + (maxAge + 1);
    } else if (minAge !== null && maxAge === null) {
        return 'от ' + minAge;
    }

    return 'Любой возраст';
};