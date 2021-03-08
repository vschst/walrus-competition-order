export const getFormattedDate = (birthdate: Date): string => {
    const date = new Date(birthdate);
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return day + '.' + month + '.' + year;
};