import { Metadata } from "next";

export const metadataConfig: Metadata = {
  title: {
    default: "Data Referensi - Universitas Siber Asia",
    template: "%s | Data Referensi - UNSIA",
  },
  description: "Data Referensi merupakan suatu platform penyimpanan data",
  keywords: [
    "Data Referensi",
    "Data Referensi",
    "Data Referensi unsia",
    "Universitas Siber Asia",
    "DATA REFERENSI UNSIA",
    "Universitas Siber Asia",
  ],
  authors: {
    name: "Universitas Siber Asia",
  },
  creator: "DPS - Misbah Abroruddin",
  icons: [
    {
      url: "/logo-unsia.svg",
      href: "/logo-unsia.svg",
    },
  ],
  applicationName: "Data Referensi",
  openGraph: {
    title: "Data Referensi UNSIA",
    siteName: "Data Referensi UNSIA",
    locale: "id_Id",
    url: "https://www.unsia.ac.id",
    countryName: "Indonesia",
    type: "website",
    emails: "admission@unsia.ac.id",
    phoneNumbers: "(021) 278-061-89",
  },
  twitter: {
    title: "UNSIA",
    site: "@univsiberasia",
  },
  metadataBase: new URL("https://www.data-referensi.unsia.ac.id"),
};
