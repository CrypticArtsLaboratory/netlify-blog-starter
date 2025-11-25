import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();

  const isActive = (path) => {
    return router.pathname === path;
  };

  const linkClasses = (path) => {
    const baseClasses = "px-4 py-2 rounded-lg transition-colors duration-200 font-medium";
    const activeClasses = "bg-white/20 dark:bg-white/10 text-gray-900 dark:text-white";
    const inactiveClasses = "hover:bg-white/10 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300";

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <nav className="w-full max-w-2xl mx-auto px-4">
      <div className="flex items-center justify-center gap-2 py-4">
        <Link href="/" className={linkClasses('/')}>
          Home
        </Link>
        <Link href="/blog" className={linkClasses('/blog')}>
          Blog
        </Link>
      </div>
    </nav>
  );
}