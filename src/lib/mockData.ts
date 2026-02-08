export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  source?: string;
  link?: string;
}

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "The Future of Generative AI in 2026",
    summary: "As we move further into the decade, generative AI continues to evolve at a breakneck pace. Here's what to expect.",
    content: "Generative AI has transformed from a novelty to a core business tool. In 2026, we are seeing...",
    author: "Alex Rivera",
    date: "2026-02-08",
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "2",
    title: "AI in Healthcare: A New Era of Diagnosis",
    summary: "How AI algorithms are helping doctors diagnose diseases earlier and more accurately than ever before.",
    content: "The integration of AI in diagnostic imaging has raised survival rates for...",
    author: "Dr. Sarah Chen",
    date: "2026-02-07",
    category: "Healthcare",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "3",
    title: "Ethics in AI: The Ongoing Debate",
    summary: "With great power comes great responsibility. The debate around AI ethics heats up as capabilities grow.",
    content: " policymakers and tech leaders are gathering in Geneva to discuss the new AI safety protocols...",
    author: "James Peterson",
    date: "2026-02-06",
    category: "Ethics",
    imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "4",
    title: "DeepMind's Latest Breakthrough in Robotics",
    summary: "Google DeepMind reveals a new robotic model capable of complex reasoning and physical tasks.",
    content: "The new model, dubbed 'Gemini-Robo', integrates multimodal understanding to...",
    author: "Tech Desk",
    date: "2026-02-05",
    category: "Robotics",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "5",
    title: "AI for Climate Change: Optimizing Energy Grids",
    summary: "Smart grids powered by AI are reducing waste and improving efficiency in renewable energy distribution.",
    content: "By predicting energy demand with high precision, AI agents are managing grid loads...",
    author: "Linda Green",
    date: "2026-02-04",
    category: "Environment",
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1000",
  },
];
