import React, { useEffect } from 'react'

const ChatBot = () => {
  useEffect(() => {
    // Initialize and load the ChatBot script
    const script = document.createElement('script')
    script.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "IOUSSAI1FgQYjVuMFQSiT",
        domain: "www.chatbase.co"
      };
    `
    document.body.appendChild(script)

    const chatBotScript = document.createElement('script')
    chatBotScript.src = 'https://www.chatbase.co/embed.min.js'
    chatBotScript.chatbotId = 'IOUSSAI1FgQYjVuMFQSiT'
    chatBotScript.domain = 'www.chatbase.co'
    chatBotScript.defer = true
    document.body.appendChild(chatBotScript)

    // Cleanup function on unmount
    return () => {
      document.body.removeChild(script)
      document.body.removeChild(chatBotScript)
    }
  }, [])

  return (
    <div id="chatbot-container">
      {/* You can add any additional elements or styles for the chatbot here */}
    </div>
  )
}

export default ChatBot
