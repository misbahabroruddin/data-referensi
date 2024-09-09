interface Agama {
  id?: string;
  nama: string;
  kode: string;
  user_id: string;
  guard_name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  user: User;
}
