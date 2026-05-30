const skills = ["Logical_Thinking", "Coding", "Design", "Communication", "Management"];
let currentSkillIndex = 0;
let userResponses = {};

const chatBox = document.getElementById("chat-box");
const inputArea = document.getElementById("input-area");

function askNextQuestion() {
    if (currentSkillIndex < skills.length) {
        const skillName = skills[currentSkillIndex].replace("_", " ");
        appendMessage(`Rate your skill in **${skillName}** from 1 to 5:`, "bot-message");
        renderRatingButtons();
    } else {
        appendMessage("Analyzing your responses... Please wait.", "bot-message");
        submitResponses();
    }
}

function appendMessage(text, className) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${className}`;
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function renderRatingButtons() {
    inputArea.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
        const btn = document.createElement("button");
        btn.className = "btn-choice";
        btn.innerText = i;
        btn.onclick = () => handleUserSelection(i);
        inputArea.appendChild(btn);
    }
}

function handleUserSelection(rating) {
    appendMessage(`Rated: ${rating}`, "user-message");
    const activeSkill = skills[currentSkillIndex];
    userResponses[activeSkill] = rating;
    
    currentSkillIndex++;
    setTimeout(askNextQuestion, 600);
}

function submitResponses() {
    fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userResponses)
    })
    .then(res => res.json())
    .then(data => {
        if (data.recommended_role) {
            window.location.href = `/result?role=${encodeURIComponent(data.recommended_role)}`;
        } else {
            appendMessage("Error computing recommendation. Please try again.", "bot-message");
        }
    })
    .catch(() => {
        appendMessage("Server network failure.", "bot-message");
    });
}

// Kickoff chat initialization
askNextQuestion();
