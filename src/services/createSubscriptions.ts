export type Course = 'web' | 'backend' | 'uiux';
export type Track = 'estartando' | 'impulso';
export type KnownFrom =
  | 'instagram'
  | 'linkedin'
  | 'youtube'
  | 'discord'
  | 'google'
  | 'indicacao'
  | 'evento'
  | 'outro';

export interface SubscriptionData {
  cep?: string;
  utmSource?: string;
  utmMedium?: string;
  curso: Course;
  email: string;
  bairro: string;
  cidade: string;
  trilha: Track;
  celular: string;
  endereco: string;
  motivacao: string;
  experiencia: string;
  comoConheceu: KnownFrom;
  nomeCompleto: string;
  dataNascimento: string;
  disponibilidade: boolean;
  enquadramentoRendaPrioritaria: boolean;
  politicasAceitas: {
    aceito: boolean;
    aceitoEm: string;
  };
}

export interface SubscriptionResponse {
  id: string;
}

const API_URL =
  'https://9h6j9n1vpc.execute-api.us-east-1.amazonaws.com/inscricoes';

export async function createSubscription(
  data: SubscriptionData,
): Promise<SubscriptionResponse> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMsg =
      'Houve um erro ao enviar sua inscrição. Por favor, tente novamente.';
    try {
      const errorData = await response.json();
      if (errorData && errorData.message) {
        errorMsg = errorData.message;
      }
    } catch (e) {
      console.error(e);
    }
    throw new Error(errorMsg);
  }

  return response.json();
}
