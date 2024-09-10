interface Almamater {
  id?: string;
  ukuran: string;
  kode: string;
  lingkar_dada: string;
  panjang_lengan: string;
  panjang_badan: string;
  user_id: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  user: User;
}
