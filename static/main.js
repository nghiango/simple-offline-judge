document.getElementById('judge-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const response = await fetch('/run', {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    document.getElementById('result').textContent = data.result;
});
