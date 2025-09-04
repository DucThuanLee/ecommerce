# Use Node.js 18 image
FROM node:20

# Create app directory
WORKDIR /app

ARG SERVICE=order-service

# Copy package.json để cài dependencies
COPY ${SERVICE}/package*.json ./
RUN npm install

# Copy code shared vào container
COPY shared ./shared

# Copy code của service
COPY ${SERVICE}/ ./ 

# Copy shared thành node_modules/@shared để TypeScript + NestJS coi như package thật
#RUN mkdir -p node_modules/@shared && cp -r shared/* node_modules/@shared/

# Build the project
#RUN npm run build

# Start in dev mode (optional: switch to start:prod for production)
#CMD ["npm", "run", "start:dev"]

# Mỗi lần container start, copy lại shared để tránh bị ghi đè khi mount
#CMD mkdir -p node_modules/@shared && cp -r shared/* node_modules/@shared/ && npm run start:dev
# Compile service + shared trước khi chạy dev
CMD npx tsc && npm run start:dev
# Compile shared thành node_modules/@shared
#RUN mkdir -p node_modules/@shared && npx tsc --outDir node_modules/@shared --rootDir shared shared/**/*.ts

#CMD npm run start:dev
