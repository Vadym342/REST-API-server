import { faker } from '@faker-js/faker';

import { Position } from '@modules/position/entities/position.entity';
import { User } from '@modules/user/entities/user.entity';

type NodeEnvType = 'development' | 'test';

export const serverImage = '5d348311-a99d-4b41-be07-a42c9756e3b0.jpg'; //static server image

function createRandomUser(): User {
  return {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    positionId: faker.number.int({ min: 1, max: 3 }),
    photo: serverImage,
    phone: `+380936647653`,
    password: faker.internet.password(),
    createdDate: faker.date.past(),
    updatedDate: faker.date.past(),
    deletedDate: null,
    position: null,
  };
}

export const seedUsers: User[] = faker.helpers.multiple(createRandomUser, {
  count: 45,
});

export const entityPositions: Record<NodeEnvType, Partial<Position>[]> = {
  development: [
    {
      id: 1,
      name: 'Security',
    },
    {
      id: 2,
      name: 'Designer',
    },
    {
      id: 3,
      name: 'Software Engineer',
    },
  ],
  test: [],
};

export const entityUsers: Record<NodeEnvType, Partial<User>[]> = {
  development: seedUsers,
  test: [],
};

entityPositions.test = entityPositions.development;
entityUsers.test = entityUsers.development;
