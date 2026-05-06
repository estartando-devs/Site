import {
  ApprovedSection,
  Courses,
  Footer,
  Header,
  HowWeDo,
  Layout,
  OurResults,
  SelectiveProcess,
  StudentProfile,
  WhatWeTeach,
} from '../components';
import { BannerApproved } from '../components/Approved';
import { Modalities } from '../components/Modalities';
import {
  cousesMock,
  howWeDoMock,
  scheduleMock,
  studentProfileSection,
  whatWeTeachMock,
} from '../mocks';

const Home = () => {
  return (
    <Layout>
      <BannerApproved />
      <Header />
      <ApprovedSection />
      <WhatWeTeach {...whatWeTeachMock} />
      <Courses {...cousesMock} />
      <Modalities />
      <HowWeDo {...howWeDoMock} />
      <StudentProfile {...studentProfileSection} />
      <SelectiveProcess {...scheduleMock} />
      <OurResults />
      <Footer />
    </Layout>
  );
};

export default Home;
