import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Platform')
@Controller()
export class ApiGatewayController {
  @Get()
  @ApiOperation({ summary: 'Get root api gateway information' })
  index() {
    return {
      name: 'Zippi Payment Core API',
      docs: '/api/docs',
      health: '/health',
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Check API gateway service health status' })
  health() {
    return {
      status: 'healthy',
      timestamp: new Date(),
      uptime: process.uptime(),
      version: '1.0.0',
    };
  }
}
