FROM debian:stable

WORKDIR /app

# Update package list and install prerequisites
RUN apt-get update && apt-get install -y curl sudo && rm -rf /var/lib/apt/lists/*

# Install Node.js (using NodeSource)
RUN curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
RUN apt-get install -y nodejs

COPY . .

# Install PM2 to manage the Node.js process
RUN npm i -g pm2

RUN npm ci --omit=dev && npm cache clean --force

EXPOSE 8080

# Start the Node.js server using PM2
CMD [ "pm2-runtime", "server.js", "--name", "billing_app" ]
