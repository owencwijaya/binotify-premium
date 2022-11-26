export interface Song {
  song_id: number | null,
  judul: string | null,
  penyanyi: string | null,
  tanggal_terbit: Date | null,
  genre: string | null,
  duration: number | null,
  audio_path: string | null,
  image_path: string | null,
  album_id: number | null,
  album_name: string | null
}