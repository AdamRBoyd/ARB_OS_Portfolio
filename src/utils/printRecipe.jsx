const escapeHtml = (value = '') => {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};

const buildIngredients = (recipe) => {
    return Array.from({ length: 20 }, (_, i) => i + 1)
        .map((num) => {
            const ingredient = recipe[`strIngredient${num}`];
            const measure = recipe[`strMeasure${num}`];

            if (ingredient && ingredient.trim() !== '') {
                const safeIngredient = escapeHtml(ingredient.trim());
                const safeMeasure = escapeHtml(measure ? measure.trim() : '');

                return `<li>${safeMeasure} ${safeIngredient}</li>`;
            }

            return '';
        })
        .join('');
};

const printRecipe = (recipe) => {
    if (!recipe) return;

    const safeTitle = escapeHtml(recipe.strMeal);
    const safeImageUrl = escapeHtml(recipe.strMealThumb || '');
    const safeInstructions = escapeHtml(recipe.strInstructions || '');
    const ingredients = buildIngredients(recipe);

    const printWindow = window.open('', '_blank', 'width=900,height=700');

    if (!printWindow) return;

    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>${safeTitle}</title>
                <style>
                    @page {
                        margin: 0.5in;
                    }

                    * {
                        box-sizing: border-box;
                    }

                    body {
                        margin: 0;
                        font-family: Arial, Helvetica, sans-serif;
                        color: #000;
                        background: #fff;
                    }

                    .page {
                        max-width: 7.5in;
                        margin: 0 auto;
                    }

                    h1 {
                        font-size: 28px;
                        margin: 0 0 0.25in;
                        padding-bottom: 0.1in;
                        border-bottom: 2px solid #000;
                    }

                    .top {
                        display: grid;
                        grid-template-columns: 3in 1fr;
                        gap: 0.3in;
                        align-items: start;
                        margin-bottom: 0.3in;
                    }

                    img {
                        width: 100%;
                        height: auto;
                        display: block;
                    }

                    h2 {
                        font-size: 18px;
                        margin: 0 0 0.12in;
                    }

                    ul {
                        list-style: none;
                        padding: 0;
                        margin: 0;
                        font-size: 12px;
                        line-height: 1.5;
                    }

                    li {
                        margin-bottom: 0.06in;
                    }

                    .instructions {
                        font-size: 12px;
                        line-height: 1.5;
                        white-space: pre-wrap;
                        overflow-wrap: anywhere;
                        word-break: break-word;
                    }
                </style>
            </head>
            <body>
                <div class="page">
                    <h1>${safeTitle}</h1>

                    <div class="top">
                        ${
                            safeImageUrl
                                ? `<img src="${safeImageUrl}" alt="${safeTitle}" />`
                                : ''
                        }

                        <div>
                            <h2>Ingredients</h2>
                            <ul>${ingredients}</ul>
                        </div>
                    </div>

                    <div>
                        <h2>Instructions</h2>
                        <div class="instructions">${safeInstructions}</div>
                    </div>
                </div>
            </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    const finalizePrint = () => {
        printWindow.print();
        printWindow.close();
    };

    if (safeImageUrl) {
        const img = printWindow.document.querySelector('img');

        if (img) {
            img.onload = finalizePrint;
            img.onerror = finalizePrint;
            return;
        }
    }

    finalizePrint();
};

export default printRecipe;