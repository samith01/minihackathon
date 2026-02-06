import { useState, useRef, useEffect } from 'react';
import { offCampusListings, listingsToText } from '../data/offCampusListings';
import { chatWithGroq } from '../services/groqApi';
import { ListingCard } from './ListingCard';
import type { Listing } from '../types';
import './ChatInterface.css';

// Simple markdown parser
function parseMarkdown(text: string): string {
  return text
    // Escape HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Line breaks
    .replace(/\n/g, '<br />');
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  listings?: Listing[];
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your uOttawa Housing Assistant. I have 15 real listings near campus. Tell me what you're looking for - budget, bedrooms, location preferences, amenities - and I'll find the perfect place for you!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(
    import.meta.env.VITE_GROQ_API_KEY || localStorage.getItem('groq_api_key') || ''
  );
  const [showApiKeyInput, setShowApiKeyInput] = useState(!apiKey);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSaveApiKey = () => {
    localStorage.setItem('groq_api_key', apiKey);
    setShowApiKeyInput(false);
  };

  const handleSend = async () => {
    if (!input.trim() || !apiKey) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Build conversation history for context
      const conversationHistory = messages.slice(-6).map(m => ({
        role: m.role,
        content: m.content
      }));

      const systemPrompt = `You are a helpful uOttawa Housing Assistant. You have access to the following real off-campus housing listings near the University of Ottawa:

${listingsToText(offCampusListings)}

INSTRUCTIONS:
1. When the user asks for housing, analyze their requirements (budget, bedrooms, location, amenities, etc.)
2. Search through the listings above and find the BEST matches
3. In your response, recommend specific listings by their exact title and explain WHY they're good matches
4. Always mention the price, location, and key features
5. If the user's budget is too low or requirements can't be met, suggest the closest alternatives
6. Be conversational, helpful, and enthusiastic!
7. At the end of your response, output a JSON array of the listing IDs you recommend, like this: [LISTINGS: 1, 5, 12]

Example response format:
"Based on your budget of $1200 and preference for Sandy Hill, I found 2 great options!

**Best Match: "Student Special on Stewart"** - $1,100/month
This no-frills 1-bedroom is perfect for budget-conscious students. It's just 7 minutes from campus and has laundry in the building.

**Also Consider: "Affordable 1-Bed on Friel"** - $1,250/month  
Slightly over budget but includes heat and hot water, which could save you money overall.

[LISTINGS: 13, 7]"`;

      const groqResponse = await chatWithGroq([
        { role: 'system', content: systemPrompt },
        ...conversationHistory,
        { role: 'user', content: userMessage }
      ], apiKey);

      const responseText = groqResponse.choices[0].message.content;
      
      // Extract listing IDs from response
      const listingMatch = responseText.match(/\[LISTINGS?:\s*([\d,\s]+)\]/i);
      let recommendedListings: Listing[] = [];
      
      if (listingMatch) {
        const ids = listingMatch[1].split(',').map((s: string) => s.trim());
        recommendedListings = ids
          .map((id: string) => offCampusListings.find(l => l.id === id))
          .filter((l: Listing | undefined): l is Listing => l !== undefined);
      }
      
      // Clean the response text (remove the listings tag)
      const cleanResponse = responseText.replace(/\[LISTINGS?:\s*[\d,\s]+\]/gi, '').trim();

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: cleanResponse,
        listings: recommendedListings
      }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Sorry, I hit a snag: ${error instanceof Error ? error.message : 'Unknown error'}. Make sure your Groq API key is correct.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (showApiKeyInput) {
    return (
      <div className="api-key-overlay">
        <div className="api-key-modal">
          <h2>Enter Groq API Key</h2>
          <p>This is stored locally in your browser.</p>
          <input 
            type="password" 
            placeholder="gsk_..." 
            value={apiKey} 
            onChange={(e) => setApiKey(e.target.value)}
          />
          <button onClick={handleSaveApiKey} disabled={!apiKey}>Start Chatting</button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.role}`}>
            <div 
              className="message-bubble"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(m.content) }}
            />
            {m.listings && m.listings.length > 0 && (
              <div className="message-listings">
                {m.listings.map(l => (
                  <ListingCard key={l.id} listing={l} />
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="message assistant">
            <div className="message-bubble loading">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Describe your ideal home..."
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading || !input.trim()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
