import { subDays, subHours, subMinutes } from 'date-fns';
import { createResourceId } from '../utils/create-resource-id';
import { deepCopy } from '../utils/deep-copy';

const now = new Date();

const contacts = [
  {
    id: '5e8891ab188cd2855e6029b7',
    avatar: '/static/mock-images/avatars/avatar-alcides_antonio.png',
    isActive: true,
    lastActivity: now.getTime(),
    name: 'Alcides Antonio'
  },
  {
    id: '5e887a62195cc5aef7e8ca5d',
    avatar: '/static/mock-images/avatars/avatar-marcus_finn.png',
    isActive: false,
    lastActivity: subHours(now, 2).getTime(),
    name: 'Marcus Finn'
  },
  {
    id: '5e887ac47eed253091be10cb',
    avatar: '/static/mock-images/avatars/avatar-carson_darrin.png',
    isActive: false,
    lastActivity: subMinutes(now, 15).getTime(),
    name: 'Carson Darrin'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    avatar: '/static/mock-images/avatars/avatar-fran_perez.png',
    isActive: true,
    lastActivity: now.getTime(),
    name: 'Fran Perez'
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    avatar: '/static/mock-images/avatars/avatar-jie_yan_song.png',
    isActive: true,
    lastActivity: now.getTime(),
    name: 'Jie Yan Song'
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    avatar: '/static/mock-images/avatars/avatar-miron_vitold.png',
    isActive: false,
    lastActivity: subHours(now, 1).getTime(),
    name: 'Miron Vitold'
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    avatar: '/static/mock-images/avatars/avatar-penjani_inyene.png',
    isActive: false,
    lastActivity: subHours(now, 6).getTime(),
    name: 'Penjani Inyene'
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    avatar: '/static/mock-images/avatars/avatar-omar_darboe.png',
    isActive: true,
    lastActivity: now.getTime(),
    name: 'Omar Darobe'
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    avatar: '/static/mock-images/avatars/avatar-siegbert_gottfried.png',
    isActive: true,
    lastActivity: now.getTime(),
    name: 'Siegbert Gottfried'
  },
  {
    id: '5e8877da9a65442b11551975',
    avatar: '/static/mock-images/avatars/avatar-iulia_albu.png',
    isActive: true,
    lastActivity: now.getTime(),
    name: 'Iulia Albu'
  },
  {
    id: '5e8680e60cba5019c5ca6fda',
    avatar: '/static/mock-images/avatars/avatar-nasimiyu_danai.png',
    isActive: true,
    lastActivity: now.getTime(),
    name: 'Nasimiyu Danai'
  }
];

let threads = [
  {
    id: '5e867eb9de721aecaccf4f7b',
    messages: [
      {
        id: '5e867f0a5bc0ff2bfa07bfa6',
        attachments: [],
        body: 'Hey, I saw your changes on Variant_4! I really like your ideas. Will that change the budget estimate at all?',
        contentType: 'text',
        createdAt: subDays(subHours(now, 10), 4).getTime(),
        authorId: '5e86805e2bafd54f66cc95c3'
      },
      {
        id: '5e867f167d5f78109ae9f2a4',
        attachments: [],
        body: 'I am glad you like them, and the budget won\'t change at all don\'t worry.',
        contentType: 'text',
        createdAt: subDays(subHours(now, 2), 4).getTime(),
        authorId: '5e86809283e28b96d2d38537'
      },
      {
        id: '5e867f1c9ca72084693528f4',
        attachments: [],
        body: 'Ok thats great. Maybe we can schedule a call for next week if that works for you?',
        contentType: 'text',
        createdAt: subHours(now, 5).getTime(),
        authorId: '5e86805e2bafd54f66cc95c3'
      },
      {
        id: '5e867f22fd2e27a09849b4db',
        attachments: [],
        body: 'Sounds great. I will put together a 3D of Variant_4 for the meeting',
        contentType: 'text',
        createdAt: subHours(now, 3).getTime(),
        authorId: '5e86809283e28b96d2d38537'
      },
      {
        id: '5e867f28a34d45ac6eb5c41f',
        attachments: [],
        body: 'Perfect. I\'m excited to see it',
        contentType: 'text',
        createdAt: subHours(now, 2).getTime(),
        authorId: '5e86805e2bafd54f66cc95c3'
      }
    ],
    participantIds: [
      '5e86809283e28b96d2d38537',
      '5e86805e2bafd54f66cc95c3'
    ],
    type: 'ONE_TO_ONE',
    unreadCount: 2
  },
  {
    id: '5e867fa7082c3c5921403a26',
    messages: [
      {
        id: '5e867fc180837d901bd9bca1',
        attachments: [],
        body: 'Hey, thanks for adding me to the project.',
        contentType: 'text',
        createdAt: subDays(subMinutes(now, 6), 3).getTime(),
        authorId: '5e8680e60cba5019c5ca6fda'
      },
      {
        id: '5e8d6fb695df7971237fc173',
        attachments: [],
        body: 'Hi, Nasimiyu! I\'m happy to have you here. I think we\'ll make some really great progress by collaborating together on this project.',
        contentType: 'text',
        createdAt: subDays(subMinutes(now, 5), 3).getTime(),
        authorId: '5e86809283e28b96d2d38537'
      },
      {
        id: '58825a290eb4d4271a54f188',
        attachments: [],
        body: 'Hey! Yea, we are very excited to help you design your dream home Nasimiyu!',
        contentType: 'text',
        createdAt: subDays(subMinutes(now, 2), 1).getTime(),
        authorId: '5e8891ab188cd2855e6029b7'
      }
    ],
    participantIds: [
      '5e86809283e28b96d2d38537',
      '5e8680e60cba5019c5ca6fda',
      '5e8891ab188cd2855e6029b7'
    ],
    type: 'GROUP',
    unreadCount: 0
  }
];

const findThreadById = (threadId) => {
  const thread = threads.find((_threadId) => _threadId.id === threadId);

  return thread || null;
};

const findThreadByParticipantIds = (participantIds) => {
  const thread = threads.find((_thread) => {
    if (_thread.participantIds.length !== participantIds.length) {
      return false;
    }

    const foundParticipantIds = new Set();

    _thread.participantIds.forEach((participantId) => {
      if (participantIds.includes(participantId)) {
        foundParticipantIds.add(participantId);
      }
    });

    return foundParticipantIds.size === participantIds.length;
  });

  return thread || null;
};

class ChatApi {
  getContacts(query) {
    return new Promise((resolve, reject) => {
      try {
        let foundContacts = contacts;

        if (query) {
          const cleanQuery = query.toLowerCase().trim();
          foundContacts =
            foundContacts.filter((contact) => (contact.name.toLowerCase().includes(cleanQuery)));
        }

        resolve(deepCopy(foundContacts));
      } catch (err) {
        console.error('[Chat Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  getThreads() {
    // On server get current identity (user) from the request
    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/static/mock-images/avatars/avatar-anika_visser.png',
      name: 'Anika Visser'
    };

    const expandedThreads = threads.map((thread) => {
      const participants = [user];

      contacts.forEach((contact) => {
        if (thread.participantIds.includes(contact.id)) {
          participants.push({
            id: contact.id,
            avatar: contact.avatar,
            lastActivity: contact.lastActivity,
            name: contact.name
          });
        }
      });

      return {
        ...thread,
        participants
      };
    });

    return Promise.resolve(deepCopy(expandedThreads));
  }

  getThread(threadKey) {
    return new Promise((resolve, reject) => {
      if (!threadKey) {
        reject(new Error('Thread key is required'));
        return;
      }

      try {
        // On server get current identity (user) from the request
        const user = {
          id: '5e86809283e28b96d2d38537',
          avatar: '/static/mock-images/avatars/avatar-anika_visser.png',
          name: 'Anika Visser'
        };

        let thread;

        // Thread key might be a contact ID
        const contact = contacts.find((contact) => contact.id === threadKey);

        if (contact) {
          thread = findThreadByParticipantIds([user.id, contact.id]);
        }

        // Thread key might be a thread ID
        if (!thread) {
          thread = findThreadById(threadKey);
        }

        // If reached this point and thread does not exist this could mean:
        // b) The thread key is a contact ID, but no thread found
        // a) The thread key is a thread ID and is invalid
        if (!thread) {
          return resolve(null);
        }

        const participants = [user];

        contacts.forEach((contact) => {
          if (thread.participantIds.includes(contact.id)) {
            participants.push({
              id: contact.id,
              avatar: contact.avatar,
              lastActivity: contact.lastActivity,
              name: contact.name
            });
          }
        });

        const expandedThread = {
          ...thread,
          participants
        };

        resolve(deepCopy(expandedThread));
      } catch (err) {
        console.error('[Chat Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  markThreadAsSeen(threadId) {
    return new Promise((resolve, reject) => {
      try {
        const thread = threads.find((_thread) => _thread.id === threadId);

        if (thread) {
          thread.unreadCount = 0;
        }

        resolve(true);
      } catch (err) {
        console.error('[Chat Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  getParticipants(threadKey) {
    return new Promise((resolve, reject) => {
      try {
        // On server get current identity (user) from the request
        const user = {
          id: '5e86809283e28b96d2d38537',
          avatar: '/static/mock-images/avatars/avatar-anika_visser.png',
          name: 'Anika Visser'
        };

        let participants = [user];

        // Thread key might be a thread ID
        let thread = findThreadById(threadKey);

        if (thread) {
          contacts.forEach((contact) => {
            if (thread.participantIds.includes(contact.id)) {
              participants.push({
                id: contact.id,
                avatar: contact.avatar,
                lastActivity: contact.lastActivity,
                name: contact.name
              });
            }
          });
        } else {
          const contact = contacts.find((contact) => contact.id === threadKey);

          // If no contact found, the user is trying a shady route
          if (!contact) {
            reject(new Error('Unable to find the contact'));
            return;
          }

          participants.push({
            id: contact.id,
            avatar: contact.avatar,
            lastActivity: contact.lastActivity,
            name: contact.name
          });
        }

        return resolve(participants);
      } catch (err) {
        console.error('[Chat Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  addMessage({ threadId, recipientIds, body }) {
    return new Promise((resolve, reject) => {
      try {
        if (!(threadId || recipientIds)) {
          reject(new Error('Thread ID or recipient IDs has to be provided'));
          return;
        }

        // On server get current identity (user) from the request
        const user = {
          id: '5e86809283e28b96d2d38537'
        };

        let thread;

        // Try to find the thread
        if (threadId) {
          thread = findThreadById(threadId);

          // If thread ID provided the thread has to exist.

          if (!thread) {
            reject(new Error('Invalid thread id'));
            return;
          }
        } else {
          const participantIds = [user.id, ...recipientIds];
          thread = findThreadByParticipantIds(participantIds);
        }

        // If reached this point, thread will exist if thread ID provided
        // For recipient Ids it may or may not exist. If it doesn't, create a new one.

        if (!thread) {
          const participantIds = [user.id, ...recipientIds];

          thread = {
            id: createResourceId(),
            messages: [],
            participantIds,
            type: participantIds.length === 2 ? 'ONE_TO_ONE' : 'GROUP',
            unreadCount: 0
          };

          // Add the new thread to the DB
          threads.push(thread);
        }

        const message = {
          id: createResourceId(),
          attachments: [],
          body,
          contentType: 'text',
          createdAt: new Date().getTime(),
          authorId: user.id
        };

        thread.messages.push(message);

        resolve({
          threadId: thread.id,
          message
        });
      } catch (err) {
        console.error('[Chat Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const chatApi = new ChatApi();
