import { useEffect, useState } from 'react';
import { Github, Star, GitFork, Book, Users, Code, Layout } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';

export default function GithubWidget({ username }) {
  const [stats, setStats] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;
    async function fetchGithubData() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
        ]);
        const userData = await userRes.json();
        const reposData = await reposRes.json();
        setStats(userData);
        setRepos(Array.isArray(reposData) ? reposData : []);
      } catch (error) { console.error('Error fetching Github data:', error); }
      finally { setLoading(false); }
    }
    fetchGithubData();
  }, [username]);

  if (loading) return <div className="glass-card p-6 h-[600px] animate-pulse bg-white/5" />;

  return (
    <div className="space-y-8">
      <div className="glass-card p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4"><div className="p-3 bg-white/5 rounded-xl border border-white/10"><Github className="w-6 h-6 text-white" /></div><div><h3 className="text-xl font-bold">Github Activity</h3><p className="text-sm text-white/40">@{username}</p></div></div>
          <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors border border-white/10">View Profile</a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[{ label: 'Repos', value: stats?.public_repos, icon: Book, color: 'text-blue-400' }, { label: 'Followers', value: stats?.followers, icon: Users, color: 'text-purple-400' }, { label: 'Following', value: stats?.following, icon: Star, color: 'text-yellow-400' }, { label: 'Gists', value: stats?.public_gists, icon: GitFork, color: 'text-pink-400' }].map((stat, i) => (
            <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all"><div className="flex items-center justify-between mb-2"><stat.icon className={`w-4 h-4 ${stat.color}`} /></div><p className="text-2xl font-bold">{stat.value}</p><p className="text-xs text-white/40">{stat.label}</p></div>
          ))}
        </div>

        <div className="bg-white/5 p-4 rounded-xl border border-white/5 overflow-hidden flex justify-center custom-scrollbar">
          <GitHubCalendar username={username} theme={{ light: ['#13131f', '#8b5cf6'], dark: ['#13131f', '#8b5cf6'] }} fontSize={12} blockSize={12} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="glass-card p-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2"><Code size={16} className="text-primary" /> Most Used Languages</h4>
            <div className="space-y-4">
               {['JavaScript', 'TypeScript', 'PHP', 'HTML/CSS'].map((lang, i) => (
                 <div key={lang} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono"><span className="text-white/60">{lang}</span><span className="text-primary">{[45, 30, 15, 10][i]}%</span></div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-primary" style={{ width: `${[45, 30, 15, 10][i]}%` }} /></div>
                 </div>
               ))}
            </div>
         </div>
         <div className="glass-card p-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2"><Layout size={16} className="text-secondary" /> Featured Repositories</h4>
            <div className="grid grid-cols-1 gap-3">
               {repos.slice(0, 3).map(repo => (
                 <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all block">
                    <p className="text-sm font-bold text-white/80">{repo.name}</p>
                    <p className="text-[10px] text-white/40 line-clamp-1">{repo.description || 'No description provided.'}</p>
                 </a>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
