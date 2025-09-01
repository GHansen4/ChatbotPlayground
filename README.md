# AI Model Comparison Tool

A professional tool for comparing AI model responses side-by-side with customizable parameters. Compare OpenAI and Anthropic models with real-time parameter difference highlighting, detailed response metadata, and a polished user interface.

## Features

- **Side-by-Side Comparison**: Compare responses from OpenAI (GPT-4, GPT-3.5) and Anthropic (Claude 3) models
- **Dynamic Parameters**: Adjust temperature, max tokens, top-p, frequency penalty, and presence penalty
- **Real-Time Diff Highlighting**: Visual indicators show parameter differences between panels
- **Detailed Metadata**: Response time, token count, estimated cost, and model information
- **Professional UI**: Smooth animations, tooltips, collapsible panels, and responsive design
- **Educational Tooltips**: Learn what each parameter does with comprehensive help text

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key (optional)
- Anthropic API key (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-model-comparison
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:
```
OPENAI_API_KEY=your-openai-api-key-here
ANTHROPIC_API_KEY=your-anthropic-api-key-here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Usage

1. **Enter a Prompt**: Type your question or prompt in the text area
2. **Configure Parameters**: Adjust model parameters for each panel (A and B)
3. **Select Providers**: Choose between OpenAI and Anthropic for each panel
4. **Generate Responses**: Click "Generate Responses" to compare outputs side-by-side
5. **Analyze Results**: Review responses and metadata including costs and performance

## Parameter Explanations

- **Temperature (0-2)**: Controls randomness. Higher = more creative, Lower = more focused
- **Max Tokens (1-4000)**: Maximum length of the response
- **Top P (0.1-1.0)**: Nucleus sampling. Lower = more focused on probable words
- **Frequency Penalty (-2 to 2)**: Reduces repetition based on word frequency
- **Presence Penalty (-2 to 2)**: Reduces repetition of any previously used words

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed on any platform that supports Next.js:

```bash
npm run build
npm start
```

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI APIs**: OpenAI SDK, Anthropic SDK
- **State Management**: React hooks with debouncing

## API Costs

The tool provides estimated costs based on current API pricing:

- **OpenAI**: $0.03-0.06 per 1K tokens (varies by model)
- **Anthropic**: $0.00025-0.075 per 1K tokens (varies by model)

Costs are estimates only. Check provider documentation for current pricing.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.
