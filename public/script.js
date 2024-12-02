const socket = io();

// Dummy contacts and chat data
const contacts = ['Alice', 'Bob', 'Charlie'];
const chatData = {
  Alice: [{ sender: 'Alice', content: 'Hello!' }],
  Bob: [{ sender: 'Bob', content: 'Hey there!' }],
  Charlie: [{ sender: 'Charlie', content: 'Hi!' }],
};

let currentChat = 'Alice'; // Default chat

// Populate contacts
const contactList = document.getElementById('contactList');
contacts.forEach((contact) => {
  const li = document.createElement('li');
  li.className = 'list-group-item';
  li.textContent = contact;
  li.addEventListener('click', () => openChat(contact));
  contactList.appendChild(li);
});

// Render messages
function renderMessages() {
  const chatWindow = document.getElementById('chatWindow');
  chatWindow.innerHTML = ''; // Clear old messages

  chatData[currentChat].forEach((msg) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', msg.sender === 'You' ? 'sent' : 'received');

    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';
    contentDiv.textContent = msg.content;

    messageDiv.appendChild(contentDiv);
    chatWindow.appendChild(messageDiv);
  });

  // Auto-scroll
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Open chat
function openChat(contact) {
  currentChat = contact;
  document.getElementById('chatWith').textContent = `Chat with ${contact}`;
  renderMessages();
}

// Send message
document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
document.getElementById('messageInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});

function sendMessage() {
  const input = document.getElementById('messageInput');
  const content = input.value.trim();
  if (!content) return;

  // Update UI and notify server
  chatData[currentChat].push({ sender: 'You', content });
  socket.emit('chat message', { contact: currentChat, content });
  input.value = '';
  renderMessages();
}

// Real-time message handling
socket.on('chat message', (msg) => {
  if (msg.contact === currentChat) {
    chatData[msg.contact].push({ sender: 'Them', content: msg.content });
    renderMessages();
  }
});

// Initial render
renderMessages();
