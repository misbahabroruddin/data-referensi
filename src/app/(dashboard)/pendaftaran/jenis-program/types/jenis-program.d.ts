interface JenisProgram {
  id?: string;
  kode: string;
  jenis_program: string;
  is_ipc: "0" | "1";
  keterangan: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  user: User;
}
