import { TextInput, TextInputProps, ActionIcon, useMantineTheme } from '@mantine/core';
import SearchResult from "./searchResult"

export function Home() {
  const theme = useMantineTheme();

  return (
    <main className='searchbar-wrapper'>
        <h1 style={{textAlign:"center"}}>Welcome to Search Blog</h1>
        
        <div>
            <SearchResult/>
        </div>
    </main>
  );
}