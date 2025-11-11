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
        resultInput.value = 'Processing...';

        try {
            const response = await fetch('/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: question })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            resultInput.value = data.result;
        } catch (error) {
            console.error('Error:', error);
            resultInput.value = 'An error occurred while processing the question.';
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
