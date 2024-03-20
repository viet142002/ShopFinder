function HTMLRenderer({ htmlString, className }) {
    // custom class for h1, h2, h3, h4, h5, h6 tags in htmlString
    htmlString = htmlString.replace(/<h1/g, '<h1 class="text-2xl font-bold"');
    htmlString = htmlString.replace(/<h2/g, '<h2 class="text-1xl font-bold"');
    htmlString = htmlString.replace(/<h3/g, '<h3 class="text-xl font-bold"');
    htmlString = htmlString.replace(/<h4/g, '<h4 class="text-lg font-bold"');
    htmlString = htmlString.replace(
        /<h5/g,
        '<h5 class="text-lg font-semibold"'
    );
    htmlString = htmlString.replace(/<h6/g, '<h6 class="text-base font-bold"');

    // custom class for ul, ol, li tags in htmlString
    htmlString = htmlString.replace(/<ul/g, '<ul class="list-disc"');
    htmlString = htmlString.replace(/<ol/g, '<ol class="list-decimal"');
    htmlString = htmlString.replace(/<li/g, '<li class="mb-1 ml-4"');

    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: htmlString }}
        />
    );
}

export default HTMLRenderer;
