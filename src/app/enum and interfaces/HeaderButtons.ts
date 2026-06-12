export interface HeaderButton {
  key: string;
  route: string;
  icon: string;
  dropDown: boolean;
  dropDownItems?: {
    label: string;
    route: string;
  }[];
}

export const HEADER_BUTTONS: HeaderButton[] = [
  { icon: 'home', key: 'HOME', route: '/home', dropDown: false },
  { icon: 'bag', key: 'ABOUT US', route: '/', dropDown: false },
  { 
    icon: 'information-circle', 
    key: 'CONTACT US', 
    route: '/', 
    dropDown: true,
    dropDownItems: [
      { label: '', route: '/' }, // label translate key + nav route
      { label: '', route: '/' },
      { label: '', route: '/' }
    ]
  }
];