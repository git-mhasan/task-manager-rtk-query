export const getDayinNumber = (dateString) => {
    return new Date(dateString).getDate();
}

export const getMonthName = (dateString) => {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date(dateString);
    return monthNames[date.getMonth()];
}