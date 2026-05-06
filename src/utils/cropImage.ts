export type CroppedArea = {
  width: number;
  height: number;
  x: number;
  y: number;
};

/**
 * @description: Create a cropped image
 * @param {string} url: url image to be cropped
 */
const createImage = (
  url: string | ArrayBuffer | undefined,
): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url as string;
  });

/**
 * @description: Capture the radian of a given angle
 * @param {number} degreeValue: degree of rotation
 * @returns {number} radian angle
 */
function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180;
}

/**
 * @description: Crop an image
 * @param {string | ArrayBuffer | undefined} imageSrc: image to be cropped
 * @param {CroppedArea} pixelCrop: area to be cropped
 * @params {number} [rotation=0]: degree of rotation
 * @returns {Promise<HTMLCanvasElement>} canvas image
 */
export async function getCroppedImg(
  imageSrc: string | ArrayBuffer | undefined,
  pixelCrop: CroppedArea,
  rotation = 0,
): Promise<HTMLCanvasElement> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const canvasCtx = canvas.getContext('2d');

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  canvasCtx?.translate(safeArea / 2, safeArea / 2);
  canvasCtx?.rotate(getRadianAngle(rotation));
  canvasCtx?.translate(-safeArea / 2, -safeArea / 2);

  canvasCtx?.drawImage(
    image,
    safeArea / 2 - Number(image.width) * 0.5,
    safeArea / 2 - Number(image.height) * 0.5,
  );

  const data = canvasCtx?.getImageData(0, 0, safeArea, safeArea);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  canvasCtx?.putImageData(
    data as ImageData,
    0 - safeArea / 2 + Number(image.width) * 0.5 - pixelCrop.x,
    0 - safeArea / 2 + Number(image.height) * 0.5 - pixelCrop.y,
  );

  return canvas;
}
