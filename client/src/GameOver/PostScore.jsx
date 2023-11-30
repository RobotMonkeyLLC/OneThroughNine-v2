export default function PostScore() {
    
    const handleSubmit = (event) => {
        event.preventDefault()
        const name = document.getElementById('name').value
        const seconds = document.getElementById('timer').textContent
        const score = seconds
        const date = new Date()
        const data = {name, score, date}
        console.log('data', data)
        fetch('http://localhost:8000/post_score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                const postScoreForm = document.getElementById('post-score-form')
                postScoreForm.reset()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    
    return (
        <div id = "post-score" >
            <form id="post-score-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" required></input>
                <button type="button" value='Cancel' >Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}