interface FormPengumuman {
  judul: string;
  jenis_pendaftaran: string;
  keterangan?: string;
  tampil_beranda: boolean | "0" | "1";
  tampil_pendaftaran: boolean | "0" | "1";
}
