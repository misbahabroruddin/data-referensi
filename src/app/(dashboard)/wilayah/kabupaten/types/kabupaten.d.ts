interface Kabupaten {
  id?: string;
  provinsi_id: string;
  nama: string;
  kode: string;
  user_id: string;
  deleted_at?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
  provinsi: {
    id: string;
    nama: string;
  };
  user: User;
}