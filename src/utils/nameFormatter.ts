/**
 * Capitaliza cada palavra de um nome
 * @param name - Nome a ser capitalizado
 * @returns Nome com cada palavra capitalizada
 */
export const capitalizeName = (name: string): string => {
  return name
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Organiza uma lista de nomes em ordem alfabética e capitaliza cada um
 * @param names - Array de nomes a serem organizados
 * @returns Array de nomes capitalizados e ordenados alfabeticamente
 */
export const sortNamesAlphabetically = (names: string[]): string[] => {
  return names
    .map((name) => capitalizeName(name))
    .sort((a, b) => a.localeCompare(b, 'pt-BR'));
};
