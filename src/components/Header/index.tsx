import Image from 'next/legacy/image';
// import { BannerApproved } from '../Approved';
import { Logo } from '../Logo';
import { Typography } from '../Typography';
import * as S from './styles';

export const Header = () => (
  <>
    {/* <BannerApproved /> */}
    <S.ContainerHeader>
      <S.BackgroundHeader>
        <Image
          priority
          alt="Banner mãos estartando devs"
          title="Banner mãos estartando devs."
          layout="fill"
          objectFit="cover"
          src="/images/header-bg.webp"
        />
      </S.BackgroundHeader>

      <S.SectionHeader>
        <S.ContainerImage>
          <Logo width={91} height={132} priority />
        </S.ContainerImage>
        <S.ContainerHeading>
          <Typography variant="h1">Estartando Devs</Typography>
          <Typography weight="400">
            Transformando o mundo através da tecnologia
          </Typography>
          <S.ContainerButton>
            <a
              href={process.env.NEXT_PUBLIC_INSCRICOES_URL || ''}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                width: '100%',
                marginTop: 'auto',
              }}
            >
              <S.CardButton>
                <S.CardButtonText>Inscreva-se!</S.CardButtonText>
              </S.CardButton>
            </a>
            {/* <LinkWrapper
              href={process.env.NEXT_PUBLIC_INSCRICOES_URL || ''}
              legacyBehavior
            >
              <S.BannerButton>Inscreva-se!</S.BannerButton>
            </LinkWrapper> */}
          </S.ContainerButton>
        </S.ContainerHeading>
      </S.SectionHeader>
    </S.ContainerHeader>
  </>
);
