document.addEventListener("DOMContentLoaded", function () {
    const translationForm = document.getElementById("translationForm");
    const inputText = document.getElementById("inputText");
    const outputLanguageSelect = document.getElementById("outputLanguage");
    const translatedText = document.getElementById("translatedText");
    const copyButton = document.getElementById("copyButton");

    // Fetch translations from external JSON file
    fetch("translations.json")
        .then(response => response.json())
        .then(translations => {
            translationForm.addEventListener("submit", function (event) {
                event.preventDefault(); // Prevent default form submission

                if (!inputText.value.trim()) {
                    alert("Please enter text before translating.");
                    return;
                }

                const outputLanguage = outputLanguageSelect.value;
                const text = inputText.value;

                const translation = translateText(text, outputLanguage, translations);
                translatedText.innerHTML = translation;
                copyButton.style.display = "inline";
            });

            copyButton.addEventListener("click", function () {
                if (translatedText.textContent) {
                    copyToClipboard(translatedText.textContent);
                }
            });
        });

    function translateText(text, outputLanguage, translations) {
        const lowerCaseText = text.toLowerCase();
        const translatedText = translations[outputLanguage][lowerCaseText];

        return translatedText || "Translation not available...";
    }

    function copyToClipboard(text) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    }
});
