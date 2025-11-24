interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const callOpenAIAPI = async (
  messages: Message[],
  context: string
): Promise<string> => {
  const LLAMACPP_URL = import.meta.env.VITE_LLAMACPP_URL;
  const LLAMACPP_KEY = import.meta.env.VITE_LLAMACPP_KEY;

  if (!LLAMACPP_URL || !LLAMACPP_KEY) {
    throw new Error("LLAMACPP_URL and LLAMACPP_KEY environment variables must be set.");
  }

  const systemPrompt = `You are a helpful assistant for someone interested in the CV and experience of Stefano Grasso Synthetic Biologist. Here is all his information:\n\n${context}\n\nReply always in maximum one paragraph.`;

  const apiMessages: Message[] = [
    { role: 'system', content: systemPrompt },
    ...messages,
  ];

  try {
    const response = await fetch(LLAMACPP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LLAMACPP_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Or your specific model if different
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${response.status} - ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
};