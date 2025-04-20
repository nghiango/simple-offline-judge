document.getElementById('judge-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    // Disable buttons
    var judgeBtn = document.getElementById('judge-btn');
    var runBatchBtn = document.getElementById('run-batch-btn');
    if (judgeBtn) judgeBtn.disabled = true;
    if (runBatchBtn) runBatchBtn.disabled = true;
    // Hide result, show spinner
    document.getElementById('result').style.display = 'none';
    document.getElementById('result-loading').style.display = 'block';
    document.getElementById('result-section').style.display = 'block';
    const formData = new FormData(this);
    try {
        const response = await fetch('/run', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        document.getElementById('result').textContent = data.result;
        document.getElementById('result').style.display = 'block';
        document.getElementById('result-loading').style.display = 'none';
    } finally {
        if (judgeBtn) judgeBtn.disabled = false;
        if (runBatchBtn) runBatchBtn.disabled = false;
    }
});
