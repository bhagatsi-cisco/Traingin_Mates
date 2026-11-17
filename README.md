# Training Mates - Anonymous Chat & Collaboration Platform

An online anonymous chat application where users can create or join chat rooms by sharing a simple room code/link. Everyone in the room can chat anonymously in real-time.

## Features

✨ **Core Features:**
- 🔗 **Shareable Links** - Create a chat room and share the link (e.g., `http://localhost:3000/chat?room=ABC12345`)
- 👥 **Anonymous Chatting** - Users are assigned random anonymous names (User_XXXXXX)
- ⚡ **Real-time Communication** - WebSocket-based instant messaging
- 👤 **User Presence** - See who's online and their status
- 💬 **Message History** - New users can see previous messages in the room
- 🎨 **Beautiful UI** - Modern, responsive design with gradient themes
- 📱 **Mobile Friendly** - Works seamlessly on mobile and desktop
- 🔒 **Privacy First** - No registration, no personal data collection
- ⌨️ **Typing Indicators** - See when others are typing
- 🌈 **Color-coded Users** - Each user gets a consistent avatar color

## Project Structure

```
training_mates/
├── package.json              # Dependencies and scripts
├── server.js                 # Node.js/Express backend with Socket.IO
├── public/
│   ├── index.html           # Home page - create or join rooms
│   └── chat.html            # Chat room interface
└── README.md                # This file
```

## Tech Stack

**Backend:**
- Node.js
- Express.js (web server)
- Socket.IO (real-time WebSocket communication)
- UUID (unique message IDs)
- CORS (cross-origin support)

**Frontend:**
- HTML5
- CSS3 (with gradients and animations)
- Vanilla JavaScript (ES6+)
- Socket.IO Client

## Installation

1. Navigate to the project folder:
```bash
cd training_mates
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

**Development mode (with auto-reload):**
```bash
npm run dev
```
*(Requires nodemon - included in devDependencies)*

**Production mode:**
```bash
npm start
```

The application will start on `http://localhost:3000`

## How to Use

### Creating a Chat Room:
1. Open `http://localhost:3000`
2. Click "Create New Chat Room"
3. You'll be redirected to a unique chat room
4. Share the room code or the full URL with others

### Joining a Chat Room:
1. Enter the room code on the home page, OR
2. Click on a shared link directly
3. You'll be assigned an anonymous username
4. Start chatting immediately!

### Chat Features:
- **Send Messages** - Type and press Enter or click Send
- **View Users** - See all online users on the right sidebar
- **Copy Room Code** - Click the room code or use the copy button
- **Leave Room** - Click "Go Home" button

## API Endpoints

### Create a Chat Room
```
POST /api/rooms
Response: { roomId, shareLink }
```

### Get Room Information
```
GET /api/rooms/:roomId
Response: { id, userCount, createdAt }
```

### Socket Events

**Client → Server:**
- `join-room` - Join a specific room
- `send-message` - Send a message
- `user-typing` - Notify typing status

**Server → Client:**
- `user-joined` - User joined the room
- `receive-message` - New message received
- `user-left` - User left the room
- `user-typing` - User typing notification

## Configuration

### Environment Variables:
```
PORT=3000  # Default port (optional)
```

### Room Management:
- Empty rooms are automatically deleted after 1 hour
- Message history is maintained for active rooms
- Maximum 8 different avatar colors (can be customized)

## Room Code Format

Room codes are:
- 8 characters long
- Random alphanumeric
- Case-insensitive (e.g., ABC12345 or abc12345)
- Shareable in URLs and easily memorable

## Customization

### Change Port:
```bash
PORT=5000 npm start
```

### Modify Colors:
Edit the color array in `server.js` or `chat.html`:
```javascript
const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', ...];
```

### Change Anonymous Name Format:
Edit the name generation in `server.js`:
```javascript
const anonName = `User_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Handles multiple concurrent rooms
- Real-time message delivery via WebSockets
- Automatic cleanup of inactive rooms
- Lightweight message storage (in-memory)

## Security & Privacy

- No authentication required (anonymous)
- No personal data collection
- Messages are room-specific
- No server-side logging of chat content
- CORS enabled for local development

## Future Enhancements

- 💾 Message persistence with database
- 📸 File/image sharing
- 🎙️ Voice/video calling
- 👤 User profiles (optional)
- 🔐 Optional password protection for rooms
- 📊 Message search and filtering
- 🌙 Dark/Light theme toggle
- 🌍 Multiple language support

## Troubleshooting

### "Room not found" error
- Check if the room code is correct
- The room may have expired if empty for 1 hour
- Try creating a new room

### WebSocket connection failed
- Check if server is running
- Verify port is not blocked
- Check browser console for errors

### Messages not updating
- Refresh the page
- Check internet connection
- Verify Socket.IO is loaded (check browser console)

## License

MIT License - Feel free to use and modify as needed!

## Support

For issues or questions, check the browser console for error messages and ensure the server is running properly.

---

**Happy Chatting! 🗣️✨**
