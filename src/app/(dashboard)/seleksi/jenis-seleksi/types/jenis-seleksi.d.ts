interface JenisSeleksi {
  id?: string;
  kode: string;
  nama: string;
  kelulusan: string;
  wajib_ikut: "0" | "1";
  pakai_ruangan: "0" | "1";
  bebas_tes: "0" | "1";
  cbt: "0" | "1";
  upload_berkas: "0" | "1";
  user_id: string;
  created_at: string;
  updated_at: string;
  user: User;
}
