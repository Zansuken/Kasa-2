export type Housing = {
  id: string;
  title: string;
  cover: string;
};

export type HousingDetails = {
  id: string;
  title: string;
  cover: string;
  pictures: string[];
  description: string;
  host: {
    name: string;
    picture: string;
  };
  rating: string;
  location: string;
  equipments: string[];
  tags: string[];
};
