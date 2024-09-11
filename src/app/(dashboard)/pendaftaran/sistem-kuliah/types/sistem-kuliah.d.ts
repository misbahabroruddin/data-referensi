interface SistemKuliah {
  id?: string;
  kode: string;
  sistem_kuliah: string;
  keterangan: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  user: User;
}
