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
      name: 'Company A (HR)',
      avatar_url: 'https://i.pravatar.cc/150?img=1',
      platform: 'smartlead',
      message_snippet: 'Let’s schedule a meeting...',
      unread_count: 0,
      sentiment: 'positive',
    },
    {
      id: '2',
      name: 'Company C (HR)',
      avatar_url: 'https://i.pravatar.cc/150?img=2',
      platform: 'sasmail',
      message_snippet: 'We are interested in learning more...',
      unread_count: 3,
      sentiment: 'positive',
    },
    {
      id: '3',
      name: 'Company B (HR)',
      avatar_url: 'https://i.pravatar.cc/150?img=3',
      platform: 'instantly',
      message_snippet: 'We’re sorry but not looking right now...',
      unread_count: 3,
      sentiment: 'negative',
    },
    {
      id: '4',
      name: 'Company D (HR)',
      avatar_url: 'https://i.pravatar.cc/150?img=4',
      platform: 'smartlead',
      message_snippet: 'Let’s get on a call tomorrow...',
      unread_count: 0,
      sentiment: 'positive',
    },
    {
      id: '5',
      name: 'Company E (HR)',
      avatar_url: 'https://i.pravatar.cc/150?img=5',
      platform: 'sasmail',
      message_snippet: 'We have forwarded it to the team...',
      unread_count: 2,
      sentiment: 'neutral',
    },
    {
        id: '6',
        name: 'Company A (HR)',
        avatar_url: 'https://i.pravatar.cc/150?img=1',
        platform: 'smartlead',
        message_snippet: 'Let’s schedule a meeting...',
        unread_count: 0,
        sentiment: 'positive',
      },
      {
        id: '7',
        name: 'Company C (HR)',
        avatar_url: 'https://i.pravatar.cc/150?img=2',
        platform: 'sasmail',
        message_snippet: 'We are interested in learning more...',
        unread_count: 3,
        sentiment: 'positive',
      },
      {
        id: '8',
        name: 'Company B (HR)',
        avatar_url: 'https://i.pravatar.cc/150?img=3',
        platform: 'instantly',
        message_snippet: 'We’re sorry but not looking right now...',
        unread_count: 3,
        sentiment: 'negative',
      },
      {
        id: '9',
        name: 'Company D (HR)',
        avatar_url: 'https://i.pravatar.cc/150?img=4',
        platform: 'smartlead',
        message_snippet: 'Let’s get on a call tomorrow...',
        unread_count: 0,
        sentiment: 'positive',
      },
      {
        id: '10',
        name: 'Company E (HR)',
        avatar_url: 'https://i.pravatar.cc/150?img=5',
        platform: 'sasmail',
        message_snippet: 'We have forwarded it to the team...',
        unread_count: 2,
        sentiment: 'neutral',
      },
      {
        id: '11',
        name: 'Company A (HR)',
        avatar_url: 'https://i.pravatar.cc/150?img=1',
        platform: 'smartlead',
        message_snippet: 'Let’s schedule a meeting...',
        unread_count: 0,
        sentiment: 'positive',
      },
      {
        id: '12',
        name: 'Company C (HR)',
        avatar_url: 'https://i.pravatar.cc/150?img=2',
        platform: 'sasmail',
        message_snippet: 'We are interested in learning more...',
        unread_count: 3,
        sentiment: 'positive',
      },
      {
        id: '13',
        name: 'Company B (HR)',
        avatar_url: 'https://i.pravatar.cc/150?img=3',
        platform: 'instantly',
        message_snippet: 'We’re sorry but not looking right now...',
        unread_count: 3,
        sentiment: 'negative',
      },
      {
        id: '14',
        name: 'Company D (HR)',
        avatar_url: 'https://i.pravatar.cc/150?img=4',
        platform: 'smartlead',
        message_snippet: 'Let’s get on a call tomorrow...',
        unread_count: 0,
        sentiment: 'positive',
      },
      {
        id: '15',
        name: 'Company E (HR)',
        avatar_url: 'https://i.pravatar.cc/150?img=5',
        platform: 'sasmail',
        message_snippet: 'We have forwarded it to the team...',
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
