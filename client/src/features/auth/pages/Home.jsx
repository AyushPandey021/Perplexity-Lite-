import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteChat,
  getChats,
  getMessages,
  sendChatMessage,
} from "../api/chat.api";
import { logout } from "../model/authSlice";

// ─── Icons ────────────────────────────────────────────────────────────────────

const Icon = ({ children, size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

const PlusIcon = ({ size }) => (
  <Icon size={size}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);
const SendIcon = () => (
  <Icon size={16}>
    <path d="M22 2 11 13" />
    <path d="m22 2-7 20-4-9-9-4 20-7z" />
  </Icon>
);
const MenuIcon = () => (
  <Icon>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </Icon>
);
const TrashIcon = () => (
  <Icon size={15}>
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M6 6l1 15h10l1-15" />
  </Icon>
);
const SearchIcon = ({ size = 15 }) => (
  <Icon size={size}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </Icon>
);
const LogOutIcon = () => (
  <Icon size={16}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="m16 17 5-5-5-5" />
    <path d="M21 12H9" />
  </Icon>
);
const HomeIcon = () => (
  <Icon size={17}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </Icon>
);
const DiscoverIcon = () => (
  <Icon size={17}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </Icon>
);
const LibraryIcon = () => (
  <Icon size={17}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </Icon>
);
const HistoryIcon = () => (
  <Icon size={17}>
    <polyline points="12 8 12 12 14 14" />
    <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
  </Icon>
);
const SettingsIcon = () => (
  <Icon size={17}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </Icon>
);
const HelpIcon = () => (
  <Icon size={17}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </Icon>
);
const BellIcon = () => (
  <Icon size={18}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </Icon>
);
const SunMoonIcon = () => (
  <Icon size={18}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </Icon>
);
const AttachIcon = () => (
  <Icon size={15}>
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </Icon>
);
const GlobeIcon = () => (
  <Icon size={15}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Icon>
);
const HeartIcon = () => (
  <Icon size={15}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </Icon>
);

// Category icons
const CodeIcon = () => (
  <Icon size={20}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </Icon>
);
const WriteIcon = () => (
  <Icon size={20}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </Icon>
);
const LearnIcon = () => (
  <Icon size={20}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </Icon>
);
const SummaryIcon = () => (
  <Icon size={20}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </Icon>
);
const WebIcon = () => (
  <Icon size={20}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Icon>
);
const ArrowRightIcon = () => (
  <Icon size={16}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </Icon>
);

// ─── Static data ──────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Home", icon: <HomeIcon /> },
  { label: "Discover", icon: <DiscoverIcon /> },
  { label: "Library", icon: <LibraryIcon /> },
  { label: "History", icon: <HistoryIcon /> },
];

const BOTTOM_NAV = [
  { label: "Settings", icon: <SettingsIcon /> },
  { label: "Help", icon: <HelpIcon /> },
];

const CATEGORIES = [
  { label: "Coding", icon: <CodeIcon /> },
  { label: "Writing", icon: <WriteIcon /> },
  { label: "Learning", icon: <LearnIcon /> },
  { label: "Summary", icon: <SummaryIcon /> },
  { label: "Web", icon: <WebIcon /> },
];

const SUGGESTIONS = [
  "Explain React server components simply",
  "Make a roadmap to learn backend development",
  "Summarize the benefits of MongoDB indexes",
  "Write a clean email for a project update",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatTime = (date) =>
  new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
    Math.round((new Date(date) - Date.now()) / 864e5),
    "day",
  );

const formatShort = (date) => {
  const d = new Date(date);
  const diffMs = Date.now() - d;
  const diffH = Math.floor(diffMs / 36e5);
  if (diffH < 24) return `${diffH}h ago`;
  if (diffH < 48) return "Yesterday";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(d);
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const TypingDots = () => (
  <div className="flex items-center gap-1 py-1 px-1">
    {[0, 1, 2].map((dot) => (
      <span
        key={dot}
        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
        style={{ animationDelay: `${dot * 130}ms` }}
      />
    ))}
  </div>
);

const Avatar = ({ name = "U" }) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="h-7 w-7 rounded-full bg-gray-800 flex items-center justify-center text-white text-[11px] font-semibold shrink-0">
      {initials}
    </div>
  );
};

// Conversation card for the "Recent conversations" section
const ConvCard = ({ title, snippet, time, sources, onClick }) => (
  <button
    onClick={onClick}
    className="group w-full rounded-xl border border-gray-200 bg-white p-4 text-left transition hover:border-gray-300 hover:shadow-sm"
  >
    <div className="flex items-start justify-between gap-2">
      <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-1">
        {title}
      </p>
      <span className="shrink-0 text-gray-300 group-hover:text-gray-400 transition mt-0.5">
        <HeartIcon />
      </span>
    </div>
    {snippet && (
      <p className="mt-1.5 text-xs text-gray-500 leading-relaxed line-clamp-2">
        {snippet}
      </p>
    )}
    <div className="mt-3 flex items-center gap-1.5 text-[11px] text-gray-400">
      <span>{time}</span>
      {sources && (
        <>
          <span>·</span>
          <span>{sources} Sources</span>
        </>
      )}
    </div>
  </button>
);

// ─── Main component ───────────────────────────────────────────────────────────

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Discover");
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);
  const optimisticIdRef = useRef(0);

  const filteredChats = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return chats;
    return chats.filter(
      (c) =>
        c.title?.toLowerCase().includes(term) ||
        c.lastMessage?.toLowerCase().includes(term),
    );
  }, [chats, search]);

  useEffect(() => {
    let mounted = true;
    getChats()
      .then((data) => {
        if (!mounted) return;
        setChats(data.chats || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => mounted && setLoadingChats(false));
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const openChat = async (chatId) => {
    setActiveChatId(chatId);
    setSidebarOpen(false);
    setLoadingMessages(true);
    setError("");
    try {
      const data = await getMessages(chatId);
      setMessages(data.messages || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMessages(false);
    }
  };

  const startNewChat = () => {
    setActiveChatId(null);
    setMessages([]);
    setQuery("");
    setError("");
    setSidebarOpen(false);
    setActiveNav("Home");
  };

  const handleSubmit = async (e, preset) => {
    e?.preventDefault();
    const text = (preset || query).trim();
    if (!text || sending) return;

    const optimisticUser = {
      id: `local-${(optimisticIdRef.current += 1)}`,
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, optimisticUser]);
    setQuery("");
    setSending(true);
    setError("");

    try {
      const data = await sendChatMessage({
        message: text,
        chatId: activeChatId,
      });
      const savedChat = data.chat;
      setActiveChatId(savedChat.id || savedChat._id);
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== optimisticUser.id),
        data.userMessage,
        data.aiMessage,
      ]);
      setChats((prev) => {
        const next = [
          savedChat,
          ...prev.filter(
            (c) => (c.id || c._id) !== (savedChat.id || savedChat._id),
          ),
        ];
        return next.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
        );
      });
    } catch (err) {
      setError(err.message);
      setMessages((prev) => prev.filter((m) => m.id !== optimisticUser.id));
      setQuery(text);
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (e, chatId) => {
    e.stopPropagation();
    await deleteChat(chatId);
    setChats((prev) => prev.filter((c) => (c.id || c._id) !== chatId));
    if (activeChatId === chatId) startNewChat();
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  // Auto-resize textarea
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    const ta = e.target;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 128)}px`;
  };

  const isHomePage = activeNav === "Home" && !activeChatId;
  const isChatOpen = !!activeChatId || messages.length > 0;

  // Shared top-nav tabs
  const TopTabs = () => (
    <div className="flex items-center gap-1">
      {["Discover", "Library"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
            activeTab === tab
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc] text-gray-950 font-sans">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-white border-r border-gray-100 transition-transform duration-200 lg:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gray-950 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                <circle cx="6" cy="6" r="5" />
              </svg>
            </div>
            <span className="text-sm font-bold tracking-tight text-gray-900">
              Perplexity Lite
            </span>
          </div>
        </div>

        {/* New Chat CTA */}
        <div className="px-3 pb-3">
          <button
            onClick={startNewChat}
            className="flex w-full items-center gap-2.5 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
          >
            <PlusIcon size={16} />
            New Chat
          </button>
        </div>

        {/* Nav items */}
        <nav className="px-3 flex-1">
          <div className="space-y-0.5">
            {NAV_ITEMS.map(({ label, icon }) => (
              <button
                key={label}
                onClick={() => {
                  setActiveNav(label);
                  if (label === "Home") startNewChat();
                  setSidebarOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  activeNav === label
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                <span
                  className={
                    activeNav === label ? "text-gray-900" : "text-gray-400"
                  }
                >
                  {icon}
                </span>
                {label}
              </button>
            ))}
          </div>

          {/* Recent chats if in chat mode */}
          {filteredChats.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center gap-2 px-3 mb-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Recent
                </span>
              </div>
              <label className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 px-2.5 py-1.5 text-gray-400 mb-2">
                <SearchIcon size={13} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search chats"
                  className="w-full bg-transparent text-xs text-gray-700 outline-none placeholder:text-gray-400"
                />
              </label>
              <div className="space-y-0.5 max-h-56 overflow-y-auto">
                {loadingChats ? (
                  <p className="px-3 py-2 text-xs text-gray-400">Loading…</p>
                ) : filteredChats.length === 0 ? (
                  <p className="px-3 py-2 text-xs text-gray-400">
                    No chats found.
                  </p>
                ) : (
                  filteredChats.map((chat) => {
                    const id = chat.id || chat._id;
                    const active = id === activeChatId;
                    return (
                      <button
                        key={id}
                        onClick={() => openChat(id)}
                        className={`group flex w-full items-start justify-between gap-1 rounded-lg px-3 py-2 text-left transition ${
                          active ? "bg-gray-100" : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-gray-800">
                            {chat.title || "New Conversation"}
                          </p>
                          <p className="truncate text-[11px] text-gray-400">
                            {chat.lastMessage || "Empty chat"}
                          </p>
                        </div>
                        <span
                          onClick={(e) => handleDelete(e, id)}
                          className="mt-0.5 rounded p-0.5 text-gray-300 opacity-0 hover:text-red-400 group-hover:opacity-100 transition"
                        >
                          <TrashIcon />
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </nav>

        {/* Bottom nav */}
        <div className="border-t border-gray-100 px-3 py-3 space-y-0.5">
          {BOTTOM_NAV.map(({ label, icon }) => (
            <button
              key={label}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition"
            >
              <span className="text-gray-400">{icon}</span>
              {label}
            </button>
          ))}
          {/* User row */}
          <div className="flex items-center justify-between px-3 py-2 mt-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar name={user?.username || "User"} />
              <span className="truncate text-xs font-medium text-gray-700">
                {user?.username || "Your workspace"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="shrink-0 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
              title="Logout"
            >
              <LogOutIcon />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header
          className="flex h-13 items-center justify-between border-b border-gray-100 bg-white px-4 shrink-0"
          style={{ height: 52 }}
        >
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon />
            </button>
            {/* Tab nav — only on home landing */}
            {isHomePage && (
              <div className="flex items-center gap-0.5">
                {["Discover", "Library"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 text-sm font-semibold border-b-2 transition ${
                      activeTab === tab
                        ? "border-gray-900 text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}
            {/* Chat title */}
            {!isHomePage && activeChatId && (
              <h1 className="text-sm font-semibold text-gray-800 truncate max-w-xs">
                {chats.find((c) => (c.id || c._id) === activeChatId)?.title ||
                  "Chat"}
              </h1>
            )}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1">
            <button className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 transition">
              <SunMoonIcon />
            </button>
            <button className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 transition">
              <BellIcon />
            </button>
            <Avatar name={user?.username || "U"} />
          </div>
        </header>

        {/* ── Content area ────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto">
          {/* HOME LANDING */}
          {isHomePage && (
            <div className="mx-auto w-full max-w-3xl px-4 py-10">
              {/* Hero */}
              <div className="mb-8 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-950 leading-tight">
                  Ask anything.{" "}
                  <span className="text-orange-500">Get trusted answers.</span>
                </h1>
                <p className="mt-3 text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                  Precision-engineered AI search for the informed companion.
                  Fast, accurate, and sourced from the live web.
                </p>
              </div>

              {/* Search box */}
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden mb-6">
                <div className="flex items-start gap-2 px-4 pt-4 pb-2">
                  <span className="mt-2.5 text-gray-400 shrink-0">
                    <SearchIcon size={17} />
                  </span>
                  <textarea
                    ref={textareaRef}
                    value={query}
                    onChange={handleQueryChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                    rows={1}
                    placeholder="Ask anything..."
                    className="flex-1 resize-none bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 py-2 min-h-[36px] max-h-32"
                    style={{ lineHeight: 1.6 }}
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={!query.trim() || sending}
                    className="mt-1.5 flex items-center gap-1.5 rounded-xl bg-gray-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300 shrink-0"
                  >
                    Search
                    <ArrowRightIcon />
                  </button>
                </div>

                {/* Toolbar row */}
                <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition">
                      <GlobeIcon /> Pro
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition">
                      <AttachIcon /> Attach
                    </button>
                  </div>
                  <span className="text-[11px] font-medium text-gray-300 hidden sm:block">
                    CTRL + ENTER
                  </span>
                </div>
              </div>

              {/* Category pills */}
              <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-1 scrollbar-none">
                {CATEGORIES.map(({ label, icon }) => (
                  <button
                    key={label}
                    onClick={(e) =>
                      handleSubmit(e, `Help me with ${label.toLowerCase()}`)
                    }
                    className="flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-4 text-xs font-medium text-gray-600 transition hover:border-orange-200 hover:text-orange-600 shrink-0 shadow-sm hover:shadow"
                    style={{ minWidth: 90 }}
                  >
                    <span className="text-orange-500">{icon}</span>
                    {label}
                  </button>
                ))}
              </div>

              {/* Recent conversations */}
              {chats.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-bold text-gray-800">
                      Recent conversations
                    </h2>
                    <button className="text-xs font-semibold text-orange-500 hover:text-orange-600 transition">
                      View all
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {chats.slice(0, 4).map((chat) => {
                      const id = chat.id || chat._id;
                      return (
                        <ConvCard
                          key={id}
                          title={chat.title || "Untitled"}
                          snippet={chat.lastMessage}
                          time={
                            chat.updatedAt ? formatShort(chat.updatedAt) : ""
                          }
                          sources={chat.sourceCount}
                          onClick={() => openChat(id)}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Empty state suggestions */}
              {chats.length === 0 && !loadingChats && (
                <div>
                  <h2 className="text-sm font-bold text-gray-700 mb-3">
                    Try asking…
                  </h2>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={(e) => handleSubmit(e, s)}
                        className="rounded-xl border border-gray-200 bg-white p-4 text-left text-sm font-medium text-gray-700 shadow-sm hover:border-orange-200 hover:text-orange-700 transition"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CHAT VIEW */}
          {!isHomePage && (
            <div className="px-4 py-6">
              <div className="mx-auto flex max-w-3xl flex-col gap-5">
                {loadingMessages ? (
                  <p className="text-sm text-gray-400">Opening chat…</p>
                ) : null}

                {messages.map((msg) => (
                  <div
                    key={msg.id || msg._id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role !== "user" && (
                      <div className="mr-2 mt-1 shrink-0">
                        <div className="h-6 w-6 rounded-full bg-gray-950 flex items-center justify-center">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 12 12"
                            fill="white"
                          >
                            <circle cx="6" cy="6" r="5" />
                          </svg>
                        </div>
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-gray-950 text-white shadow-sm"
                          : "border border-gray-200 bg-white text-gray-800 shadow-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {sending && (
                  <div className="flex justify-start">
                    <div className="mr-2 mt-1 shrink-0">
                      <div className="h-6 w-6 rounded-full bg-gray-950 flex items-center justify-center">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 12 12"
                          fill="white"
                        >
                          <circle cx="6" cy="6" r="5" />
                        </svg>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                      <TypingDots />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </div>
          )}
        </div>

        {/* ── Footer input (only during active chat) ──────────────────────── */}
        {isChatOpen && (
          <footer className="border-t border-gray-100 bg-white px-4 py-3 shrink-0">
            <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
              {error && (
                <p className="mb-2 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-100">
                  {error}
                </p>
              )}
              <div className="flex items-end gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm focus-within:border-gray-400 transition">
                <textarea
                  value={query}
                  onChange={handleQueryChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  rows={1}
                  placeholder="Ask a follow-up…"
                  className="max-h-32 min-h-[36px] flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-gray-400"
                />
                <button
                  disabled={!query.trim() || sending}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                  title="Send"
                >
                  <SendIcon />
                </button>
              </div>
            </form>
          </footer>
        )}
      </main>
    </div>
  );
}
