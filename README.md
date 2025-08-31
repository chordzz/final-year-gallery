# Final Year Week Gallery

A playful, artsy website with a black and white base and colorful accents to showcase memories from a girlfriend's final year week at university.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Black and white theme with colorful artsy accents
- Day-by-day gallery structure for different themed days
- Fluid animations and playful design elements
- Responsive design for mobile and desktop viewing
- Interactive elements and hover effects

## Themed Days

The gallery is organized around five themed days:

1. **Corporate Day** - Professional attire and business-themed events
2. **Denim Day** - Creative expressions with denim clothing
3. **Jersey Day** - Sports enthusiasm and team spirit
4. **Costume Day** - Characters from movies, books, and pop culture
5. **Owambe Day** - Cultural celebration with traditional attire

## Adding Your Own Photos

To add your own photos to the gallery:

1. Place your images in the `public` directory
2. Update the image paths in the `days` array in `src/app/page.tsx`
3. Uncomment the Image component in the PhotoCard component

## Customization

- Change colors in `src/app/globals.css` by modifying the CSS variables
- Adjust animations by modifying the keyframes in `src/app/globals.css`
- Add or remove themed days by updating the `days` array in `src/app/page.tsx`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
