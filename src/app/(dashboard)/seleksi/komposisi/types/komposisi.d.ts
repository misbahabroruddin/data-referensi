interface Komposisi {
  id?: string;
  kode: string;
  komposisi: string;
  keterangan: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  user: User;
}
