import { HttpServer, HttpStatus, INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import * as request from 'supertest';
import { EntityManager } from 'typeorm';

import { globalExceptionFilters } from '@src/exceptions';
import { globalValidationPipe } from '@src/pipe/global-validation.pipe';

import { JwtPayload } from '@modules/auth/auth-jwt.interface';
import { UserModule } from '@modules/user/user.module';

import { CommonTestingModule } from '@test/common-testing.module';
import { cognitoEmail, mockLogger } from '@test/mocks/logger.mock';
import { AuthHeadersOptions } from '@test/types/test.types';

describe('User (e2e)', () => {
  const decode = jest.fn<Pick<JwtPayload, 'cognito:email'>, [string]>();

  let application: INestApplication;
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  let entityManager: EntityManager;
  let server: HttpServer;
  let requestHeaders: AuthHeadersOptions;

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [CommonTestingModule, UserModule],
    })
      .overrideProvider(JwtService)
      .useValue({ decode })
      .compile();

    application = testingModule
      .createNestApplication()
      .useGlobalFilters(...globalExceptionFilters)
      .useGlobalPipes(globalValidationPipe);

    application.useLogger(mockLogger);

    server = application.getHttpServer();
    entityManager = application.get(EntityManager);

    useContainer(application.select(UserModule), { fallbackOnErrors: true });
    await application.init();
  });

  afterEach(async () => {
    jest.resetAllMocks();
  });

  afterAll(async () => {
    await application.close();
  });

  beforeEach(() => {
    decode.mockReturnValue({ 'cognito:email': cognitoEmail });
    requestHeaders = {
      customerId: '569ee7d7-fb10-416c-9355-ba8ad8e6af0d',
      Authorization: 'Bearer <jwt token>',
    };
  });

  describe('POST /user', () => {
    it('should fail with status 400 if fields not provided', async () => {
      const response = await request(server).post('/user').set(requestHeaders).send({});

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: HttpStatus.BAD_REQUEST,
          errors: expect.arrayContaining([
            expect.objectContaining({ errorCode: 10206 }),
            expect.objectContaining({ errorCode: 10214 }),
            expect.objectContaining({ errorCode: 10203 }),
            expect.objectContaining({ errorCode: 10209 }),
            expect.objectContaining({ errorCode: 10211 }),
          ]),
        }),
      );
      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('GET /user', () => {
    it('should pass with status 200, and return list of users', async () => {
      const response = await request(server).get('/user').set(requestHeaders);

      expect(response.body?.data.length).toBe(45);
      expect(response.statusCode).toBe(HttpStatus.OK);
    });
  });
});
