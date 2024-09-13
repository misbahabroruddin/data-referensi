interface FormPenilaianRapor {
  kode: string;
  nama_penilaian: string;
  nilai: string;
  mata_pelajaran_id:
    | {
        value: string;
        label: string;
      }
    | any;
  keterangan?: string;
}
