// src/data/defaultNotifications.js

const defaultNotifications = [
    {
      id: 1,
      type: 'new_game',
      timestamp: 'Just now',
      content: 'Started playing "Blox Fruits"',
      status: 'pending',
      game: {
        name: 'Blox Fruits',
        summary: 'Action-adventure game with combat elements.',
        concerns: [
          'Includes in-app purchases that can encourage impulsive spending.',
          'Online chat features may expose children to strangers.',
          'Some mild fantasy violence present.'
        ],
        risk: 'MODERATE'
      }
    },
    {
      id: 2,
      type: 'chat_alert',
      timestamp: '5 minutes ago',
      content: 'Inappropriate language detected in chat',
      status: 'pending',
      chatContext: {
        game: 'Adopt Me!',
        time: '2:30 PM',
        messages: [
          { user: 'Player123', message: 'Hey, want to trade pets?' },
          { user: 'YourChild', message: 'Sure, what do you have?' },
          { user: 'Player123', message: 'Give me your password and I will give you legendary pets!', flagged: true }
        ]
      }
    },
    {
      id: 3,
      type: 'friend_request',
      timestamp: '10 minutes ago',
      content: 'New friend request received',
      status: 'pending',
      friendRequest: {
        username: 'Player456',
        age: 'Unknown',
        mutualFriends: 2
      }
    }
  ];
  
  export default defaultNotifications;
  