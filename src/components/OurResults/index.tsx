import { ourResultsMock } from '../../mocks';
import { OurResultsIcon } from '../OurResultsIcon';
import { Typography } from '../Typography';
import * as S from './styles';

const OurResults = () => (
  <S.OurResultsContainer>
    <S.OurResultsContainerTitle
      data-aos="fade-up"
      data-aos-easing="ease-in"
      data-aos-offset="-300"
      data-aos-anchor-placement="top-center"
    >
      <Typography variant="h2">
        Nossos
        <S.OurResultsContainerTitleResults>
          Resultados
        </S.OurResultsContainerTitleResults>
      </Typography>
    </S.OurResultsContainerTitle>
    <S.OurResultsContainerContent>
      {ourResultsMock?.map(({ image, title, value }, index) => (
        <OurResultsIcon key={index} image={image} title={title} value={value} />
      ))}
    </S.OurResultsContainerContent>
  </S.OurResultsContainer>
);

export { OurResults };
