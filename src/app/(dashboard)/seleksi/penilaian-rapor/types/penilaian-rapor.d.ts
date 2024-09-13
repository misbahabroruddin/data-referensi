interface PenilaianRapor {
  id?: string;
  kode: string;
  nama_penilaian: string;
  nilai: string;
  mata_pelajaran_id: string;
  keterangan: string | null;
  user_id: string;
  created_at: string;
  updatedd_at: string;
  user: User;
  mata_pelajaran: {
    id: string;
    kode: string;
    nama: string;
    point_minimal: string;
  };
}
