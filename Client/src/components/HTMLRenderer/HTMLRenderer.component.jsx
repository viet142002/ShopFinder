function HTMLRenderer({ htmlString, className }) {
    if (htmlString.includes('ul')) {
        className += '';
    }
    if (htmlString.includes('ol')) {
        className += '';
    }
    if (htmlString.includes('li')) {
        // find all index of li tag and add class
        let index = 0;
        let i = -1;
        while ((i = htmlString.indexOf('<li>', i + 1)) >= 0) {
            index = i;
            htmlString =
                htmlString.slice(0, index) +
                '<li class="ml-4">' +
                htmlString.slice(index + 4);
        }
    }
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: htmlString }}
        />
    );
}

export default HTMLRenderer;
