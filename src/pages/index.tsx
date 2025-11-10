import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import {
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
import { Modalities } from '../components/Modalities';
import {
  cousesMock,
  howWeDoMock,
  scheduleMock,
  studentProfileSection,
  whatWeTeachMock,
} from '../mocks';

const Home = () => {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.navigator.userAgent !== 'googlebot'
    ) {
      Aos.init({
        delay: 50,
        offset: 200,
        once: false,
        mirror: true,
        duration: 1000,
      });
    }
  }, []);

  return (
    <Layout>
      <Header />
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
