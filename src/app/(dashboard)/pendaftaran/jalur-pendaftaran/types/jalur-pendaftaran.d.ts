interface JalurPendaftaran {
  id?: string;
  kode: string;
  jalur_pendaftaran: string;
  jenis_pendaftaran: string;
  keterangan: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  user: User;
}
