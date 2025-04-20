document.getElementById('judge-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    // Hide result section before sending request
    document.getElementById('result-section').style.display = 'none';
    const formData = new FormData(this);
    const response = await fetch('/run', {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    document.getElementById('result').textContent = data.result;
    // Show result section after receiving response
    document.getElementById('result-section').style.display = 'block';
});
