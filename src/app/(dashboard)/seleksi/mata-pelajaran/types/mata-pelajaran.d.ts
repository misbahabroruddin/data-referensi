interface MataPelajaran {
  id?: string;
  kode: string;
  nama: string;
  point_minimal: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  user: User;
}
