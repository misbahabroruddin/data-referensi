interface KomponenPenilaian {
  id?: number;
  kriteria_penilaian_id: string;
  nama: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  user: User;
  kriteria_penilaian: {
    id: number;
    nama: string;
    bobot: string;
  };
}
