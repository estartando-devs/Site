import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { Footer, Layout, Logo, Typography } from '../components';

export default function PoliticasDePrivacidade() {
  return (
    <Layout>
      <NextSeo
        title="Política de Privacidade"
        description="Esta Política de Privacidade abrange nossas práticas de coleta de dados e descreve os direitos do usuário em relação aos dados pessoais."
        openGraph={{
          url: 'https://estartandodevs.com.br/politicas-de-privacidade',
        }}
      />

      <div className="min-h-screen flex flex-col">
        <header className="p-10">
          <Link href="/">
            <Logo width={48} height={68} priority quality={30} />
          </Link>
        </header>

        <main className="flex-1 max-w-desktop_fullhd mx-auto px-8 md:px-30 py-12">
          <div className="space-y-12">
            <header className="space-y-4">
              <Typography variant="h1" className="text-white">
                Política de <span className="text-brand-teal">Privacidade</span>
              </Typography>
              <Typography variant="body2" className="text-white/40 font-medium">
                Esta Política de Privacidade foi atualizada pela última vez em 05
                de Março de 2021.
              </Typography>
            </header>

            <div className="space-y-10 max-w-4xl text-white/70">
              <Typography variant="body2" className="leading-relaxed">
                Agradecemos sua participação no Estartando Devs. O Estartando
                Devs respeita a privacidade dos usuários e deseja que todos
                entendam como coletamos, usamos e compartilhamos os dados dos
                usuários. Esta Política de Privacidade abrange nossas práticas
                de coleta de dados e descreve os direitos do usuário em relação
                aos dados pessoais.
              </Typography>

              <section className="space-y-6">
                <Typography variant="h3" className="text-brand-teal">
                  1. Tipos de Dados Coletados
                </Typography>
                <div className="space-y-4">
                  <Typography variant="body2" className="leading-relaxed">
                    Coletamos apenas as informações inseridas diretamente pelo
                    usuário no formulário de inscrição, tais como: nome
                    completo, email, data de nascimento, telefone, cep,
                    endereço, bairro, cidade e perfil do usuário (se está no 3º
                    ano do ensino médio ou já concluiu o mesmo).
                  </Typography>
                  <Typography variant="body2" className="leading-relaxed">
                    Nenhum dado é coletado de forma automatizada como por
                    exemplo dados do sistema ou geográficos.
                  </Typography>
                </div>
              </section>

              <section className="space-y-6">
                <Typography variant="h3" className="text-brand-teal">
                  2. Finalidade dos dados dos inscritos
                </Typography>
                <div className="space-y-4">
                  <Typography variant="body2" className="leading-relaxed">
                    Usamos os dados do usuário para fins tais como fornecer
                    nossos Serviços, nos comunicarmos lemas, proteger contra
                    fraude e abuso, melhorar e atualizar nossos Serviços,
                    conforme exigido por lei ou necessário para a segurança e a
                    integridade. Os dados são retidos pelo tempo necessário para
                    atender aos fins para que foram coletados.
                  </Typography>
                  <Typography variant="body2" className="leading-relaxed font-bold text-white/90">
                    Os dados colhidos quando o usuário utiliza os Serviços são
                    usados para:
                  </Typography>
                  <ul className="list-disc pl-6 space-y-3 text-[1.125rem]">
                    <li>
                      Fornecer e administrar os Serviços, inclusive para
                      facilitar a participação em conteúdo educacional, emitir
                      certificados de conclusão, exibir conteúdo personalizado e
                      facilitar a comunicação com outros usuários;
                    </li>
                    <li>Comunicar com o usuário sobre a conta dele:</li>
                    <ul className="list-circle pl-6 mt-2 space-y-2">
                      <li>Respondendo às perguntas e dúvidas do usuário;</li>
                      <li>
                        Enviar informações ao usuário, por e-mail ou mensagens
                         de texto, sobre o progresso dele no processo, e
                        eventuais eventos;
                      </li>
                    </ul>
                    <li>
                      Facilitar a operação técnica dos Serviços, inclusive
                      solução de problemas, proteção dos Serviços e prevenção de
                      fraudes e abuso;
                    </li>
                  </ul>
                </div>
              </section>

              <section className="space-y-6">
                <Typography variant="h3" className="text-brand-teal">
                  3. Com quem são compartilhados os dados dos usuários:
                </Typography>
                <div className="space-y-4">
                  <Typography variant="body2" className="leading-relaxed">
                    <strong className="text-white/90">Com os instrutores:</strong> Compartilhamos dados
                    sobre o usuário com do conteúdo educacional que o usuário
                    acessa ou sobre os quais solicita informações, para que eles
                    possam melhorar o conteúdo para o usuário e outros alunos.
                  </Typography>
                  <Typography variant="body2" className="leading-relaxed">
                    <strong className="text-white/90">Para segurança e conformidade com a lei:</strong>{' '}
                    Poderemos divulgar os dados do usuário a terceiros se (a
                    nosso exclusivo critério) acreditarmos, pautados na boa-fé,
                    que a divulgação seja:
                  </Typography>
                  <ul className="list-disc pl-6 space-y-3 text-[1.125rem]">
                    <li>Permitida ou exigida por lei;</li>
                    <li>
                      Solicitada como parte de uma investigação ordem ou
                      processo judicial, governamental ou jurídico;
                    </li>
                    <li>
                      Justificadamente necessária como parte de uma intimação
                      válida, mandado ou outro pedido legalmente válido;
                    </li>
                    <li>
                      Justificadamente necessária para aplicar nossos Termos de
                      Uso, Política de Privacidade e outros acordos jurídicos;
                    </li>
                    <li>
                      Necessária para detectar, prevenir ou solucionar casos de
                      fraude, abuso, uso indevido, possíveis violações da lei
                      (ou regras ou regulamentos) ou questões técnicas ou de
                      segurança; ou
                    </li>
                    <li>
                      Poderemos também divulgar dados sobre o usuário para
                      nossos auditores e consultores jurídicos, a fim de avaliar
                      noulgação ao abrigo desta Política de Privacidade.
                    </li>
                  </ul>
                  <Typography variant="body2" className="leading-relaxed">
                    <strong className="text-white/90">Com a permissão do usuário:</strong> Com
                    consentimento do usuário, podemos compartilhar dados com
                    terceiros fora do escopo desta Política de Privacidade.
                  </Typography>
                </div>
              </section>

              <section className="space-y-6">
                <Typography variant="h3" className="text-brand-teal">
                  4. Direitos dos usuários
                </Typography>
                <div className="space-y-4">
                  <Typography variant="body2" className="leading-relaxed">
                    O usuário possui certos direitos quanto ao uso de seus
                    dados, inclusive a possibilidade de optar por não receber
                    e-mails. O usuário poderá atualizar ou deletar seus dados
                    dentro dos nossos Serviços e também entrar em contato
                    conosco para esclarecer dúvidas quanto a direitos
                    individuais sobre seus dados pessoais. Pais que acreditem
                    que tenhamos coletado acidentalmente dados pessoais sobre
                    seus filhos menores de idade devem entrar em contato conosco
                    para obter ajuda sobre como excluir essa informações.
                  </Typography>
                  <Typography variant="body2" className="leading-relaxed">
                    Caso tenha dúvidas sobre direitos, dados e a forma como o
                    Estartando Devs utiliza os dados, o usuário deverá entrar em
                    contato conosco em{' '}
                    <a
                      href="mailto:estartandodevs@gmail.com"
                      className="text-brand-teal hover:underline transition-colors"
                    >
                      estartandodevs@gmail.com
                    </a>
                    .
                  </Typography>
                </div>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </Layout>
  );
}
