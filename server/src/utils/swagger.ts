import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { API_BEARER_AUTH_TYPE } from '@src/constants/swagger';

export function useSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('REST API')
    .setDescription('TEST PROJECT')
    .setVersion(process.env.APP_VERSION)
    .addApiKey(
      {
        description: 'User id in <b>uuid</b> format',
        name: 'userId',
        type: 'apiKey',
        in: 'header',
      },
      'userId',
    )
    .addSecurityRequirements('userId')
    .addBearerAuth(
      {
        description: `Please enter token in following format: Bearer ${API_BEARER_AUTH_TYPE}`,
        name: 'Authorization',
        bearerFormat: `${API_BEARER_AUTH_TYPE}`,
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      `${API_BEARER_AUTH_TYPE}`,
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
