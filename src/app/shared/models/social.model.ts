export interface SocialMediaModel {
  _id: number;
  SocialMediaLink: string;
  SocialMediaName: string;
  Description: string;
}

const emptySocialMedia: SocialMediaModel = {
  _id: 0,
  SocialMediaLink: '',
  SocialMediaName: '',
  Description: '',
};

// Boş veri dizisini oluşturma
export const emptyTableData: SocialMediaModel[] = Array.from({ length: 9 }, () => ({
  ...emptySocialMedia,
}));
