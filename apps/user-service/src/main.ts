import { NestFactory } from '@nestjs/core';
import {
  Logger,
  ValidationPipe,
  VersioningType,
  INestApplication,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { PrometheusMetrics } from '../../../libs/shared/building-blocks/monitoring/prometheus.metrics';

class UserServiceApp {
  private app!: INestApplication;

  /* -------------------------------------------------------------------------- */
  /*                               ENTRY POINT                               */
  /* -------------------------------------------------------------------------- */

  static async bootstrap() {
    const server = new UserServiceApp();
    await server.init();
    await server.start();
  }

  /* -------------------------------------------------------------------------- */
  /*                              INITIALIZATION                              */
  /* -------------------------------------------------------------------------- */

  private async init() {
    this.app = await NestFactory.create(UserModule);

    const configService = this.app.get(ConfigService);

    this.configureMicroservice(configService);
    this.configureHttp(configService);
    this.configureSwagger(configService);
    this.configureValidation();
    this.configureMetrics();
    this.configureRootHandler(configService);

    await this.app.startAllMicroservices();
    Logger.log('✅ User microservice connected via Redis');
  }

  /* -------------------------------------------------------------------------- */
  /*                            HTTP CONFIGURATION                             */
  /* -------------------------------------------------------------------------- */

  private configureHttp(config: ConfigService) {
    const globalPrefix = config.get<string>('GLOBAL_PREFIX') || 'api';

    this.app.enableShutdownHooks();

    this.app.setGlobalPrefix(globalPrefix);

    this.app.enableVersioning({
      type: VersioningType.URI,
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                        MICROSERVICE (REDIS) SETUP                        */
  /* -------------------------------------------------------------------------- */

  private configureMicroservice(config: ConfigService) {
    const redisHost = config.get<string>('redis.host') || 'localhost';
    const redisPort = config.get<number>('redis.port') || 6379;

    this.app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.REDIS,
      options: {
        host: redisHost,
        port: redisPort,
      },
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                             SWAGGER SETUP                               */
  /* ------------------------------------------------------------------------- */

  private configureSwagger(config: ConfigService) {
    const serviceName = config.get<string>('serviceName') || 'User Service';

    const swaggerConfig = new DocumentBuilder()
      .setTitle(serviceName)
      .setDescription(`${serviceName} API Documentation`)
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(this.app, swaggerConfig);
    SwaggerModule.setup('docs', this.app, document);
  }

  /* -------------------------------------------------------------------------- */
  /*                          GLOBAL VALIDATION PIPE                         */
  /* -------------------------------------------------------------------------- */

  private configureValidation() {
    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                           METRICS (PROMETHEUS)                           */
  /* -------------------------------------------------------------------------- */

  private configureMetrics() {
    PrometheusMetrics.registerMetricsEndpoint(this.app);
  }

  /* -------------------------------------------------------------------------- */
  /*                        ROOT HEALTH / IDENTIFIER                          */
  /* -------------------------------------------------------------------------- */

  private configureRootHandler(config: ConfigService) {
    const serviceName = config.get<string>('serviceName') || 'User Service';

    this.app.use((req: any, res: any, next: any) => {
      if (req.originalUrl === '/' || req.originalUrl.includes('favicon.ico')) {
        return res.send(serviceName);
      }
      next();
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                 START APP                                 */
  /* -------------------------------------------------------------------------- */

  private async start() {
    const configService = this.app.get(ConfigService);
    const port = configService.get<number>('PORT') || 3366;

    await this.app.listen(port);

    Logger.log(`🚀 Application is running on: http://localhost:${port}`);
  }
}

UserServiceApp.bootstrap();
