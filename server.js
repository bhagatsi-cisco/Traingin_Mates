const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Store active chat rooms
const chatRooms = new Map();
const userNames = new Map();

// Generate a shareable room ID
function generateRoomId() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

// REST API to create a new chat room
app.post('/api/rooms', (req, res) => {
  const roomId = generateRoomId();
  chatRooms.set(roomId, {
    id: roomId,
    createdAt: new Date(),
    messages: [],
    users: []
  });
  res.json({ roomId, shareLink: `/chat?room=${roomId}` });
});

// REST API to get room info
app.get('/api/rooms/:roomId', (req, res) => {
  const room = chatRooms.get(req.params.roomId);
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  res.json({
    id: room.id,
    userCount: room.users.length,
    createdAt: room.createdAt
  });
});

// Serve the chat page
app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// WebSocket events
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (roomId, callback) => {
    const room = chatRooms.get(roomId);
    
    if (!room) {
      return callback({ success: false, error: 'Room not found' });
    }

    socket.join(roomId);
    const userId = socket.id;
    const anonName = `User_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    userNames.set(userId, anonName);
    room.users.push({ id: userId, name: anonName });

    // Notify others that a user joined
    io.to(roomId).emit('user-joined', {
      userId,
      userName: anonName,
      userCount: room.users.length
    });

    // Send chat history to the new user
    callback({
      success: true,
      messages: room.messages,
      userName: anonName,
      userCount: room.users.length,
      users: room.users
    });

    console.log(`${anonName} joined room ${roomId}`);
  });

  socket.on('send-message', (data) => {
    const { roomId, message } = data;
    const room = chatRooms.get(roomId);
    
    if (!room) return;

    const userId = socket.id;
    const userName = userNames.get(userId) || 'Anonymous';
    
    const messageObj = {
      id: uuidv4(),
      userId,
      userName,
      message,
      timestamp: new Date(),
      avatar: generateAvatar(userName)
    };

    room.messages.push(messageObj);
    
    // Broadcast message to all users in the room
    io.to(roomId).emit('receive-message', messageObj);
    console.log(`${userName}: ${message}`);
  });

  socket.on('user-typing', (roomId) => {
    const userName = userNames.get(socket.id);
    socket.to(roomId).emit('user-typing', { userName });
  });

  socket.on('disconnect', () => {
    const userName = userNames.get(socket.id);
    
    // Remove user from all rooms
    for (const [roomId, room] of chatRooms.entries()) {
      const userIndex = room.users.findIndex(u => u.id === socket.id);
      if (userIndex !== -1) {
        room.users.splice(userIndex, 1);
        io.to(roomId).emit('user-left', {
          userName,
          userCount: room.users.length
        });
        
        // Delete empty rooms after 1 hour
        if (room.users.length === 0) {
          setTimeout(() => {
            if (room.users.length === 0) {
              chatRooms.delete(roomId);
            }
          }, 3600000);
        }
      }
    }
    
    userNames.delete(socket.id);
    console.log('User disconnected:', socket.id);
  });
});

// Generate a consistent avatar color based on username
function generateAvatar(userName) {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#6C5CE7', '#A29BFE', '#FD79A8'];
  const hash = userName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Create a new chat room or join via shared link`);
});
