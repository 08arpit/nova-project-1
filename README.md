# ⚡️🧠 Nova AI - Your Open Source Micro SaaS AI Code Companion

<div align="center">

<img src="public/logo1.png" alt="Nova AI Logo" width="100" />

</div>

## 👋 Introduction

Welcome to **Nova AI**! 🚀

**Nova AI** is a personal micro SaaS application designed to revolutionize the way developers interact with code. Inspired by the groundbreaking Bolt.New and powered by cutting-edge AI, Nova AI is your ultimate coding companion. This project is built for fun, learning, and to showcase AI-powered coding to recruiters and friends.

## ✨ Features

### Core Features

- **AI-powered code generation**: Describe what you want to build, and Nova AI will generate a full React project for you with modern UI components.
- **Prompt Enhancement**: Use the ✨ Enhance button on the home page to automatically improve your prompts with better technical details, UI/UX expectations, and structure requirements.
- **Architecture Explanation**: Click the **Explain** button in any workspace to get detailed High-Level (HL) and Low-Level (LL) design explanations with flowcharts, making complex architectures easy to understand.
- **Demo mode (Skip Sign In)**: Try Nova AI instantly with limited tokens—no account required! Perfect for recruiters and friends.
- **Google Sign In**: Sign in to save your workspaces and get more tokens.
- **Live code preview**: See your generated app instantly with Sandpack.
- **Modern, beautiful UI**: Responsive, dark-themed, and recruiter-ready with the Outfit font family for a polished look.
- **Interactive chat interface**: Real-time conversation with AI assistant for refining your project ideas.
- **Code editing**: Full-featured code editor with file explorer for managing generated projects.
- **Export & Deploy**: Export your generated code or deploy it directly from the workspace.

### Additional Features

- **Loading indicators**: Clear feedback when generating code or creating workspaces.
- **Help Center, Settings, and My Subscription pages**: Professional navigation and onboarding experience.
- **Token management**: Track your usage and manage your subscription.
- **Workspace history**: Save and manage multiple projects.
- **Responsive design**: Works seamlessly on desktop and mobile devices.

## 🛠 Technologies Powering Nova AI

Nova AI is built with a modern stack designed for performance, scalability, and an excellent developer experience:

- **[Next.js 15](https://nextjs.org/)**: For building server-side rendered, SEO-friendly, and highly performant React applications.
- **[React 18](https://reactjs.org/)**: The core of our UI, providing a declarative and component-based approach to building interfaces.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid, custom UI development.
- **[Convex](https://www.convex.dev/)**: Backend platform for seamless data storage, real-time updates, and serverless functions.
- **[Google Generative AI (Gemini)](https://ai.google/)**: Advanced AI for natural language processing, code generation, and prompt enhancement.
- **[Sandpack](https://sandpack.codesandbox.io/)**: Live, interactive code editing and preview.
- **[Lucide React](https://lucide.dev/docs/lucide-react)**: Beautiful, open-source icons.
- **[React Markdown](https://github.com/remarkjs/react-markdown)**: For rendering markdown content in explanations.
- **[Axios](https://axios-http.com/)**: For API communication.
- **[Sonner](https://sonner.emilkowal.ski/)**: Beautiful toast notifications.

## 📂 Project Structure

```
app/
├── (main)/              # Main application pages
│   ├── help/            # Help center page
│   ├── pricing/         # Pricing page
│   ├── settings/        # Settings page
│   └── workspace/[id]/  # Individual workspace pages
├── api/                 # API routes
│   ├── ai-chat/         # Chat with AI assistant
│   ├── enhance-prompt/   # Enhance user prompts
│   ├── explain/         # Generate HL/LL explanations
│   └── gen-ai-code/     # Generate React code
├── globals.css          # Global styles
├── layout.js            # Root layout with Outfit font
└── page.js              # Home page

components/
├── custom/              # Custom components
│   ├── AppSideBar.jsx   # Sidebar navigation
│   ├── ChatView.jsx     # Chat interface
│   ├── CodeView.jsx     # Code editor and preview
│   ├── ExplainOverlay.jsx # Explanation modal
│   ├── Header.jsx       # Top navigation bar
│   ├── Hero.jsx         # Home page hero with prompt input
│   └── ...
└── ui/                  # Reusable UI components (shadcn/ui)

configs/
└── AiModel.jsx          # Gemini AI model configuration

context/                 # React context providers
├── ActionContext.jsx    # Global action state
├── MessagesContext.jsx # Chat messages state
└── UserDetailContext.jsx # User authentication state

convex/                  # Convex backend
├── schema.js           # Database schema
├── users.js            # User management functions
└── workspace.js        # Workspace management functions

data/
└── Lookup.jsx          # Static data, prompts, and configurations

hooks/                   # Custom React hooks
lib/                     # Utility functions
public/                  # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- A Google Cloud account (for Gemini API)
- A Convex account (for backend)
- A Google OAuth client ID (for authentication)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/08arpit/nova-project-1.git
   cd nova-project-1
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```
   
   Add the following environment variables:
   ```env
   # Google OAuth
   NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY=your_google_oauth_client_id
   
   # Convex Backend
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   CONVEX_DEPLOYMENT=your_convex_deployment
   
   # Google Gemini API
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Set up Convex**
   ```bash
   npx convex dev
   ```
   Follow the prompts to create your Convex deployment and update the environment variables.

5. **Run the Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) to view the app.

## 🧑‍💻 Usage

### Basic Workflow

1. **Home Page**
   - Type your project idea in the prompt input
   - Use the ✨ **Enhance** button to improve your prompt with better technical details
   - Click the arrow button or press Enter to generate

2. **Workspace**
   - View your generated code in the code editor
   - See live preview in the preview tab
   - Chat with AI to refine your project
   - Use the **Explain** button (top right) to get detailed architecture explanations

3. **Features**
   - **Enhance Prompt**: Click the sparkle icon button next to the input to enhance your prompt
   - **Explain**: Get High-Level and Low-Level design explanations with flowcharts
   - **Export**: Download your generated code
   - **Deploy**: Deploy your project directly

### Demo Mode

- Click "Skip Sign In" for instant access (limited tokens, no account needed)
- Perfect for trying out Nova AI without signing up

### Sign In

- Sign in with Google to:
  - Save your workspaces
  - Get more tokens
  - Access workspace history
  - Manage your subscription

## 🎨 Features in Detail

### ✨ Prompt Enhancement

The **Enhance** feature uses AI to improve your prompts by:
- Adding specific technical details (frameworks, styling approaches)
- Clarifying UI/UX expectations
- Including requirements for structure and best practices
- Making prompts more effective for code generation

**How to use**: Type your prompt on the home page, then click the ✨ Enhance button. The enhanced prompt will replace your original input.

### 🧠 Architecture Explanation

The **Explain** feature provides comprehensive design documentation:
- **High-Level Design (HL)**: Overview of architecture, components, data flow, and trade-offs
- **Low-Level Design (LL)**: Detailed technical specifications including data structures, functions, and algorithms
- **Flowcharts**: Visual representation of system architecture using Mermaid diagrams
- **Alternatives**: Suggestions for different implementation approaches when applicable

**How to use**: In any workspace, click the **Explain** button in the top navigation bar. A modal will open with structured explanations based on your current chat context.

### 💬 Interactive Chat

- Real-time conversation with AI assistant
- Refine your project iteratively
- Get suggestions and clarifications
- Token-based usage tracking

### 📝 Code Generation

- Generates complete React projects
- Modern UI with Tailwind CSS
- Includes Unsplash images for visual appeal
- Production-ready code structure
- Organized components and folders

## 🛠 Troubleshooting & FAQ

### Common Issues

**App not starting?**
- Ensure all environment variables are set correctly
- Check that all dependencies are installed (`npm install`)
- Verify Node.js version is 18 or higher

**Convex errors?**
- Double-check your Convex deployment URL
- Ensure Convex is running (`npx convex dev`)
- Verify your Convex deployment name matches your `.env.local`

**Google login issues?**
- Verify your OAuth credentials in Google Cloud Console
- Check redirect URIs match your application URL
- Ensure `NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY` is set correctly

**AI code generation slow or fails?**
- Check your Gemini API key is valid and has quota
- Verify `NEXT_PUBLIC_GEMINI_API_KEY` is set
- Check server logs for detailed error messages
- Ensure you have sufficient API quota

**Explain or Enhance features not working?**
- Verify your Gemini API key is correctly configured
- Check that you have sufficient API quota
- Review browser console for error messages

**Other issues?**
- Check the [issues](https://github.com/08arpit/nova-project-1/issues) page
- Open a new issue with detailed error information
- Include browser console logs and error messages

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request describing your changes

### Contribution Guidelines

- Follow the existing code style
- Add comments for complex logic
- Update documentation for new features
- Test your changes thoroughly
- Ensure all linting passes

## 📝 API Routes

Nova AI includes several API routes for different functionalities:

- `/api/ai-chat` - Chat with AI assistant
- `/api/enhance-prompt` - Enhance user prompts
- `/api/explain` - Generate architecture explanations
- `/api/gen-ai-code` - Generate React code from prompts

All routes use the Google Gemini API and require proper authentication.

## 🎯 Roadmap

- [ ] Add more AI model options
- [ ] Support for multiple frameworks (Vue, Svelte, etc.)
- [ ] Team collaboration features
- [ ] Version control integration
- [ ] Advanced code analysis
- [ ] Custom theme editor
- [ ] Performance optimization tools

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 About & Contact

Nova AI is a personal project by [Arpit Garg](https://www.linkedin.com/in/arpitgarg08/).

- 📧 Email: [8arpitgarg@gmail.com](mailto:8arpitgarg@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/arpitgarg08](https://www.linkedin.com/in/arpitgarg08/)
- 🌐 GitHub: [@08arpit](https://github.com/08arpit)

Crafted with ❤️ by Arpit. Let's revolutionize coding together with Nova AI! 🎉

---

<div align="center">

**Made with Next.js, React, and lots of ☕**

[⭐ Star this repo](https://github.com/08arpit/nova-project-1) if you find it helpful!

</div>
