### Personal Site

This is a clean, fast, and lightweight site built with Next.js, Vercel, and Tailwind CSS. It features dynamic Open Graph image generation and MDX support for blog posts with rss/atom feeds. This site is inspired from [Leerob](https://leerob.com/) and [Guillermo Rauch](https://rauchg.com//).

#### Features
- Dynamic Open Graph image generation with random pixel icons
- MDX support for blog posts or any other pages
- RSS/Atom feeds
- SEO optimizations
- Google Analytics integration if in case you dont need vercel analytics

#### Getting Started

To set up the project locally, follow these steps:

1. **Install Dependencies**  
   Run the following command to install the necessary packages:
   ```bash
   # use pnpm
   pnpm i
   # or use Bun
   bun install
   # or use npm
   npm install
   ```

2. **Run the Development Server**  
   Start the development server with:
   ```bash
   # use pnpm
   pnpm dev
   # or use Bun
   bun dev
   # or use npm
   npm run dev
   ```

3. **Configuration**  
   Update the configuration in the following files according to your requirements:

   - **`/app/config.ts`**: Modify the metadata such as `baseUrl`, `title`, `description`, and social links
   - **`/app/n/*`**: Update the content of your blog posts or pages as needed
   - **`/app/page.mdx`**: Make changes to the main page content to reflect your personal information and projects
   - **`/app/components/ui/name-transition.tsx`**: Update the name with your own name
   - **`/app/globals.css`**: Update the name in `.transition-element`, `::view-transition-old`, `::view-transition-new`
   - Remove `@vercel/analytics/react` and `@vercel/speed-insights/next` from `app/layout.tsx` if you don't need analytics or speed insights from vercel
   - Add `NEXT_PUBLIC_GA_ID` to `.env`  if you want to use Google Analytics
   - Change the birthday in `app/components/ui/age-counter.tsx` to your birthday

#### Deployment

Once you are satisfied with your changes, you can deploy your site using Vercel or any other hosting service of your choice.

#### License

You are free to use this code.
