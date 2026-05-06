export type NotifyDiscordService = {
  fullName: string;
  city: string;
  neighborhood: string;
  course: string;
};

export async function notifyDiscord({
  city,
  course,
  fullName,
  neighborhood,
}: NotifyDiscordService) {
  const currentYear = new Date().getFullYear();

  try {
    await fetch(
      `https://discordapp.com/api/webhooks/729118719737069669/CAwTGLyMSLPjftBVNw1BZlU-68Da018TD5WuGipzQ8CIGc7jj1EK1fXpY_GilG1z9vHR`,
      {
        method: 'post',
        body: JSON.stringify({
          content: `Mais um inscrito no Estartando Devs ${currentYear} 🎉
                \n👨‍💻 Nome:  ${fullName}
                \n📍 Local:  ${city} , ${neighborhood}
                \n💻 Turma:  ${course}
               `,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error(error);
  }
}
