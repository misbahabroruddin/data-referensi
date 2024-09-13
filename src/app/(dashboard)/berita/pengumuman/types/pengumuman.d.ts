interface Pengumuman {
  id?: string;
  judul: string;
  jenis_pendaftaran: string;
  keterangan?: string;
  tampil_beranda: "0" | "1";
  tampil_pendaftaran: "0" | "1";
  user_id: string;
  created_at: string;
  updated_at: string;
}
