# Deploy to Netlify

Your Furat Möbelhaus website is ready to deploy to Netlify!

## Option 1: Deploy via Netlify Web Interface (Drag & Drop) - EASIEST

1. Go to [Netlify](https://app.netlify.com/) and sign up/login
2. Click "Add new site" → "Deploy manually"
3. Drag and drop the **entire `dist` folder** to the upload area
4. Your site will be live in seconds!
5. You can then configure a custom domain in Site settings → Domain management

## Option 2: Deploy via Git (Recommended for Continuous Updates)

1. Push your project to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [Netlify](https://app.netlify.com/) and sign up/login
3. Click "Add new site" → "Import an existing project"
4. Connect your Git provider and select your repository
5. Netlify will automatically detect the settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click "Deploy site"
7. Every time you push to your repository, Netlify will automatically rebuild and deploy your site

The `netlify.toml` file is already configured with all the correct settings.

## Option 3: Netlify CLI (For Developers)

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to a draft URL for testing
netlify deploy

# Deploy to production
netlify deploy --prod
```

When prompted, select "Create & configure a new site" and use `dist` as the publish directory.

## What's Included

✅ `netlify.toml` - Build configuration
✅ `_headers` - Security headers and caching
✅ All pages properly built and optimized
✅ Multi-language support (German, English, Arabic, Italian, Turkish)
✅ Responsive design for all devices

## Your Pages

- Home: `/index.html`
- About: `/about.html`
- Contact: `/contact.html`
- Home Furnishings: `/home-furnishings.html`
- Office: `/office.html`
- Kitchens: `/kitchens.html`
- Rugs: `/rugs.html`
- New Arrivals: `/new-arrivals.html`
- Impressum: `/impressum.html`
- Datenschutz: `/datenschutz.html`

After deployment, you can configure a custom domain in Netlify's domain settings.
