# Deployment Guide

## Vercel Deployment (Recommended)

### Quick Deploy

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in the dashboard
   - Deploy

### Environment Variables

Add these in your Vercel dashboard under Settings → Environment Variables:

| Variable | Value | Required |
|----------|-------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Optional* |
| `ANTHROPIC_API_KEY` | Your Anthropic API key | Optional* |

*At least one API key is required for the tool to function.

### Custom Domain (Optional)

1. Go to Vercel dashboard → Settings → Domains
2. Add your custom domain
3. Configure DNS settings as instructed

## Alternative Deployments

### Netlify

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables in dashboard

### Railway

1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t ai-comparison .
docker run -p 3000:3000 -e OPENAI_API_KEY=your_key ai-comparison
```

## Performance Considerations

### API Rate Limits

- **OpenAI**: 3,500 requests per minute (varies by plan)
- **Anthropic**: Rate limits vary by model and plan

Monitor usage and consider implementing additional rate limiting for production use.

### Cost Management

The tool displays estimated costs, but actual costs may vary. Monitor your API usage regularly:

- OpenAI: [Usage Dashboard](https://platform.openai.com/usage)
- Anthropic: Check your account dashboard

### Caching (Optional)

For high-traffic deployments, consider implementing response caching:

```typescript
// Add to API routes for caching similar requests
const cacheKey = `${message}-${JSON.stringify(parameters)}`;
```

## Security Considerations

### API Key Security

- Never commit API keys to version control
- Use environment variables for all sensitive data
- Rotate API keys regularly
- Consider using API key restrictions where available

### Rate Limiting

For production deployments, implement additional rate limiting:

```typescript
// Example using next-rate-limit
import rateLimit from "express-rate-limit";
```

### CORS (if needed)

The app is configured for same-origin requests. If you need cross-origin support, configure CORS in `next.config.ts`.

## Monitoring

### Analytics

Add analytics tracking:

```typescript
// Add to layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Error Tracking

Consider adding error tracking with services like:
- Sentry
- LogRocket
- Datadog

## Scaling

### Multiple Environments

Create different environments:

- `main` branch → Production
- `develop` branch → Staging
- Feature branches → Preview deployments

### Database (Future)

If you need to store results or user data:

- Vercel Postgres
- PlanetScale
- Supabase

## Troubleshooting

### Common Issues

1. **Build Errors**
   - Check TypeScript errors: `npm run build`
   - Verify all dependencies are installed

2. **API Errors**
   - Verify environment variables are set
   - Check API key validity
   - Review API rate limits

3. **Performance Issues**
   - Monitor bundle size: `npm run analyze`
   - Check for unnecessary re-renders
   - Optimize images and assets

### Support

For deployment issues:
- Check [Next.js deployment docs](https://nextjs.org/docs/deployment)
- Review [Vercel documentation](https://vercel.com/docs)
- Check provider-specific documentation
