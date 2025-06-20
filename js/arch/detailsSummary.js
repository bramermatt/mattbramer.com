document.addEventListener("DOMContentLoaded", function () {
    // Create details element
    const spoilerAlert = document.createElement("details");
    
    // Create summary element
    const summary = document.createElement("summary");
    
    // Create icon element
    const spoilerIcon = document.createElement("i");
    spoilerIcon.className = "fa-solid fa-plus"; // Initially a plus icon
    summary.appendChild(spoilerIcon);
    
    // Create text for summary
    const summaryText = document.createTextNode(" Spoiler Alert");
    summary.appendChild(summaryText);
    
    // Append summary to details
    spoilerAlert.appendChild(summary);
    
    // Create content for the spoiler
    const spoilerContent = document.createElement("p");
    spoilerContent.textContent = "This is the spoiler content that can be shown or hidden.";
    spoilerAlert.appendChild(spoilerContent);
    
    // Add event listener to toggle icon on details open/close
    spoilerAlert.addEventListener("toggle", () => {
        if (spoilerAlert.open) {
            spoilerIcon.classList.remove("fa-plus");
            spoilerIcon.classList.add("fa-minus");
        } else {
            spoilerIcon.classList.remove("fa-minus");
            spoilerIcon.classList.add("fa-plus");
        }
    });
    
    // Append the details element to the body (or another container)
    document.body.appendChild(spoilerAlert);
});
