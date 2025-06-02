import app from './app'; // Import the app from './app'
import { Server } from 'http'; // Import http for server instance

const port = parseInt(process.env.PORT || '3000'); // Define a port number (e.g., 3000)

// Start the server by calling app.listen() and store the result
const server: Server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`); // Log a message indicating the server is running
});

// Implement graceful shutdown:
const shutdown = (signal: string) => {
  console.log(`Received ${signal}. Shutting down gracefully...`); // Log a shutdown message

  // TODO: Add database connection closing logic here

  server.close(() => {
    console.log('HTTP server closed.'); // In the server.close() callback, log a message
    process.exit(0); // Exit the process with status code 0
  });

  // Add a timeout for forceful shutdown
  setTimeout(() => {
    console.error('Could not close server in time, forcefully shutting down');
    process.exit(1);
  }, 10000); // 10 seconds timeout
};

process.on('SIGTERM', () => shutdown('SIGTERM')); // Listen for 'SIGTERM' process signals
process.on('SIGINT', () => shutdown('SIGINT')); // Listen for 'SIGINT' process signals