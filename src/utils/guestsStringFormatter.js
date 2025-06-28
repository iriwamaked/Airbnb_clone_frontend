export function getGuestsParts({ adults, children, infants, pets }) {
    const parts=[];
    if (adults) parts.push(`${adults} ${adults === 1 ? "дорослий" : "дорослих"}`);
    if (children) parts.push(`${children} ${children === 1 ? "дитина" : "дітей"}`);
    if (infants) parts.push(`${infants} ${infants === 1 ? "немовля" : "немовлят"}`);
    if (pets) parts.push(`${pets} ${pets === 1 ? "тварина" : "тварини"}`);

    return parts;
}

export function getGuestsSummary(guests) {
    const parts = getGuestsParts(guests);
    return parts.length > 0 ? parts.join(", ") : "Виберіть гостей";
}

export function getGuestsString(totalGuests) {
    return totalGuests === 1
        ? "гість"
        : totalGuests < 5
            ? "гостя"
            : "гостей";
}


export function getPetsString(pets) {
    return pets === 1
        ? "тварина"
        : pets < 5
            ? "тварини"
            : "тварин";
}