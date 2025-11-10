import Image from 'next/legacy/image';
import { PropsWithChildren } from 'react';
import { Typography } from '../Typography';
import * as S from './styles';

type OurResultsIconProp = {
  image: string;
  title: string;
  value: string;
};

const OurResultsIcon = ({
  image,
  title,
  value,
}: PropsWithChildren<OurResultsIconProp>) => (
  <S.OurResultsIconContainer
    data-aos="zoom-in"
    data-aos-easing="ease-in-out"
    data-aos-anchor-placement="center-bottom"
  >
    <Image
      src={`icons/${image}`}
      width={60}
      height={60}
      alt={`Icone ${title}`}
      title={`Icone ${title}`}
    />
    <h3>
      <S.OurResultsIconContainerValue>{`${value} `}</S.OurResultsIconContainerValue>
      <Typography weight="700" variant="body1">{`${title}`}</Typography>
    </h3>
  </S.OurResultsIconContainer>
);

export { OurResultsIcon };
