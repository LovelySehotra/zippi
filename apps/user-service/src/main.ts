import { NestFactory } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { Logger, ValidationPipe, VersioningType, INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrometheusMetrics } from '../../../libs/shared/building-blocks/monitoring/prometheus.metrics';
import configs from '../../../libs/shared/building-blocks/configs/configs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

class UserServiceApp {
  private app: INestApplication;
  private readonly port = 3366;
  private readonly globalPrefix = 'api';

  async setup() {
    this.app = await NestFactory.create(UserModule);
    this.app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST || 'localhost',
        port: 6379,
      },
    });
    await this.app.startAllMicroservices();
    Logger.log('User microservice is running');
    this.app.enableShutdownHooks();
    this.app.setGlobalPrefix(this.globalPrefix);
    this.app.enableVersioning({ type: VersioningType.URI });

    const config = new DocumentBuilder()
      .setTitle(`${configs.serviceName}`)
      .setDescription(`${configs.serviceName} api description`)
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('docs', this.app, document);

    this.app.useGlobalPipes(new ValidationPipe({ transform: true }));

    this.app.use((req: any, res: any, next: any) => {
      if (req.originalUrl === '/' || req.originalUrl.includes('favicon.ico')) {
        return res.send(configs.serviceName);
      }
      return next();
    });

    PrometheusMetrics.registerMetricsEndpoint(this.app);
  }

  async start() {
    await this.setup();
    await this.app.listen(this.port);
    Logger.log(`🚀 Application is running on: http://localhost:${this.port}`);
  }

  static async bootstrap() {
    const server = new UserServiceApp();
    await server.start();
  }
}

UserServiceApp.bootstrap();
