interface Provinsi {
  id?: string;
  negara_id: string;
  nama: string;
  kode: string;
  kode_wilayah: string;
  user_id: string;
  deleted_at?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
  negara: {
    id: string;
    nama: string;
  };
  user: User;
}
