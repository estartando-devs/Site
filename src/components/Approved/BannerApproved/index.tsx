import * as S from './BannerApprovedStyled';

export const BannerApproved = () => (
  <S.BannerApprovedContainer>
    <S.BannerContent>
      <S.BannerTitle variant="h2">
        A lista de aprovados pro curso já está disponível!
      </S.BannerTitle>
      {/* <S.ContainerButton>
        <LinkWrapper color="white" href="#resultado" legacyBehavior>
          <S.BannerButton>Quero ver o resultado</S.BannerButton>
        </LinkWrapper>
      </S.ContainerButton> */}
    </S.BannerContent>
  </S.BannerApprovedContainer>
);
