import { AppModule } from "./app.module.js";
import { NestFactory } from "@nestjs/core";
import 'dotenv/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

// Define the Express server instance
const server = express();

async function bootstrap() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  // Create the NestJS application with the Express adapter
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors(); // Enable CORS for frontend-backend communication

  // Add this line to start listening on port 3000 locally
  await app.listen(3001, () => {
    console.log('Application running on http://localhost:3001');
  });
}
bootstrap();
