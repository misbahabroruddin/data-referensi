interface Desa {
  id?: string;
  kecamatan_id: string;
  nama: string;
  kode: string;
  user_id: string;
  deleted_at?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
  kecamatan: {
    id: string;
    nama: string;
  };
  user: User;
}
