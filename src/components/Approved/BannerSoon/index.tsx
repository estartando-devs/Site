import Link from 'next/link';
import { useSocialButtons } from '../../../hooks/useSocialButtons';

import { Typography } from '../../Typography';
import * as S from './BannerSoonStyled';

export const BannerSoon = () => {
  const { socialLinks } = useSocialButtons();

  const socialLinksWithInstagram = socialLinks.filter((link) =>
    link.href.includes('estartando'),
  );

  return (
    <S.BannerSoonContainer>
      <S.BannerContent>
        <Typography variant="h2" weight="bold">
          Teremos mais informações em breve! Fique ligado nas nossas redes
          sociais!
        </Typography>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
          }}
        >
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
      </S.BannerContent>
    </S.BannerSoonContainer>
  );
};

export default BannerSoon;
