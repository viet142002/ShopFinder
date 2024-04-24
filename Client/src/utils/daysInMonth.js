export function daysInMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    return new Date(year, month, 0).getDate();
}
