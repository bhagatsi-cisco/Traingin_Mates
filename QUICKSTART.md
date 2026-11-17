# Training Mates - Quick Start Guide

## Setup & Installation (2 minutes)

```bash
# 1. Navigate to the project
cd demo_projects/training_mates

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

Your app is now running at **http://localhost:3000** 🎉

---

## How It Works

### For Room Creator:
1. Click **"Create New Chat Room"**
2. Get a unique 8-character room code (e.g., `ABC12345`)
3. Share the link: `http://localhost:3000/chat?room=ABC12345`
4. Others can join by using the code or clicking the link

### For Room Joiners:
1. Enter the room code on the home page, OR
2. Click the shared link directly
3. Get assigned a random anonymous name
4. Start chatting immediately!

---

## Key Features

- ✅ **Anonymous** - No sign-ups, no usernames to remember
- ✅ **Instant** - Real-time WebSocket communication  
- ✅ **Shareable** - Simple room codes easy to share
- ✅ **Private** - No personal data collection
- ✅ **Beautiful** - Modern, responsive UI
- ✅ **Fast** - Lightweight and efficient

---

## Project Structure

```
training_mates/
├── server.js          ← Backend (Node.js + Express + Socket.IO)
├── package.json       ← Dependencies
├── public/
│   ├── index.html     ← Home page (create/join rooms)
│   └── chat.html      ← Chat interface
└── README.md          ← Full documentation
```

---

## Commands

```bash
# Install dependencies
npm install

# Start server (production)
npm start

# Start server (development with auto-reload)
npm run dev
```

---

## API & Events

### REST API
- `POST /api/rooms` - Create new room
- `GET /api/rooms/:roomId` - Get room info

### WebSocket Events
- **send-message** - Send a chat message
- **join-room** - Join a specific room
- **user-joined** - Broadcast when user joins
- **receive-message** - Receive new messages
- **user-left** - Broadcast when user leaves

---

## Customization

### Change Port
```bash
PORT=5000 npm start
```

### Modify Avatar Colors
Edit the `colors` array in `server.js`:
```javascript
const colors = ['#FF6B6B', '#4ECDC4', ...];
```

### Change Anonymous Name Format
Edit the name generation in `server.js`:
```javascript
const anonName = `User_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
```

---

## Browser Support
- Chrome/Edge ✅
- Firefox ✅
- Safari ✅
- Mobile browsers ✅

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` |
| Port already in use | Use `PORT=5000 npm start` |
| WebSocket connection failed | Restart server and refresh page |
| Room not found | Check room code spelling (case-insensitive) |

---

## Next Steps

1. **Test locally** - Create a room and share with another browser tab
2. **Deploy** - Use Heroku, Replit, or any Node.js hosting
3. **Enhance** - Add features like file sharing, voice chat, etc.

---

**Enjoy anonymous chatting! 🗣️**
