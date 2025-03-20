// Function to send message to GPT4All API
async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return; // Prevent empty messages

    // Display User Message
    displayMessage(userInput, "user-message");

    // Show typing animation
    let botTyping = document.createElement("div");
    botTyping.className = "bot-message";
    botTyping.innerHTML = "Typing...";
    document.getElementById("chat-box").appendChild(botTyping);
    document.getElementById("chat-box").scrollTop = document.getElementById("chat-box").scrollHeight;

    // Fetch response from Flask API
    try {
        let response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput }),
        });

        let data = await response.json();
        document.getElementById("chat-box").removeChild(botTyping); // Remove typing animation
        displayMessage(data.response, "bot-message");
    } catch (error) {
        document.getElementById("chat-box").removeChild(botTyping);
        displayMessage("Error! Could not connect to the chatbot.", "bot-message");
    }

    // Clear input field
    document.getElementById("user-input").value = "";
}

// Function to display messages in the chatbox
function displayMessage(message, className) {
    let chatBox = document.getElementById("chat-box");
    let messageDiv = document.createElement("div");
    messageDiv.className = className;
    messageDiv.innerHTML = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to latest message
}
