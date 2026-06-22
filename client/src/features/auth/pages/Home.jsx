import { useState } from "react";

const HomeIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const DiscoverIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const LibraryIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const HistoryIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 .49-4.95" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const HelpIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const BellIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const AttachIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

const HeartIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CodeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#f97316"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const WritingIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#f97316"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="17" y1="10" x2="3" y2="10" />
    <line x1="21" y1="6" x2="3" y2="6" />
    <line x1="21" y1="14" x2="3" y2="14" />
    <line x1="17" y1="18" x2="3" y2="18" />
    <polyline points="21 10 17 6 21 6" />
  </svg>
);

const LearningIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#f97316"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const SummaryIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#f97316"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const WebIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#f97316"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9ca3af"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const recentConversations = [
  {
    id: 1,
    title: "Impact of Generative AI on Design Systems",
    preview: "Exploring the role of modularity and scaling in 2024...",
    time: "2 hours ago",
    sources: 8,
    hasIcon: false,
  },
  {
    id: 2,
    title: "Quantum Computing Hardware Limitations",
    preview: "Current challenges in error correction and decoherence...",
    time: "5 hours ago",
    sources: 14,
    hasIcon: true,
  },
  {
    id: 3,
    title: "CSS v4 Roadmap Highlights",
    preview: "Exploring the Oxide engine and zero-config setup...",
    time: "Yesterday",
    sources: 4,
    hasIcon: false,
  },
  {
    id: 4,
    title: "Sustainable Architecture Trends",
    preview: "Biophilic design and carbon-negative materials in urban se...",
    time: "Yesterday",
    sources: 21,
    hasIcon: true,
  },
];

const categories = [
  { label: "Coding", icon: <CodeIcon /> },
  { label: "Writing", icon: <WritingIcon /> },
  { label: "Learning", icon: <LearningIcon /> },
  { label: "Summary", icon: <SummaryIcon /> },
  { label: "Web", icon: <WebIcon /> },
];

const navItems = [
  { label: "Home", icon: <HomeIcon />, active: true },
  { label: "Discover", icon: <DiscoverIcon /> },
  { label: "Library", icon: <LibraryIcon /> },
  { label: "History", icon: <HistoryIcon /> },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeNav, setActiveNav] = useState("Home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white font-sans overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static z-30 h-full w-56 bg-white border-r border-gray-100
          flex flex-col justify-between py-4 px-3 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Top section */}
        <div className="flex flex-col gap-1">
          {/* Logo */}
          <div className="px-2 mb-4 pt-1">
            <span className="text-[15px] font-semibold text-gray-900 tracking-tight">
              Perplexity Lite
            </span>
          </div>

          {/* New Chat button */}
          <button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-4 py-2.5 rounded-xl mb-3 transition-colors">
            <PlusIcon />
            New Chat
          </button>

          {/* Nav items */}
          <nav className="flex flex-col gap-0.5">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setActiveNav(item.label);
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left w-full
                  ${
                    activeNav === item.label
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom nav */}
        <div className="flex flex-col gap-0.5">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors text-left w-full">
            <SettingsIcon />
            Settings
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors text-left w-full">
            <HelpIcon />
            Help
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white shrink-0">
          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 mr-2"
            onClick={() => setSidebarOpen(true)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Nav tabs */}
          <div className="flex items-center gap-0">
            <button className="text-sm font-semibold text-gray-900 px-3 py-1.5 border-b-2 border-gray-900 mr-1">
              Discover
            </button>
            <button className="text-sm font-medium text-gray-400 hover:text-gray-600 px-3 py-1.5 border-b-2 border-transparent transition-colors">
              Library
            </button>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-3">
            <button className="text-gray-500 hover:text-gray-800 transition-colors hidden sm:block">
              <MoonIcon />
            </button>
            <button className="text-gray-500 hover:text-gray-800 transition-colors hidden sm:block">
              <BellIcon />
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center text-white text-xs font-bold">
              PL
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
            {/* Hero headline */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
                Ask anything.{" "}
                <span className="text-orange-500">Get trusted answers.</span>
              </h1>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                Precision-engineered AI search for the informed companion. Fast,
                accurate, and sourced from the live web.
              </p>
            </div>

            {/* Search box */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm mb-7 overflow-hidden">
              <div className="flex items-center px-4 py-3.5 gap-3">
                <span className="text-gray-400 shrink-0">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none"
                  onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                />
                <button className="bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shrink-0">
                  Search
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
              <div className="border-t border-gray-100 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors font-medium">
                    <GlobeIcon />
                    Pro
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors font-medium">
                    <AttachIcon />
                    Attach
                  </button>
                </div>
                <span className="text-xs text-gray-300 font-mono hidden sm:block">
                  CTRL + ENTER
                </span>
              </div>
            </div>

            {/* Category pills */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  className="flex flex-col items-center gap-2.5 bg-white border border-gray-200 rounded-xl py-4 px-3 hover:border-orange-300 hover:bg-orange-50/40 transition-all group"
                >
                  <span className="group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </span>
                  <span className="text-xs text-gray-600 font-medium">
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Recent conversations */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-800">
                Recent Conversations
              </h2>
              <button className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors">
                View all
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recentConversations.map((conv) => (
                <button
                  key={conv.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-gray-300 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-start gap-3">
                    {conv.hasIcon && (
                      <div className="shrink-0 mt-0.5">
                        <ClockIcon />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-1">
                          {conv.title}
                        </p>
                        <button
                          className="text-gray-300 hover:text-red-400 transition-colors shrink-0 mt-0.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <HeartIcon />
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                        {conv.preview}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        <span>{conv.time}</span>
                        <span className="mx-1.5">·</span>
                        <span>{conv.sources} Sources</span>
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
