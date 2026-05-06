import { toPng } from 'html-to-image';
import { useEffect, useRef, useState } from 'react';
import { IdCardProps } from '.';
import { getKeyByCourse } from './utils';

export const useIdCardHandlers = ({
  course,
  image,
}: Required<Pick<IdCardProps, 'course' | 'image'>>) => {
  const ref = useRef<HTMLDivElement>(null);
  const [imageSrc, setimageSrc] = useState<{
    src: string;
    alt: string;
  }>(image);

  const courseKey = getKeyByCourse(course);

  useEffect(() => {
    const storageImage = sessionStorage.getItem('id-card-image');
    if (storageImage) {
      try {
        const value = JSON.parse(storageImage);
        if (value?.image?.src) {
          setimageSrc((prev) => ({ ...prev, src: value.image.src }));
        }
      } catch (e) {
        console.error('Error parsing storage image', e);
      }
    }
  }, []);

  const handleDownloadImage = async () => {
    const element = ref?.current;

    if (!element) {
      console.error('ID Card element not found');
      return;
    }

    try {
      // 1. Snapshot settings
      const originalTransform = element.style.transform;

      // Temporarily reset scale to 1 for high-res capture
      element.style.transform = 'none';

      // 2. Capture using html-to-image (supports oklch, gradients, etc.)
      const dataUrl = await toPng(element, {
        width: 1290,
        height: 720,
        pixelRatio: 2, // Double quality
        cacheBust: true,
        style: {
          transform: 'scale(1)',
          left: '0',
          top: '0',
        },
      });

      // 3. Restore original style
      element.style.transform = originalTransform;

      // 4. Trigger download
      const link = document.createElement('a');
      link.download = `id-card-${courseKey}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error capturing ID Card:', error);
      alert(
        'Não foi possível gerar a imagem com o visual premium. Tente novamente em alguns segundos.',
      );
    }
  };

  return {
    ref,
    imageSrc,
    courseKey,
    handleDownloadImage,
  };
};
