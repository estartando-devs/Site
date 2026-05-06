import Link from 'next/link';
import { useSocialButtons } from '../../../hooks/useSocialButtons';

export const SocialShareButtons = () => {
  const { socialLinks } = useSocialButtons();

  return (
    <div className="flex gap-4 items-center justify-center">
      {socialLinks.map(({ title, href, iconProps, icon: Icon }) => (
        <Link key={title} href={href} target="_blank" rel="noreferrer noopener">
          <div
            title={title}
            className="p-2 flex items-center justify-center rounded-lg bg-surface-variant/20 shadow-lg border border-white/5 hover:bg-surface-variant/40 transition-all"
          >
            <Icon {...iconProps} />
          </div>
        </Link>
      ))}
    </div>
  );
};
