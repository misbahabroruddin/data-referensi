interface Pekerjaan {
  id?: string;
  kategori: string;
  kode: string;
  deskripsi: string;
  user_id: string;
  guard_name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  user: User;
}
