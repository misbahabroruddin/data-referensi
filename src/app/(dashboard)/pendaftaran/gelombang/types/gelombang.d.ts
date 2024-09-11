interface Gelombang {
  id?: string;
  kode: string;
  gelombang: string;
  keterangan: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  user: User;
}
