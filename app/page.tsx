'use client'

import { useState } from 'react'
import { Paperclip, Send } from 'lucide-react'
import styles from './page.module.css'

export default function Home() {
  const [messages, setMessages] = useState<Array<{id: number, text: string, type: 'user' | 'bot'}>>([])
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages(prev => [...prev, {
      id: Date.now(),
      text: input,
      type: 'user'
    }])
    setInput('')

    // Здесь будет вызов API чата
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: 'Это тестовый ответ бота',
        type: 'bot'
      }])
    }, 1000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Здесь будет логика обработки файла
      console.log('Выбран файл:', file.name)
    }
  }

  return (
    <div className={styles.container}>
      {/* Заголовок */}
      <header className={styles.header}>
        <h1>ChatAI</h1>
      </header>

      {/* Область чата */}
      <main className={styles.chatArea}>
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            Начните диалог, задав свой вопрос
          </div>
        ) : (
          <div className={styles.messages}>
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`${styles.message} ${
                  message.type === 'user' ? styles.userMessage : styles.botMessage
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Форма ввода */}
      <footer className={styles.inputArea}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Кнопка прикрепления файла */}
          <label className={styles.attachButton}>
            <Paperclip />
            <input 
              type="file" 
              onChange={handleFileChange} 
              className={styles.fileInput}
              accept="image/*,.pdf,.doc,.docx"
            />
          </label>

          {/* Поле ввода */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Введите ваш вопрос..."
            className={styles.input}
          />

          {/* Кнопка отправки */}
          <button 
            type="submit" 
            className={styles.sendButton}
            disabled={!input.trim()}
          >
            <Send />
          </button>
        </form>
      </footer>
    </div>
  )
}