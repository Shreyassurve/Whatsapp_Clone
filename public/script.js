let contacts = ['Alice', 'Bob', 'Charlie'];
let chatData = {
  Alice: [{ sender: 'Alice', content: 'Hello!' }],
  Bob: [{ sender: 'Bob', content: 'Hi!' }],
  Charlie: [{ sender: 'Charlie', content: 'Hey there!' }],
};

let currentChat = 'Alice';

function populateContacts() {
  const contactList = document.getElementById('contactList');
  contactList.innerHTML = '';

  contacts.forEach((contact) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = contact;
    li.addEventListener('click', () => openChat(contact));
    contactList.appendChild(li);
  });
}

function renderMessages() {
  const chatWindow = document.getElementById('chatWindow');
  chatWindow.innerHTML = '';

  chatData[currentChat].forEach((msg) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', msg.sender === 'You' ? 'sent' : 'received');

    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';
    contentDiv.textContent = msg.content;

    messageDiv.appendChild(contentDiv);
    chatWindow.appendChild(messageDiv);
  });

  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function openChat(contact) {
  currentChat = contact;
  document.getElementById('chatWith').textContent = `Chat with ${contact}`;
  renderMessages();
}

function sendMessage() {
  const input = document.getElementById('messageInput');
  const content = input.value.trim();
  if (!content) return;

  chatData[currentChat].push({ sender: 'You', content });
  input.value = '';
  renderMessages();
}

function addContact() {
  const contactName = prompt('Enter new contact name:');
  if (contactName && !contacts.includes(contactName)) {
    contacts.push(contactName);
    chatData[contactName] = [];
    populateContacts();
  } else {
    alert('Invalid or duplicate contact name.');
  }
}

function logout() {
  currentChat = '';
  contacts = [];
  chatData = {};
  document.getElementById('chatWith').textContent = 'No Active Chat';
  document.getElementById('contactList').innerHTML = '';
  document.getElementById('chatWindow').innerHTML = '';
  alert('Logged out successfully!');
}

document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
document.getElementById('addContactBtn').addEventListener('click', addContact);
document.getElementById('logoutBtn').addEventListener('click', logout);

populateContacts();
renderMessages();
