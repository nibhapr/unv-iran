FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --frozen-lockfile

COPY . .
RUN npm run build

# Copy public directory containing robots.txt and sitemap.xml
COPY public/ ./public/

# Copy source files including sitemap.ts
COPY src/ ./src/

# -- Production image --
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV MONGODB_URI=mongodb+srv://websitedata0102:unv12345@unvdb.kjxwy3y.mongodb.net/?retryWrites=true&w=majority&appName=unvdb
ENV NEXT_PUBLIC_API_URL=https://unv-iran.com
ENV JWT_SECRET=a73238645aff5c25899442e4eef2ecc8bee74cc1b534de56f4cef8d0d0006d33a63169ff4503ae9fac36e4a305a6af5eef42c65b0e76e34271c3e1ebdd84803607f867e683bb5d33e332e281eb1bc2cb2a2c1db2578e6295a6b6eb945d08cc52ce1f80c93b8627b65dce414009ef4322eb8dab91d585a776998d4c833778c3480932e5ef5b39f4604c06507feaf5ece1ff18f3015502d3bbacd214d3fc06606baa5c67076e3cd6ac2f3bd83805074acaed93c2203f82a740ecbc4a250180eb25f09a651c408bbccc9f7dc31f53dd409125895e1a4c93aec0a7f29a9bcbfd5d87ad73b8864dec997705a13e7dde2635f2e7a7ed963a2b13b693cf17d19e50329f

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src

EXPOSE 8084
CMD ["npm", "run", "start"]
