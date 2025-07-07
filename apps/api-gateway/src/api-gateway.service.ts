import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Request, Response } from 'express';

@Injectable()
export class ApiGatewayService {
  async proxyRequest(req: Request, res: Response, targetBaseUrl: string) {
    try {
      // Build the full downstream URL
      const targetUrl = targetBaseUrl + req.originalUrl;
      // Prepare axios config
      const axiosConfig = {
        method: req.method as any,
        url: targetUrl,
        headers: { ...req.headers, host: undefined }, // Remove host header
        params: req.query,
        responseType: 'stream' as const,
        data: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
        validateStatus: () => true, // Forward all responses
      };
      const response = await axios(axiosConfig);
      res.status(response.status);
      // Copy headers except some forbidden ones
      Object.entries(response.headers).forEach(([key, value]) => {
        if (key.toLowerCase() === 'transfer-encoding') return;
        res.setHeader(key, value as string);
      });
      response.data.pipe(res);
    } catch (err: any) {
      const status = err.response?.status || 500;
      const data = err.response?.data || { error: 'Service not reachable', details: err.message };
      res.status(status).send(data);
    }
  }
}
