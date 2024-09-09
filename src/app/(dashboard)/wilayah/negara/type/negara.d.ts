interface Negara {
  id?: string;
  nama: string;
  kode_telepon: string;
  user_id: string;
  guard_name: string;
  deleted_at?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
  user: User;
}
