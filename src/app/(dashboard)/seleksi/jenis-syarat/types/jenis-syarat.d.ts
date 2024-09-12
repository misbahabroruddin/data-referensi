interface JenisSyarat {
  id?: string;
  kode: string;
  jenis_syarat: string;
  keterangan: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  user: User;
}
