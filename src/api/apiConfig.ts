
export const apiConfig = {
    baseUrl: import.meta.env.VITE_TMDB_BASE_URL,
    apiKey:import.meta.env.VITE_TMDB_API_KEY,
    originalImage: (imgPath: string) => `https://image.tmdb.org/t/p/original/${imgPath}` ,
    w500Image: (imgPath: string) => `https://image.tmdb.org/t/p/w500/${imgPath}` 
}