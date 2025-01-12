'use client'

import { useChat } from 'ai/react'
import { Camera, Send, Paperclip } from 'lucide-react'
import { useState } from 'react'
import styles from './Chat.module.css'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://web.cari1412.online'

export default function Chat() {
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [generatedImage, setGeneratedImage] = useState('')

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: `${API_URL}/api/chat`,
  })

  const handleImageGeneration = async () => {
    if (!input) return
    setIsGeneratingImage(true)
    try {
      const response = await fetch(`${API_URL}/api/generate-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      })
      
      if (!response.ok) throw new Error('Failed to generate image')

      const data = await response.json()
      setGeneratedImage(data.imageUrl)
    } catch (error) {
      console.error(error)
    } finally {
      setIsGeneratingImage(false)
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>AI Chat Assistant</h1>
      </header>

      <main className={styles.messagesArea}>
        {messages.length === 0 ? (
          <div className={styles.placeholder}>
            Начните диалог или сгенерируйте изображение
          </div>
        ) : (
          <div className={styles.messages}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${
                  message.role === 'assistant' ? styles.assistant : styles.user
                }`}
              >
                <div className={styles.messageContent}>
                  {message.content}
                </div>
              </div>
            ))}
            {generatedImage && (
              <div className={styles.imageContainer}>
                <img src={generatedImage} alt="Generated" />
              </div>
            )}
          </div>
        )}
      </main>

      <footer className={styles.inputArea}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <button type="button" className={styles.iconButton}>
            <Paperclip />
          </button>
          
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Введите сообщение..."
            disabled={isLoading || isGeneratingImage}
            className={styles.input}
          />
          
          <button
            type="button"
            onClick={handleImageGeneration}
            disabled={!input || isLoading || isGeneratingImage}
            className={styles.iconButton}
          >
            <Camera className={isGeneratingImage ? styles.spin : ''} />
          </button>
          
          <button
            type="submit"
            disabled={!input || isLoading}
            className={`${styles.iconButton} ${styles.sendButton}`}
          >
            <Send />
          </button>
        </form>
      </footer>
    </div>
  )
}