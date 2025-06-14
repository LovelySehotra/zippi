# Stage 1: Install dependencies
FROM node:18-alpine AS dependencies
WORKDIR /usr/src/app
COPY package.json package-lock.json* ./
RUN npm install --production

# Stage 2: Build the application
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN npx nest build billpay

# Stage 3: Create the final production image
FROM node:18-alpine
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY --from=builder /usr/src/app/dist/apps/billpay ./dist
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
CMD ["node", "dist/main"]
