#!/bin/bash
# Training Mates - Setup Script
# Run this to get started quickly

echo "🚀 Training Mates - Setup Script"
echo "════════════════════════════════"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Install from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version)"
echo "✅ npm $(npm --version)"
echo ""

# Check if already in the right directory
if [ ! -f "package.json" ]; then
    echo "⚠️  package.json not found"
    echo "Make sure you're in the training_mates directory:"
    echo "   cd /Users/bhagatsi/AI-projects/demo_projects/training_mates"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "🎉 Ready to start!"
    echo ""
    echo "Commands:"
    echo "  npm start    - Start production server"
    echo "  npm run dev  - Start with auto-reload"
    echo ""
    echo "Open: http://localhost:3000"
else
    echo "❌ Installation failed"
    exit 1
fi
