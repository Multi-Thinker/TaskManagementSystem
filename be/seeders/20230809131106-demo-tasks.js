'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Tasks',
      [
        {
          id: 'a2eb515c-9f45-4db2-8790-bb06f101b54a',
          title: 'Task 1',
          taskType: 'todo',
          isDone: true,
          userId: 'e681a5f5-4072-4d5f-9b54-477ebc99e3eb',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'a2eb515c-9f45-4db2-8790-bb06f101b54b',
          title: 'Task 2',
          taskType: 'reminder',
          isDone: false,
          userId: 'e681a5f5-4072-4d5f-9b54-477ebc99e3eb',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};
