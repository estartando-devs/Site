type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export const ErrorState = ({
  message = 'Ocorreu um erro ao carregar os dados',
  onRetry,
}: ErrorStateProps) => (
  <div className="flex flex-col justify-center items-center min-h-[50vh] text-center p-8 gap-4">
    <div className="text-[3rem]">⚠️</div>
    <p className="text-[1.2rem] text-orange-500 max-w-[500px] leading-relaxed">
      {message}
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-4 px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-md hover:bg-orange-500/10 transition-all text-lg cursor-pointer"
      >
        Tentar novamente
      </button>
    )}
  </div>
);
