
console.log("popup.js");

document.addEventListener("DOMContentLoaded", onContentLoaded);


function onContentLoaded() {
    let strictnessSelection = document.getElementById("strictness_level");
    let strictnessDescription = document.getElementById("choice_description");
    let conditionalInput = document.getElementById("conditional_input");
    let submitButton = document.getElementById("submit_button");

    let keywords = [];
    var strictnessMode;

    strictnessSelection.addEventListener("change", onStrictnessSelect);
    submitButton.addEventListener("click", onSubmit);

    function onStrictnessSelect() {
        conditionalInput.removeAttribute("hidden");
        strictnessDescription.removeAttribute("hidden");
        switch (strictnessSelection.value) {
            case "1":
                strictnessDescription.textContent = "Focus Search will warn you if a search is off topic."
                conditionalInput.innerHTML = '<label for="keywords_input">Enter relvent single keywords separated by a comma for the topic(s) you\'d like to focus on.</label><input id="keywords_input" type="text" placeholder = "keywords">'
                submitButton.removeAttribute("hidden");

                break;
            case "2":
                strictnessDescription.textContent = "Focus Search will stop your off topic searches."
                conditionalInput.innerHTML = '<label for="keywords_input">Enter relvent single keywords separated by a comma for the topic(s) you\'d like to focus on.</label><input id="keywords_input" type="text" placeholder = "keywords">'
                submitButton.removeAttribute("hidden");
                break;
        }
    }

    function onSubmit() {
        event.preventDefault();

        keywords = document.getElementById("keywords_input").value.trim().toLowerCase().split(/\s*,\s*/);
        strictnessMode = strictnessSelection.value;
        chrome.storage.sync.set({ strictnessMode, keywords });
        console.log(keywords);
    }

}
