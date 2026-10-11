import { Link } from 'react-router-dom';
import { useSEO } from '@/lib/useSEO';
import { products } from '@/data/catalog';
import { AppIcon } from '@/components/kit/AppIcon';
import { Arrow } from '@/components/kit/Icons';

const NotFound = () => {
  useSEO({
    title: 'Page not found | PG App Studios',
    description: 'This page does not exist. Browse our apps or read the blog instead.',
    noindex: true,
  });
  return (
    <section className="relative overflow-hidden pb-24 pt-40 sm:pt-48">
      <div className="container text-center">
        <p className="font-serif text-[clamp(6rem,20vw,14rem)] italic leading-none text-gradient">404</p>
        <h1 className="mt-4 text-display-sm font-semibold">This page wandered off.</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-fg-2">It may have moved, or the link was mistyped. One of these might be what you were after.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">
            Back home <Arrow size={16} />
          </Link>
          <Link to="/our-apps" className="btn-ghost">
            Browse apps
          </Link>
          <Link to="/blog" className="btn-ghost">
            Read the blog
          </Link>
        </div>
        <div className="mx-auto mt-14 flex max-w-xl flex-wrap justify-center gap-2">
          {products.slice(0, 12).map((a) => (
            <Link key={a.slug} to={`/apps/${a.slug}`} className="transition-transform hover:-translate-y-1">
              <AppIcon app={a} size={44} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NotFound;
