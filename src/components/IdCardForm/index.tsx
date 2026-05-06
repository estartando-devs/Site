import { setCookies } from 'cookies-next';
import {
  AlertCircle,
  BookOpen,
  Camera,
  CheckCircle,
  Loader2,
  Mail,
  MapPin,
  User,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import { FormProvider, useForm } from 'react-hook-form';
import { useCropImage } from '../../hooks/useCropImage';
import { cleanZipcode, getAddressByCep } from '../../services';
import { CourseNameByKey, CourseNameByKeyTeam, Status } from '../../types';
import { getCroppedImg } from '../../utils/cropImage';
import { Input } from '../Input';
import { Logo } from '../Logo';
import { Typography } from '../Typography';

export const IdCardForm = (props: { team?: boolean }) => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<Status>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const methods = useForm({
    defaultValues: {
      name: '',
      email: '',
      zipcode: '',
      course: '',
    },
  });

  const {
    crop,
    setCrop,
    zoom,
    setZoom,
    onCropComplete,
    onSelectFile,
    image,
    showCopper,
    setShowCopper,
    croppedArea,
  } = useCropImage();

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSubmit = async (data: Record<string, string>) => {
    if (!imagePreview) {
      showNotification(
        'error',
        'Por favor, envie uma foto antes de continuar.',
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const { email, zipcode, name, course } = data;

      // Get address details from CEP
      const addressData = await getAddressByCep(cleanZipcode(zipcode));

      // Store in cookies for persistence if needed elsewhere
      setCookies(
        'nagato',
        JSON.stringify({
          name,
          course,
          zipcode,
          city: addressData.localidade || 'Rio de Janeiro',
          state: addressData.uf || 'RJ',
        }),
      );

      // Build query params for the card page to avoid SSR cookie issues
      const query = new URLSearchParams({
        name,
        course,
        city: addressData.localidade || 'Rio de Janeiro',
        state: addressData.uf || 'RJ',
        team: props.team ? 'true' : 'false',
      }).toString();

      if (props.team) {
        router.push(`/id-card/time/${encodeURIComponent(name)}?${query}`);
      } else {
        router.push(`/id-card/${encodeURIComponent(email)}?${query}`);
      }
    } catch (error) {
      console.error('Error generating ID card:', error);
      showNotification(
        'error',
        'Ocorreu um erro ao gerar seu ID Card. Tente novamente.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Fill form with session data if available (from registration flow)
    const email = sessionStorage.getItem('email');
    const name = sessionStorage.getItem('name');
    if (email) methods.setValue('email', email);
    if (name) methods.setValue('name', name);

    // Initial image check
    const storageImage = sessionStorage.getItem('id-card-image');
    if (storageImage) {
      try {
        const value = JSON.parse(storageImage);
        if (value?.image?.src) setImagePreview(value.image.src);
      } catch (e) {
        console.error('Error parsing storage image', e);
      }
    }
  }, [methods]);

  const handleUpload = async () => {
    setUploadStatus('loading');
    try {
      const canvas = await getCroppedImg(image, croppedArea);
      if (!canvas) throw new Error('Failed to crop image');

      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);

      // Check if dataUrl is too large for sessionStorage (~5MB limit in most browsers)
      if (dataUrl.length > 4 * 1024 * 1024) {
        throw new Error('Image too large');
      }

      sessionStorage.setItem(
        'id-card-image',
        JSON.stringify({
          image: {
            src: dataUrl,
          },
        }),
      );

      setImagePreview(dataUrl);
      setShowCopper(false);
      setUploadStatus('success');
      showNotification('success', 'Foto processada com sucesso!');
    } catch (error: any) {
      setUploadStatus('error');
      const msg =
        error.message === 'Image too large'
          ? 'A imagem ficou muito grande. Tente usar uma foto menor ou com menos zoom!'
          : 'Erro ao processar imagem. Tente novamente.';
      showNotification('error', msg);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col items-center gap-12">
      <header className="flex flex-col md:flex-row items-center gap-6 md:gap-12 text-center md:text-left">
        <Link href="/" className="hover:scale-105 transition-transform">
          <Logo width={100} height={150} priority />
        </Link>
        <div className="flex flex-col gap-2">
          <Typography
            variant="h1"
            className="text-4xl md:text-6xl font-black text-white tracking-tighter"
          >
            Estartando Devs
          </Typography>
          <Typography
            variant="h2"
            className="text-2xl md:text-3xl font-bold uppercase tracking-[0.2em] text-white/40"
          >
            ID CARD{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-purple">
              2026
            </span>
          </Typography>
        </div>
      </header>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Side: Instructions & Preview Hint */}
        <div className="flex flex-col gap-8">
          <div className="space-y-6">
            <Typography
              variant="h2"
              className="text-3xl md:text-5xl font-black text-white leading-tight"
            >
              Gere sua carteirinha e mostre ao mundo!
            </Typography>
            <p className="text-white/60 text-lg leading-relaxed max-w-[500px]">
              Crie seu ID Card personalizado em poucos segundos e compartilhe
              sua conquista nas redes sociais. Não esqueça de nos marcar!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4 hover:border-brand-teal/30 transition-colors">
              <Camera className="w-8 h-8 text-brand-teal" />
              <h4 className="text-white font-bold uppercase tracking-wider text-sm">
                Foto de Perfil
              </h4>
              <p className="text-white/40 text-xs">
                Use uma foto clara, de preferência com fundo neutro.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4 hover:border-brand-purple/30 transition-colors">
              <CheckCircle className="w-8 h-8 text-brand-purple" />
              <h4 className="text-white font-bold uppercase tracking-wider text-sm">
                Pronto para uso
              </h4>
              <p className="text-white/40 text-xs">
                Baixe em alta resolução e use como avatar ou post.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full bg-surface-container/30 backdrop-blur-xl p-8 md:p-12 rounded-[32px] border border-white/10 shadow-2xl">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(handleSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="space-y-4">
                <Input
                  placeholder="Nome Completo"
                  type="text"
                  id="name"
                  name="name"
                  required
                  icon={<User className="w-5 h-5" />}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="CEP"
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    required
                    icon={<MapPin className="w-5 h-5" />}
                  />
                  <div className="w-full space-y-2">
                    <label
                      htmlFor="course"
                      className="block text-[11px] font-black text-white/40 uppercase tracking-[0.2em] ml-1"
                    >
                      Curso
                    </label>
                    <div className="relative group">
                      <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-brand-teal transition-all duration-300 z-10" />
                      <select
                        {...methods.register('course', { required: true })}
                        name="course"
                        id="course"
                        className="w-full h-[60px] bg-black/20 border border-white/5 rounded-2xl pl-12 pr-10 text-white text-base focus:outline-none focus:border-brand-teal/50 focus:ring-4 focus:ring-brand-teal/5 transition-all appearance-none"
                      >
                        <option value="" className="bg-surface-dark">
                          Selecione o curso...
                        </option>
                        {Object.entries(
                          props.team ? CourseNameByKeyTeam : CourseNameByKey,
                        ).map(([key, value]) => (
                          <option
                            key={key}
                            value={value}
                            className="bg-surface-dark"
                          >
                            {value}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 group-hover:text-brand-teal transition-colors">
                        ▼
                      </div>
                    </div>
                  </div>
                </div>

                <Input
                  placeholder="Seu melhor e-mail"
                  type="text"
                  id="email"
                  name="email"
                  validation={{
                    required: 'E-mail é obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Insira um e-mail válido',
                    },
                  }}
                  icon={<Mail className="w-5 h-5" />}
                />
              </div>

              <div className="flex flex-col items-center gap-6 mt-4 p-6 rounded-2xl bg-white/5 border border-dashed border-white/20">
                {imagePreview ? (
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-brand-teal shadow-xl shadow-brand-teal/20">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <label
                      htmlFor="file-input"
                      className="absolute -bottom-2 -right-2 bg-brand-purple p-2 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg"
                    >
                      <Camera className="w-4 h-4 text-white" />
                    </label>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <Camera className="w-8 h-8 text-white/20" />
                    </div>
                    <Typography
                      variant="body3"
                      className="text-white/40 text-center text-xs"
                    >
                      Clique abaixo para selecionar sua foto
                    </Typography>
                  </div>
                )}

                <input
                  type="file"
                  onChange={onSelectFile}
                  id="file-input"
                  className="hidden"
                  accept="image/*"
                />
                <label
                  htmlFor="file-input"
                  className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-8 py-3 hover:bg-white/5 transition-all text-white font-bold text-sm"
                >
                  {imagePreview ? 'Trocar Foto' : 'Selecionar Foto'}
                </label>
              </div>

              <button
                type="submit"
                disabled={!imagePreview || isSubmitting}
                className={`w-full py-5 rounded-2xl font-black text-xl text-white transition-all flex items-center justify-center gap-3 shadow-2xl ${
                  imagePreview && !isSubmitting
                    ? 'bg-gradient-to-r from-brand-teal to-brand-purple hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] shadow-brand-teal/20'
                    : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                }`}
              >
                {isSubmitting && <Loader2 className="w-6 h-6 animate-spin" />}
                {isSubmitting ? 'Gerando...' : 'Criar ID Card'}
              </button>
            </form>
          </FormProvider>
        </div>
      </div>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-4 z-[500] border backdrop-blur-xl ${
              notification.type === 'success'
                ? 'bg-emerald-500/90 border-emerald-400/50 text-white'
                : 'bg-red-500/90 border-red-400/50 text-white'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <AlertCircle className="w-6 h-6" />
            )}
            <span className="font-bold tracking-wide">
              {notification.message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cropper Modal */}
      <AnimatePresence>
        {showCopper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-surface-dark/95 backdrop-blur-md z-[600] flex flex-col items-center justify-center p-6"
          >
            <div className="w-full max-w-2xl bg-surface-container rounded-[32px] overflow-hidden border border-white/10 shadow-3xl flex flex-col">
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <Typography
                  variant="h3"
                  className="text-white font-black uppercase tracking-widest text-xl"
                >
                  Ajuste sua foto
                </Typography>
                <button
                  onClick={() => setShowCopper(false)}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="relative h-[400px] bg-black/50">
                <Cropper
                  image={image as string}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  cropShape="round"
                  showGrid={false}
                />
              </div>

              <div className="p-8 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/5">
                <div className="flex-1 w-full px-4">
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-teal"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowCopper(false)}
                    className="px-8 py-3 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={uploadStatus === 'loading'}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-brand-teal to-brand-purple text-white font-bold hover:opacity-90 flex items-center gap-2 shadow-lg shadow-brand-teal/20"
                  >
                    {uploadStatus === 'loading' && (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
