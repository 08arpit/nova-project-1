# 🚀 Nova AI Features Documentation

This document provides detailed information about all features in Nova AI.

## 📋 Table of Contents

- [Prompt Enhancement](#-prompt-enhancement)
- [Architecture Explanation](#-architecture-explanation)
- [AI Code Generation](#-ai-code-generation)
- [Interactive Chat](#-interactive-chat)
- [Live Code Preview](#-live-code-preview)
- [Workspace Management](#-workspace-management)

## ✨ Prompt Enhancement

### Overview

The **Prompt Enhancement** feature uses AI to transform basic user prompts into detailed, technical specifications that result in better code generation.

### How It Works

1. User types a prompt on the home page
2. Clicks the ✨ **Enhance** button (sparkle icon)
3. AI analyzes and improves the prompt with:
   - Specific technical details (frameworks, styling approaches)
   - Clear UI/UX expectations
   - Structure and organization requirements
   - Best practices and standards
4. Enhanced prompt replaces the original input

### Benefits

- **Better Results**: More detailed prompts lead to higher-quality code generation
- **Saves Time**: No need to manually refine prompts
- **Learning Tool**: See how prompts should be structured for best results

### Example

**Original Prompt:**
```
Create a todo app
```

**Enhanced Prompt:**
```
Create a modern, production-ready todo application using React with the following features:
- Add, edit, and delete tasks
- Mark tasks as complete/incomplete
- Filter tasks by status (all, active, completed)
- Use Tailwind CSS for modern, responsive UI
- Persist data using localStorage
- Include smooth animations and transitions
- Use lucide-react icons for visual elements
```

### API Endpoint

- **Route**: `/api/enhance-prompt`
- **Method**: POST
- **Body**: `{ prompt: string }`
- **Response**: `{ enhanced: string }`

## 🧠 Architecture Explanation

### Overview

The **Explain** feature provides comprehensive design documentation for generated projects, including High-Level (HL) and Low-Level (LL) design explanations with visual flowcharts.

### How It Works

1. User clicks the **Explain** button in any workspace
2. AI analyzes the current chat context and project structure
3. Generates structured documentation:
   - **High-Level Design**: Architecture overview, components, data flow
   - **Low-Level Design**: Technical specifications, data structures, algorithms
   - **Flowcharts**: Visual Mermaid diagrams showing system architecture
   - **Alternatives**: Different implementation approaches when applicable

### Features

- **Structured Sections**: Clear separation between HL and LL designs
- **Visual Flowcharts**: Mermaid diagrams for better understanding
- **Detailed Technical Specs**: Data structures, functions, and algorithms
- **Alternative Solutions**: Suggestions for different approaches
- **Easy to Read**: Well-formatted markdown with proper spacing

### Example Output Structure

```markdown
## HL (High-Level Design)

[Architecture overview with components, data flow, and trade-offs]

\`\`\`mermaid
flowchart TD
    A[User] --> B[UI Components]
    B --> C[State Management]
    C --> D[Local Storage]
\`\`\`

## LL (Low-Level Design)

[Technical specifications including data structures, functions, and algorithms]

## Alternatives

- Alternative approach 1
- Alternative approach 2
```

### API Endpoint

- **Route**: `/api/explain`
- **Method**: POST
- **Body**: `{ messages: Array }`
- **Response**: `{ result: string }` (markdown formatted)

## 💻 AI Code Generation

### Overview

Nova AI generates complete React projects from natural language prompts, including modern UI components, proper structure, and production-ready code.

### Features

- **Complete Projects**: Full React applications with multiple components
- **Modern UI**: Tailwind CSS styling with beautiful, responsive designs
- **Image Integration**: Unsplash images automatically included
- **Organized Structure**: Logical component and folder organization
- **Production Ready**: Clean, commented, and maintainable code

### Code Quality

- Functional React components with hooks
- Proper state management
- Error handling and validation
- Responsive design
- Accessibility considerations
- Performance optimizations

### Generated Structure

```
project/
├── App.js              # Main application component
├── index.js            # Entry point
├── components/         # Reusable components
│   ├── Component1.js
│   └── Component2.js
├── styles/             # CSS files
└── package.json        # Dependencies
```

### API Endpoint

- **Route**: `/api/gen-ai-code`
- **Method**: POST
- **Body**: `{ prompt: string }`
- **Response**: `{ files: object, generatedFiles: array }`

## 💬 Interactive Chat

### Overview

Real-time conversation with AI assistant to refine project ideas, ask questions, and get suggestions.

### Features

- **Real-time Responses**: Instant AI replies
- **Context Aware**: Maintains conversation context
- **Token Tracking**: Monitors usage and remaining tokens
- **Message History**: Saves all conversations
- **Error Handling**: Graceful error messages

### Chat Interface

- **User Messages**: Blue gradient bubbles on the right
- **AI Messages**: Dark gray bubbles on the left with Nova logo
- **Loading States**: Clear indicators when AI is thinking
- **Auto-scroll**: Automatically scrolls to latest message

### API Endpoint

- **Route**: `/api/ai-chat`
- **Method**: POST
- **Body**: `{ prompt: string }`
- **Response**: `{ result: string }`

## 🎨 Live Code Preview

### Overview

Sandpack-powered live preview of generated code with full editing capabilities.

### Features

- **Live Preview**: See changes instantly
- **Code Editor**: Full-featured code editor with syntax highlighting
- **File Explorer**: Navigate through project files
- **Code/Preview Tabs**: Switch between editing and preview
- **Responsive**: Works on all screen sizes

### Editor Features

- Syntax highlighting
- Auto-completion
- Error detection
- File management
- Real-time updates

## 📁 Workspace Management

### Overview

Save, manage, and organize multiple projects in dedicated workspaces.

### Features

- **Multiple Workspaces**: Create and manage multiple projects
- **Workspace History**: Access previous workspaces
- **Auto-save**: Automatically saves changes
- **Export**: Download generated code
- **Deploy**: Deploy projects directly

### Workspace Actions

- **Export**: Download project as ZIP
- **Deploy**: Deploy to hosting platform
- **Explain**: Get architecture explanations
- **Chat**: Continue conversation with AI

## 🎯 Best Practices

### Writing Effective Prompts

1. **Be Specific**: Include details about features, styling, and structure
2. **Use Examples**: Reference similar applications or patterns
3. **Mention Technologies**: Specify frameworks, libraries, or tools
4. **Describe UI/UX**: Explain visual expectations and user experience
5. **Use Enhance**: Always use the Enhance button for better results

### Using Explain Feature

1. **Generate First**: Create your project first, then use Explain
2. **Review Sections**: Read both HL and LL designs
3. **Check Flowcharts**: Visual diagrams help understand architecture
4. **Consider Alternatives**: Review alternative approaches if provided

### Managing Workspaces

1. **Save Regularly**: Workspaces auto-save, but export important projects
2. **Use Descriptive Prompts**: Better prompts = better organization
3. **Review History**: Check workspace history for inspiration
4. **Export for Backup**: Export important projects for backup

## 🔧 Technical Details

### Font System

- **Primary Font**: Outfit (Google Fonts)
- **Applied Globally**: All text uses Outfit font family
- **Modern Look**: Clean, readable typography

### API Integration

- **Google Gemini**: All AI features use Gemini API
- **Token Management**: Tracks and manages API usage
- **Error Handling**: Comprehensive error handling and user feedback

### State Management

- **React Context**: Global state management
- **Convex**: Backend state synchronization
- **Local Storage**: Client-side caching

## 📊 Performance

- **Fast Generation**: Optimized API calls
- **Responsive UI**: Smooth interactions
- **Efficient Rendering**: Optimized React components
- **Lazy Loading**: Code splitting and lazy loading

## 🔒 Security

- **Environment Variables**: Secure API key storage
- **User Authentication**: Google OAuth integration
- **Data Privacy**: Secure data handling
- **API Security**: Secure API endpoints

---

For more information, see the [README.md](README.md) file.

