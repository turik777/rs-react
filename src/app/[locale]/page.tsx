import Page from '../../components/Page/Page';
import { getTotalPages, searchCharacters } from '../../utils/api';

interface IProps {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function PageServer({ searchParams }: IProps) {
  const params = await searchParams;

  const query = params.search ? params.search : '';
  const page = params.page ? Number(params.page) : 1;

  const characters = await searchCharacters(query, page).catch(() => []);
  const totalPages = await getTotalPages(query).catch(() => 1);

  return (
    <Page
      characters={characters}
      totalPages={totalPages}
      page={page}
      query={query}
      searchParams={params}
    />
  );
}
