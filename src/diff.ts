import 'colors';
import { diffLines } from 'diff';
import { QueryCollection, toMap } from './hasura';

function showDiff(previouString: string, currentString: string) {
  const diff = diffLines(previouString, currentString);

  diff.forEach((part: { added: boolean; removed: boolean; value: string }) => {
    // green for additions, red for deletions
    // grey for common parts
    const color = part.added ? 'green' : part.removed ? 'red' : 'white';
    const prefix = part.added ? '+' : part.removed ? '-' : '';
    console.log(`${prefix}${part.value[color]}`);
  });
}

export function printQueryDiff(
  remoteQueries: QueryCollection[],
  changedQueries: QueryCollection[]
) {
  const remoteMapQueries = toMap(remoteQueries);

  if (changedQueries.length > 0) {
    console.log('Some queries has been changed!');
  }

  changedQueries.forEach(({ query, name }) => {
    const remoteQuery = remoteMapQueries.get(name);

    console.log(`\n\n${name} has changed!! \n`);
    showDiff(remoteQuery, query);
  });
}
