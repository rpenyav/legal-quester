import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Habilitando CORS específicamente para http://www.rafapenya.com
  app.enableCors({
    origin: ['http://www.rafapenya.com', 'http://www.rafapenya.com/telocambio'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.enableCors({ origin: /.+/ });

  app.use(
    (
      req: { method: string },
      res: {
        header: (arg0: string, arg1: string) => void;
        status: (arg0: number) => {
          (): any;
          new (): any;
          end: { (): void; new (): any };
        };
      },
      next: () => void,
    ) => {
      if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', 'http://www.rafapenya.com');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.status(200).end();
        return;
      }
      next();
    },
  );

  app.use(compression());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
