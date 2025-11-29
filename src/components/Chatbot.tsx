import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Loader2 } from 'lucide-react';
import { callOpenAIAPI } from '@/utils/openaiService';
import { showSuccess, showError } from '@/utils/toast';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatbotProps {}

const Chatbot: React.FC<ChatbotProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // New state for dynamic loading message
  const [loadingMessage, setLoadingMessage] = useState("Fetching information...");
  const timeoutRefs = useRef<number[]>([]); // To store timeout IDs

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    // Clear any existing timeouts when isLoading changes or component unmounts
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];

    if (isLoading) {
      setLoadingMessage("Fetching information...");
      
      const timer1 = setTimeout(() => {
        setLoadingMessage("Summarizing...");
      }, 120000) as unknown as number; // Double type assertion

      const timer2 = setTimeout(() => {
        setLoadingMessage("Typing...");
      }, 240000) as unknown as number; // Double type assertion

      timeoutRefs.current.push(timer1, timer2);
    } else {
      setLoadingMessage(""); // Reset message when not loading
    }

    return () => {
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, [isLoading]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true); // This will trigger the useEffect for loading messages

    try {
      const aiResponse = await callOpenAIAPI(newMessages);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error("Failed to get AI response:", error);
      showError("Failed to get AI response. Please check your API setup and try again.");
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I couldn't get a response. Please try again later." }]);
    } finally {
      setIsLoading(false); // This will trigger the useEffect to clear timeouts
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg bg-blue-600 hover:bg-blue-700 text-white z-50"
          aria-label="Open chat"
          onClick={() => showSuccess("Chatbot opened!")}
        >
          <MessageSquare className="h-7 w-7" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col h-[80vh] w-[90vw] max-w-md p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-xl font-bold">Chat with Stefano's CV</DialogTitle>
        </DialogHeader>

        {/* Warning Message */}
        <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-200 p-3 mx-4 mt-2 rounded-md text-sm">
          <p><strong>Warning:</strong> This AI chatbot is running on a local CPU machine, it may take a little to reply you, please be patient...</p>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                <p>Ask me anything about Stefano Grasso's CV!</p>
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[70%] p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {loadingMessage} {/* Use the dynamic loading message here */}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <div className="p-4 border-t flex items-center gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !isLoading) {
                handleSendMessage();
              }
            }}
            className="flex-1"
            disabled={isLoading}
          />
          <Button onClick={handleSendMessage} disabled={isLoading} size="icon">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Chatbot;