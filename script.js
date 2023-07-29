document.getElementById('searchButton').addEventListener('click', function () {
    const searchValue = document.getElementById('searchInput').value;
    searchInCSV(searchValue);
});

function searchInCSV(value) {
    const filePath = 'lista.csv'; // Substitua pelo caminho correto do arquivo CSV
    Papa.parse(filePath, {
        download: true,
        delimiter: ',', // Indica que o arquivo CSV é separado por vírgulas
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
            displaySearchResults(results.data, value);
        }
    });
}

function displaySearchResults(data, value) {
    const resultTableBody = document.getElementById('resultTableBody');
    resultTableBody.innerHTML = '';

    const matchingRows = data.filter(row => row['Nome'] && row['Nome'].toLowerCase().includes(value.toLowerCase()));

    if (matchingRows.length === 0) {
        resultTableBody.innerHTML = '<tr><td colspan="2">Nenhum resultado encontrado.</td></tr>';
    } else {
        matchingRows.forEach(row => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${row['Arquivo']}</td>
                <td><a href="${row['Link']}" target="_blank"><button type="button" class="btn btn-success">Abrir PDF</button></a></td>
            `;
            resultTableBody.appendChild(newRow);
        });
    }

    document.getElementById('resultDiv').style.display = 'block';
}