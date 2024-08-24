export interface SocialMediaModel {
  id: number;
  socialMediaLink: string;
  socialMediaName: string;
  description: string;
}

const emptySocialMedia: SocialMediaModel = {
  id: 0,
  socialMediaLink: '',
  socialMediaName: '',
  description: '',
};

// Boş veri dizisini oluşturma
export const emptyTableData: SocialMediaModel[] = Array.from({ length: 9 }, () => ({
  ...emptySocialMedia,
}));
