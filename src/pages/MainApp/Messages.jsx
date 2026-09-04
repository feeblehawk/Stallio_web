import  { useState, useEffect, useMemo, useRef } from 'react'
import { Send, Search, MessageCircle, CheckCheck, ArrowLeft,
  Sparkles, ShoppingBag, } from 'lucide-react'
import { PageHeader, StatusBadge, useToast } from '../../components/ui'
import { getConversations, sendMessage, markAsRead, getQuickReplies,
  addQuickReply, } from '../../services/messageService'

export const Messages = () => {
  const toast = useToast()
  const [conversations, setConversations] = useState([])
  const [activeConvId, setActiveConvId] = useState('conv-1')
  const [searchQuery, setSearchQuery] = useState('')
  const [inputText, setInputText] = useState('')
  const [quickReplies, setQuickReplies] = useState([])
  const [isMobileThreadOpen, setIsMobileThreadOpen] = useState(false)
  const [isAddingReply, setIsAddingReply] = useState(false)
  const [newReplyText, setNewReplyText] = useState('')

  const messagesEndRef = useRef(null)

  // Load conversations & quick replies
  useEffect(() => {
    const list = getConversations()
    setConversations(list)
    setQuickReplies(getQuickReplies())
    if (list.length > 0 && !activeConvId) {
      setActiveConvId(list[0].id)
    }
  }, [])

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversations, activeConvId])

  // Active conversation object
  const activeConversation = useMemo(() => {
    return conversations.find((c) => c.id === activeConvId) || conversations[0]
  }, [conversations, activeConvId])

  // Filtered conversation list
  const filteredConversations = useMemo(() => {
    return conversations.filter((c) => {
      const q = searchQuery.toLowerCase().trim()
      if (!q) return true
      return (
        c.customer.name.toLowerCase().includes(q) ||
        c.customer.handle?.toLowerCase().includes(q) ||
        c.messages.some((m) => m.text.toLowerCase().includes(q))
      )
    })
  }, [conversations, searchQuery])

  // Handlers
  const handleSelectConversation = (convId) => {
    setActiveConvId(convId)
    markAsRead(convId)
    setConversations(getConversations())
    setIsMobileThreadOpen(true)
  }

  const handleSendMessage = (textToSend) => {
    const message = textToSend || inputText
    if (!message.trim() || !activeConversation) return

    sendMessage(activeConversation.id, message.trim(), 'merchant')
    setConversations(getConversations())
    setInputText('')

    // Optional simulated buyer reply after 2 seconds for interactivity
    setTimeout(() => {
      if (activeConversation.id === 'conv-1') {
        sendMessage(
          'conv-1',
          'Perfect, thank you so much! Really appreciate the quick update.',
          'customer'
        )
        setConversations(getConversations())
      }
    }, 2500)
  }

  const handleQuickReplyClick = (replyText) => {
    handleSendMessage(replyText)
    toast.success('Sent quick reply')
  }

  const handleCreateNewQuickReply = (e) => {
    e.preventDefault()
    if (!newReplyText.trim()) return
    const updated = addQuickReply(newReplyText.trim())
    setQuickReplies(updated)
    setNewReplyText('')
    setIsAddingReply(false)
    toast.success('Added new Quick Reply template')
  }

  const channelBadge = (channel) => {
    switch (channel) {
      case 'whatsapp':
        return (
          <span className="rounded-md bg-[#25D366]/15 px-1.5 py-0.5 text-[9px] font-bold text-[#25D366] uppercase">
            WhatsApp
          </span>
        )
      case 'instagram':
        return (
          <span className="rounded-md bg-purple-500/15 px-1.5 py-0.5 text-[9px] font-bold text-purple-500 uppercase">
            Instagram
          </span>
        )
      default:
        return (
          <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[9px] font-bold text-primary uppercase">
            Store Chat
          </span>
        )
    }
  }

  return (
    <div className="space-y-4 pb-12">
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <PageHeader
        title="Messages"
        subtitle="Live multi-channel conversations with buyers from WhatsApp, Instagram, and your storefront."
      />

      {/* ── Two-Pane WhatsApp-Style Hub ─────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 rounded-2xl border border-border bg-card shadow-sm  h-[calc(100vh-210px)] min-h-[520px]">
        {/* ── LEFT PANE: Conversations List ─────────────────────────── */}
        <div
          className={`flex flex-col border-r border-border bg-card md:col-span-5 lg:col-span-4 h-full ${
            isMobileThreadOpen ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Search Header */}
          <div className="p-3 border-b border-border bg-muted/20 space-y-2">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chats or messages…"
                className="w-full rounded-xl border border-border bg-card pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
              />
            </div>
          </div>

          {/* Conversation Cards Scroll Area */}
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {filteredConversations.length === 0 ? (
              <div className="p-6 text-center text-xs text-muted-foreground">
                No conversations matching your search.
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isActive = conv.id === activeConvId
                const lastMsg = conv.messages[conv.messages.length - 1]

                return (
                  <div
                    key={conv.id}
                    onClick={() => handleSelectConversation(conv.id)}
                    className={`flex items-start gap-3 p-3.5 transition-colors cursor-pointer select-none ${
                      isActive
                        ? 'bg-primary/10 border-l-4 border-l-primary'
                        : 'hover:bg-accent/40'
                    }`}
                  >
                    {/* Avatar with Channel Badge */}
                    <div className="relative shrink-0">
                      <img
                        src={conv.customer.avatar}
                        alt={conv.customer.name}
                        className="h-10 w-10 rounded-full border border-border object-cover"
                      />
                    </div>

                    {/* Chat Preview Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-foreground text-xs truncate">
                          {conv.customer.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground shrink-0">
                          {lastMsg?.timestamp}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 mt-0.5">
                        {channelBadge(conv.customer.channel)}
                        {conv.orderId && (
                          <span className="text-[10px] font-mono text-muted-foreground">
                            #{conv.orderId}
                          </span>
                        )}
                      </div>

                      <p
                        className={`text-xs mt-1 truncate ${
                          conv.unreadCount > 0
                            ? 'font-bold text-foreground'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {lastMsg?.sender === 'merchant' && 'You: '}
                        {lastMsg?.text}
                      </p>
                    </div>

                    {/* Unread Pill */}
                    {conv.unreadCount > 0 && (
                      <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* ── RIGHT PANE: Active Conversation Thread ────────────────── */}
        <div
          className={`flex flex-col md:col-span-7 lg:col-span-8 h-full bg-card ${
            isMobileThreadOpen ? 'flex' : 'hidden md:flex'
          }`}
        >
          {activeConversation ? (
            <>
              {/* Thread Header */}
              <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-muted/20">
                <div className="flex items-center gap-3">
                  {/* Mobile Back Button */}
                  <button
                    type="button"
                    onClick={() => setIsMobileThreadOpen(false)}
                    className="md:hidden flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground"
                  >
                    <ArrowLeft size={16} />
                  </button>

                  <img
                    src={activeConversation.customer.avatar}
                    alt={activeConversation.customer.name}
                    className="h-9 w-9 rounded-full border border-border object-cover"
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs sm:text-sm font-bold text-foreground font-heading">
                        {activeConversation.customer.name}
                      </h3>
                      {channelBadge(activeConversation.customer.channel)}
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {activeConversation.customer.phone} • {activeConversation.customer.handle}
                    </p>
                  </div>
                </div>

                {/* Linked Order Badge */}
                {activeConversation.orderId && (
                  <div className="hidden sm:flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-xs text-foreground">
                    <ShoppingBag size={13} className="text-primary" />
                    <span>Order: <strong>#{activeConversation.orderId}</strong></span>
                  </div>
                )}
              </div>

              {/* Message History Stream */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-muted/5">
                {activeConversation.messages.map((msg) => {
                  const isMerchant = msg.sender === 'merchant'

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        isMerchant ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm shadow-xs ${
                          isMerchant
                            ? 'bg-primary text-primary-foreground rounded-br-xs'
                            : 'bg-card text-foreground border border-border rounded-bl-xs'
                        }`}
                      >
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      </div>

                      <div className="flex items-center gap-1 mt-1 px-1 text-[10px] text-muted-foreground">
                        <span>{msg.timestamp}</span>
                        {isMerchant && (
                          <CheckCheck size={13} className="text-primary" />
                        )}
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* ── 1-Tap Quick Replies Bar ─────────────────────────── */}
              <div className="border-t border-border bg-card p-2.5">
                <div className="flex items-center justify-between mb-1.5 px-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <Sparkles size={11} className="text-primary" />
                    <span>1-Tap Quick Replies</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => setIsAddingReply(true)}
                    className="text-[11px] font-semibold text-primary hover:underline"
                  >
                    + Add Reply Template
                  </button>
                </div>

                {/* Quick Reply Pills Scroll */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {quickReplies.map((reply, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleQuickReplyClick(reply)}
                      className="rounded-xl border border-border bg-muted/40 hover:bg-primary/10 hover:border-primary/30 px-3 py-1 text-[11px] font-medium text-foreground transition-all shrink-0 select-none"
                    >
                      {reply}
                    </button>
                  ))}
                </div>

                {/* New Quick Reply Form */}
                {isAddingReply && (
                  <form
                    onSubmit={handleCreateNewQuickReply}
                    className="flex gap-2 pt-2"
                  >
                    <input
                      type="text"
                      required
                      value={newReplyText}
                      onChange={(e) => setNewReplyText(e.target.value)}
                      placeholder="Type a new canned response…"
                      className="flex-1 rounded-xl border border-border bg-card px-3 py-1.5 text-xs text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingReply(false)}
                      className="rounded-xl border border-border bg-muted px-2.5 py-1.5 text-xs text-muted-foreground"
                    >
                      Cancel
                    </button>
                  </form>
                )}
              </div>

              {/* Message Input Box */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex items-center gap-2 border-t border-border p-3 bg-card"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message to customer…"
                  className="flex-1 rounded-xl border border-border bg-muted/30 px-4 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/25 hover:shadow-md hover:shadow-primary/35 disabled:opacity-40 transition-all"
                  aria-label="Send message"
                >
                  <Send size={15} />
                </button>
              </form>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center p-6 text-muted-foreground">
              <MessageCircle size={36} className="text-muted-foreground/50 mb-2" />
              <p className="text-sm font-semibold">Select a conversation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages
