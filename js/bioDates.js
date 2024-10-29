document.addEventListener("DOMContentLoaded", function () {
    // Function to calculate age in years
    function calculateAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        // Adjust age if the birthday hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    // Dates of birth
    const myBirthDate = new Date(1996, 10, 7); // Replace with your birth date
    const weddingDate = new Date(2018, 7, 7); // Replace with your wedding date

    const sonBirthDate = new Date(2020, 4, 2); // Replace with your son's birth date
    const daughterBirthDate = new Date(2023, 10, 19); // Replace with your daughter's birth date

    // Calculate ages
    const myAge = calculateAge(myBirthDate);
    const ourWeddingDate = calculateAge(weddingDate);
    const sonAge = calculateAge(sonBirthDate);
    const daughterAge = calculateAge(daughterBirthDate);
    // const daughterAgeMonths = Math.floor((new Date() - daughterBirthDate) / (1000 * 60 * 60 * 24 * 31)); 
    // Approximate months

    // Update the HTML with the calculated ages
    document.getElementById("my-age").textContent = myAge;
    document.getElementById("wedding-date").textContent = ourWeddingDate;
    document.getElementById("son-age").textContent = sonAge;
    document.getElementById("daughter-age").textContent = daughterAge;
});
