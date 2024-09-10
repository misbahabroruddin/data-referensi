interface Suku {
  id?: string;
  nama: string;
  daerah_asal: string;
  user_id: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  user: User;
}
