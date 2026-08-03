import { useMemo, useState } from 'react';

import confetti from 'canvas-confetti';
import {
  AlertTriangle,
  Briefcase,
  CheckCircle2,
  Compass,
  Globe,
  GraduationCap,
  Instagram,
  MapPin,
  MessageCircle,
  User,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { toast } from 'sonner';

import { createSubscription } from '@/services/createSubscriptions';
import { notifyDiscord } from '@/services/notifyDiscord';
import { resolveUtm } from '@/utils/resolveUtm';
import { ConfirmationModal } from './ConfirmationModal';
import { ErrorModal } from './ErrorModal';

import { AddressForm } from './components/AddressForm';
import { ConfirmationStep } from './components/ConfirmationStep';
import { CourseRequirementsModal } from './components/CourseRequirementsModal';
import { CourseSelector } from './components/CourseSelector';
import { ExperienceForm } from './components/ExperienceForm';
import { PersonalDataForm } from './components/PersonalDataForm';
import { ReasonForm } from './components/ReasonForm';
import { RequirementsModal } from './components/RequirementsModal';
import { Stepper } from './components/Stepper';
import { TrackSelector } from './components/TrackSelector';
import { addressSchema } from './schemas/addressSchema';
import { experienceSchema } from './schemas/experienceSchema';
import { personalDataSchema } from './schemas/personalDataSchema';
import { reasonSchema } from './schemas/reasonSchema';
import { useAddressStore } from './store/addressStore';
import { useExperienceStore } from './store/experienceStore';
import { usePersonalDataStore } from './store/personalDataStore';
import { useReasonStore } from './store/reasonStore';
import { useSourceStore } from './store/sourceStore';

const COURSE_TO_API: Record<string, 'web' | 'backend' | 'uiux'> = {
  'Desenvolvimento Web': 'web',
  'Desenvolvimento Backend': 'backend',
  'Design UI/UX': 'uiux',
};

const year = new Date().getFullYear();
const IS_REGISTRATION_CLOSED = true;

const steps = [
  <Compass key="trilha" />, // 0
  <GraduationCap key="curso" />, // 1
  <User key="dados" />, // 2
  <MapPin key="endereco" />, // 3
  <Briefcase key="experiencia" />, // 4
  <MessageCircle key="motivo" />, // 5
  <CheckCircle2 key="confirmacao" />, // 6
];

const courses = [
  { label: 'Desenvolvimento Web', value: 'Desenvolvimento Web' },
  { label: 'Desenvolvimento Backend', value: 'Desenvolvimento Backend' },
  { label: 'Design UI/UX', value: 'Design UI/UX' },
];

const tracks = [
  {
    label: 'Estartando',
    value: 'estartando',
    description: 'Para quem está começando do zero na tecnologia.',
    icon: Compass,
  },
  {
    label: 'Impulso',
    value: 'impulso',
    description: 'Para quem já tem base e quer acelerar a carreira.',
    icon: Compass,
  },
];

export const Subscriber = () => {
  const [step, setStep] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [availability, setAvailability] = useState<boolean | null>(null);
  const [enquadramentoRendaPrioritaria, setEnquadramentoRendaPrioritaria] =
    useState<boolean | null>(null);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showRequirementsModal, setShowRequirementsModal] = useState(false);
  const [showCourseRequirementsModal, setShowCourseRequirementsModal] =
    useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorTitle, setErrorTitle] = useState('');

  const addressData = useAddressStore();
  const personalData = usePersonalDataStore();
  const experienceData = useExperienceStore();
  const reasonData = useReasonStore();
  const sourceData = useSourceStore();
  const search = globalThis.window?.location.search ?? '';
  const referrer = globalThis.document?.referrer ?? '';
  const { utmSource, utmMedium } = resolveUtm(search, referrer);

  const isStepValid = useMemo(
    () => [
      !!selectedTrack,
      !!selectedCourse,
      personalDataSchema.safeParse({
        name: personalData.name,
        email: personalData.email,
        birth: personalData.birth,
        phone: personalData.phone,
      }).success,
      addressSchema.safeParse({
        cep: addressData.cep,
        address: addressData.address,
        district: addressData.district,
        city: addressData.city,
      }).success,
      experienceSchema.safeParse({ experience: experienceData.experience })
        .success,
      reasonSchema.safeParse({ reason: reasonData.reason }).success,
      availability === true &&
        acceptedPolicy &&
        !!sourceData.knownFrom &&
        enquadramentoRendaPrioritaria !== null,
    ],
    [
      selectedTrack,
      selectedCourse,
      personalData,
      addressData,
      experienceData,
      reasonData,
      sourceData.knownFrom,
      availability,
      acceptedPolicy,
      enquadramentoRendaPrioritaria,
    ],
  );

  const errorMap: { [key: string]: { title: string; message: string } } = {
    'inscrições ainda não estão abertas': {
      title: 'Inscrições em Breve',
      message:
        'As inscrições ainda não começaram. Fique de olho nas nossas redes para não perder a abertura!',
    },
    'inscrições foram encerradas': {
      title: 'Inscrições Encerradas',
      message:
        'O período de inscrições já foi encerrado. Agradecemos muito seu interesse!',
    },
    'já realizou sua inscrição': {
      title: 'E-mail Já Cadastrado',
      message:
        'Você já se inscreveu para este curso! Se precisar atualizar algum dado, fale com nosso suporte no discord.',
    },
    'Preencha todos os campos obrigatórios': {
      title: 'Campos Obrigatórios',
      message:
        'Por favor, preencha todos os campos obrigatórios antes de finalizar.',
    },
  };

  const handleTrackSelection = (track: string | null) => {
    setSelectedTrack(track);
    if (track) setShowRequirementsModal(true);
  };

  const handleCourseSelection = (course: string | null) => {
    setSelectedCourse(course);
    if (course) setShowCourseRequirementsModal(true);
  };

  async function handleSubmit() {
    if (step !== 6) return;

    setLoading(true);
    try {
      if (
        !selectedTrack ||
        !selectedCourse ||
        availability !== true ||
        !acceptedPolicy ||
        enquadramentoRendaPrioritaria === null
      ) {
        toast.error('Preencha todos os campos obrigatórios.');
        setLoading(false);
        return;
      }
      const apiCourse = COURSE_TO_API[selectedCourse];
      if (!apiCourse) {
        throw new Error('Curso inválido. Tente selecionar o curso novamente.');
      }
      if (!sourceData.knownFrom) {
        throw new Error('Selecione como conheceu a Estartando Devs.');
      }

      const payload = {
        cidade: addressData.city,
        celular: personalData.phone,
        email: personalData.email,
        curso: apiCourse,
        trilha: selectedTrack as 'estartando' | 'impulso',
        endereco: addressData.address,
        nomeCompleto: personalData.name,
        cep: addressData.cep,
        bairro: addressData.district,
        dataNascimento: personalData.birth,
        experiencia: experienceData.experience,
        motivacao: reasonData.reason,
        comoConheceu: sourceData.knownFrom,
        disponibilidade: availability,
        enquadramentoRendaPrioritaria,
        utmSource,
        utmMedium,
        politicasAceitas: {
          aceito: acceptedPolicy,
          aceitoEm: new Date().toISOString(),
        },
      };
      await createSubscription(payload);
      setShowConfirmation(true);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });

      await notifyDiscord({
        city: addressData.city,
        course: selectedCourse,
        fullName: personalData.name,
        neighborhood: addressData.district,
      });
    } catch (err) {
      let title = 'Ops! Algo não saiu como esperado 😥';
      let msg =
        'Houve um erro ao enviar sua inscrição. Por favor, tente novamente.';
      if (err instanceof Error && err.message) {
        // Busca por uma chave do mapeamento que esteja contida na mensagem de erro
        const found = Object.keys(errorMap).find((key) =>
          err.message.includes(key),
        );
        if (found) {
          title = errorMap[found].title;
          msg = errorMap[found].message;
        } else {
          // Se vier uma mensagem do backend mais amigável, exibe ela
          msg = err.message;
        }
      }
      setErrorTitle(title);
      setErrorMessage(msg);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  }

  if (IS_REGISTRATION_CLOSED) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full text-center space-y-10"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="w-24 h-24 rounded-3xl bg-brand-purple/10 flex items-center justify-center text-brand-purple border border-brand-purple/20 shadow-[0_0_50px_rgba(108,99,255,0.15)] relative">
              <div className="absolute inset-0 blur-2xl bg-brand-purple/20 rounded-full animate-pulse"></div>
              <AlertTriangle size={48} className="relative z-10" />
            </div>
            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-5xl text-white font-black tracking-tight uppercase">
                Inscrições Encerradas
              </h1>
              <p className="text-white/60 text-lg font-medium">
                O período de inscrições para o ciclo {year} chegou ao fim.
              </p>
            </div>
          </div>

          <div className="glass-panel p-8 sm:p-12 rounded-[40px] border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-teal/10 rounded-full blur-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />

            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">
                  Obrigado pelo interesse!
                </h2>
                <p className="text-white/40 leading-relaxed max-w-md mx-auto">
                  Agradecemos a todos que demonstraram interesse. Se você já
                  realizou sua inscrição, fique de olho no seu e-mail para os
                  próximos passos do processo seletivo.
                </p>

                <div className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-5 mt-6">
                  <p className="text-brand-teal text-sm font-bold leading-relaxed">
                    🚀 Prepare-se! Fique de olho nas nossas redes sociais para
                    acompanhar novidades sobre os próximos ciclos de inscrições.
                  </p>
                </div>
              </div>

              <div className="h-px w-full bg-white/5" />

              <div className="space-y-6">
                <p className="text-xs font-black text-brand-teal uppercase tracking-[0.3em]">
                  Acompanhe nossas redes
                </p>
                <div className="flex items-center justify-center gap-4">
                  <a
                    href="https://instagram.com/estartandodevs"
                    target="_blank"
                    rel="noreferrer"
                    className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-brand-purple/20 hover:border-brand-purple/30 transition-all duration-300 group"
                  >
                    <Instagram
                      size={24}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </a>
                  <a
                    href="https://estartandodevs.com.br"
                    target="_blank"
                    rel="noreferrer"
                    className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-brand-teal/20 hover:border-brand-teal/30 transition-all duration-300 group"
                  >
                    <Globe
                      size={24}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <p className="text-white/20 text-xs font-bold uppercase tracking-widest">
            Estartando Devs • Transformando vidas através da tecnologia
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 flex flex-col items-center">
      <div className="max-w-4xl mx-auto w-full space-y-12">
        <RequirementsModal
          open={showRequirementsModal}
          onClose={() => setShowRequirementsModal(false)}
          track={selectedTrack}
        />
        <CourseRequirementsModal
          open={showCourseRequirementsModal}
          onClose={() => setShowCourseRequirementsModal(false)}
          course={selectedCourse}
        />
        <ConfirmationModal
          open={showConfirmation}
          onClose={() => setShowConfirmation(false)}
        />
        <ErrorModal
          open={showError}
          onClose={() => setShowError(false)}
          title={errorTitle}
          message={errorMessage}
        />

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="font-display text-[36px] text-white font-bold tracking-tight uppercase">
              Inscrições {year} —{' '}
              <span className="text-brand-purple">Impulso Abertas</span>
            </h2>
            <p className="text-white/60 max-w-2xl leading-relaxed">
              Faça parte da próxima turma do Estartando Devs e inicie sua
              jornada na tecnologia. Neste ciclo, as inscrições estão abertas
              exclusivamente para a trilha{' '}
              <span className="text-white font-semibold">Impulso</span>.
            </p>
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-teal/10 rounded-full blur-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />

          <Stepper
            step={step}
            steps={steps}
            onStepClick={setStep}
            isStepEnabled={(idx) =>
              idx < step || isStepValid.slice(0, idx).every(Boolean)
            }
          />

          <div className="mt-10 min-h-[300px]">
            <AnimatePresence mode="wait" initial={false}>
              {step === 0 && (
                <motion.div
                  key="step-0"
                  exit={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.18, ease: 'easeInOut' }}
                >
                  <TrackSelector
                    tracks={tracks}
                    selectedTrack={selectedTrack}
                    setSelectedTrack={handleTrackSelection}
                    disabledTracks={['estartando']}
                  />
                </motion.div>
              )}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  exit={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.18, ease: 'easeInOut' }}
                >
                  <CourseSelector
                    courses={courses}
                    selectedCourse={selectedCourse}
                    setSelectedCourse={handleCourseSelection}
                  />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  exit={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.18, ease: 'easeInOut' }}
                >
                  <PersonalDataForm />
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  exit={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.18, ease: 'easeInOut' }}
                >
                  <AddressForm />
                </motion.div>
              )}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  exit={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.18, ease: 'easeInOut' }}
                >
                  <ExperienceForm />
                </motion.div>
              )}
              {step === 5 && (
                <motion.div
                  key="step-5"
                  exit={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.18, ease: 'easeInOut' }}
                >
                  <ReasonForm />
                </motion.div>
              )}
              {step === 6 && (
                <motion.div
                  key="step-6"
                  exit={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.18, ease: 'easeInOut' }}
                >
                  <ConfirmationStep
                    availability={availability}
                    enquadramentoRendaPrioritaria={
                      enquadramentoRendaPrioritaria
                    }
                    acceptedPolicy={acceptedPolicy}
                    setAvailability={setAvailability}
                    setEnquadramentoRendaPrioritaria={
                      setEnquadramentoRendaPrioritaria
                    }
                    setAcceptedPolicy={setAcceptedPolicy}
                    knownFrom={sourceData.knownFrom}
                    setKnownFrom={sourceData.setKnownFrom}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row justify-between pt-10 mt-10 border-t border-white/5 gap-4">
            <button
              type="button"
              className="px-8 py-3.5 rounded-xl bg-surface-variant/50 border border-white/5 text-white/60 font-bold text-sm hover:bg-surface-variant hover:text-white transition-all w-full sm:w-auto disabled:opacity-30"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0 || loading}
            >
              Voltar
            </button>
            {step < 6 ? (
              <button
                type="button"
                className="px-8 py-3.5 rounded-xl bg-brand-teal text-surface-dark font-bold text-sm hover:bg-brand-teal/90 transition-all shadow-[0_4px_20px_0_rgba(0,191,166,0.3)] w-full sm:w-auto disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={() => setStep((s) => Math.min(6, s + 1))}
                disabled={!isStepValid[step] || loading}
              >
                Continuar
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-8 py-3.5 rounded-xl bg-brand-teal text-surface-dark font-bold text-sm hover:bg-brand-teal/90 transition-all shadow-[0_4px_20px_0_rgba(0,191,166,0.3)] w-full sm:w-auto disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={
                  availability !== true ||
                  !acceptedPolicy ||
                  !sourceData.knownFrom ||
                  enquadramentoRendaPrioritaria === null ||
                  loading
                }
              >
                {loading ? 'Enviando...' : 'Finalizar inscrição'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
