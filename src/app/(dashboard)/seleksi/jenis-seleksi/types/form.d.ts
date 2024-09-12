interface FormJenisSeleksi {
  kode: string;
  nama: string;
  kelulusan: string;
  wajib_ikut: boolean | "1" | "0";
  pakai_ruangan: boolean | "1" | "0";
  bebas_tes: boolean | "1" | "0";
  cbt: boolean | "1" | "0";
  upload_berkas: boolean | "1" | "0";
}
