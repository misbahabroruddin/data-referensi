interface Penghasilan {
  id?: string;
  nama: string;
  kode: string;
  rentang: string;
  point_kip_kuliah: string;
  user_id: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  user: User;
}
