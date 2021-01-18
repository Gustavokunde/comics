interface IComic {
  id: string;
  title: string;
  image?: string;
  creators?: {
    items: [
      {
        name?: string;
        role?: string;
      }
    ];
  };
  prices?: [
    {
      type?: string;
      price?: number | 0;
    }
  ];
  thumbnail?: {
    path?: string;
    extension?: string;
  };
}

export default IComic;
