const addScript = document.createElement('script');
addScript.setAttribute(
    'src',
    '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
);
document.body.appendChild(addScript);
// debugger
window.googleTranslateElementInit = () => {
    const elements = document.getElementsByClassName('leaflet-routing-alt');
    if (elements.length > 0) {
        for (let i = 0; i < elements.length; i++) {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'en',
                    includedLanguages: 'en,es,vi'
                },
                elements[i]
            );
        }
    } else {
        console.error('No element with class "leaflet-routing-alt" found.');
    }
};
