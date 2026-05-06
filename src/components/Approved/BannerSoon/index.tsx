import Link from 'next/link';
import { useSocialButtons } from '../../../hooks/useSocialButtons';
import { Typography } from '../../Typography';

export const BannerSoon = () => {
  const { socialLinks } = useSocialButtons();

  const socialLinksWithInstagram = socialLinks.filter((link) =>
    link.href.includes('estartando'),
  );

  return (
    <div className="w-full bg-brand-purple py-[70px] px-2.5 md:px-[100px] flex flex-col justify-center items-center">
      <div className="w-full max-w-[1028px] flex flex-col items-center gap-4">
        <Typography variant="h2" weight="bold" className="text-center">
          Teremos mais informações em breve! Fique ligado nas nossas redes
          sociais!
        </Typography>

        <div className="flex flex-row items-center gap-2.5">
          {socialLinksWithInstagram.map(
            ({ title, href, iconProps, icon: Icon }) => (
              <Link
                key={title}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon {...iconProps} />
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerSoon;
