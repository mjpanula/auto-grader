document.addEventListener('DOMContentLoaded', function() {
    const questionInput = document.getElementById('questionInput');
    const resultInput = document.getElementById('resultInput');
    const submitBtn = document.getElementById('submitBtn');

    submitBtn.addEventListener('click', async function() {
        const question = questionInput.value.trim();
        
        if (!question) {
            alert('Please enter an exam question.');
            return;
        }

        // Disable button during processing
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
        resultInput.innerHTML = '<p class="processing">Processing...</p>';

        try {
            const response = await fetch('/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: question }),
                timeout: 30000
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            const markdownResult = data.result || 'No result returned';
            resultInput.innerHTML = marked.parse(markdownResult);
        } catch (error) {
            console.error('Error:', error);
            resultInput.innerHTML = `<p class="error">Error: ${error.message}</p>`;
            alert(`An error occurred: ${error.message}`);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
        }
    });

    // Optional: Allow Enter key to submit (Ctrl+Enter in textarea)
    questionInput.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            submitBtn.click();
        }
    });
});
