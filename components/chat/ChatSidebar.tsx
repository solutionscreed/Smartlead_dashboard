'use client';

import { useEffect, useState } from 'react';
import styles from './ChatSidebar.module.css';

interface Contact {
  id: string;
  name: string;
  avatar_url: string;
  platform: string; // 'smartlead', 'sasmail', 'instantly'
  message_snippet: string;
  unread_count: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

const MOCK_CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Techverse Inc.',
    avatar_url: 'https://i.pravatar.cc/150?img=1',
    platform: 'smartlead',
    message_snippet: 'We reviewed your proposal, looks promising.',
    unread_count: 0,
    sentiment: 'positive',
  },
  {
    id: '2',
    name: 'Nimbus Co.',
    avatar_url: 'https://i.pravatar.cc/150?img=2',
    platform: 'sasmail',
    message_snippet: 'Can you send over more case studies?',
    unread_count: 3,
    sentiment: 'positive',
  },
  {
    id: '3',
    name: 'Orbit Digital',
    avatar_url: 'https://i.pravatar.cc/150?img=3',
    platform: 'instantly',
    message_snippet: 'Thanks, but we’re not taking on new vendors.',
    unread_count: 3,
    sentiment: 'negative',
  },
  {
    id: '4',
    name: 'Vertex Corp',
    avatar_url: 'https://i.pravatar.cc/150?img=4',
    platform: 'smartlead',
    message_snippet: 'How’s your availability next Thursday?',
    unread_count: 0,
    sentiment: 'positive',
  },
  {
    id: '5',
    name: 'Bluestream Labs',
    avatar_url: 'https://i.pravatar.cc/150?img=5',
    platform: 'sasmail',
    message_snippet: 'We’ll get back to you by early next week.',
    unread_count: 2,
    sentiment: 'neutral',
  },
  {
    id: '6',
    name: 'NextGen Media',
    avatar_url: 'https://i.pravatar.cc/150?img=1',
    platform: 'smartlead',
    message_snippet: 'Let’s align this with Q3 goals.',
    unread_count: 0,
    sentiment: 'positive',
  },
  {
    id: '7',
    name: 'Pioneer Works',
    avatar_url: 'https://i.pravatar.cc/150?img=2',
    platform: 'sasmail',
    message_snippet: 'Sounds like a fit, let’s dive deeper.',
    unread_count: 3,
    sentiment: 'positive',
  },
  {
    id: '8',
    name: 'Gridline Systems',
    avatar_url: 'https://i.pravatar.cc/150?img=3',
    platform: 'instantly',
    message_snippet: 'Not interested, please remove us from your list.',
    unread_count: 3,
    sentiment: 'negative',
  },
  {
    id: '9',
    name: 'Lumina AI',
    avatar_url: 'https://i.pravatar.cc/150?img=4',
    platform: 'smartlead',
    message_snippet: 'Open to a call next week?',
    unread_count: 0,
    sentiment: 'positive',
  },
  {
    id: '10',
    name: 'Equinox Labs',
    avatar_url: 'https://i.pravatar.cc/150?img=5',
    platform: 'sasmail',
    message_snippet: 'Team is reviewing internally, will revert.',
    unread_count: 2,
    sentiment: 'neutral',
  },
  {
    id: '11',
    name: 'Cloudfinity',
    avatar_url: 'https://i.pravatar.cc/150?img=1',
    platform: 'smartlead',
    message_snippet: 'Appreciate the outreach — we’ll follow up soon.',
    unread_count: 0,
    sentiment: 'positive',
  },
  {
    id: '12',
    name: 'Zenith Group',
    avatar_url: 'https://i.pravatar.cc/150?img=2',
    platform: 'sasmail',
    message_snippet: 'Looks promising, can we see client references?',
    unread_count: 3,
    sentiment: 'positive',
  },
  {
    id: '13',
    name: 'IronPixel',
    avatar_url: 'https://i.pravatar.cc/150?img=3',
    platform: 'instantly',
    message_snippet: 'We’re not pursuing external solutions right now.',
    unread_count: 3,
    sentiment: 'negative',
  },
  {
    id: '14',
    name: 'NovaSpark (HR)',
    avatar_url: 'https://i.pravatar.cc/150?img=4',
    platform: 'smartlead',
    message_snippet: 'Interested — let’s discuss on Monday.',
    unread_count: 0,
    sentiment: 'positive',
  },
  {
    id: '15',
    name: 'Omnia Health (HR)',
    avatar_url: 'https://i.pravatar.cc/150?img=5',
    platform: 'sasmail',
    message_snippet: 'The leadership team is reviewing your deck.',
    unread_count: 2,
    sentiment: 'neutral',
  },
];

export default function ChatSidebar() {
  const [contacts, setContacts] = useState<Contact[]>(MOCK_CONTACTS);
  const [activeTab, setActiveTab] = useState<'all' | 'smartlead' | 'instantly' | 'sasmail'>('all');

  const filtered = activeTab === 'all'
    ? contacts
    : contacts.filter(c => c.platform === activeTab);

  return (
    <div className={styles.sidebar}>
      <div className={styles.tabs}>
        {['sasmail', 'instantly', 'smartlead'].map((platform) => {
          const count = contacts.filter(c => c.platform === platform && c.unread_count > 0).length;
          return (
            <div
              key={platform}
              className={`${styles.tab} ${activeTab === platform ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(platform as any)}
            >
              {platform.toUpperCase()}
              {count > 0 && <span className={styles.badge}>{count}</span>}
            </div>
          );
        })}
      </div>

      <input className={styles.search} placeholder="Search for user or chat" />

      <div className={styles.filterButtons}>
        <button>All</button>
        <button>Positive</button>
        <button>Negative</button>
        <button>Not Answered</button>
      </div>

      <div className={styles.contactList}>
        {filtered.map((c) => (
          <div key={c.id} className={styles.contactItem}>
            <img src={c.avatar_url} className={styles.avatar} />
            <div className={styles.contactText}>
              <p>{c.name}</p>
              <small>{c.message_snippet.slice(0, 40)}...</small>
            </div>
            {c.unread_count > 0 ? (
              <span className={styles.redDot}>{c.unread_count}</span>
            ) : (
              <span className={styles.greenDot}></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
