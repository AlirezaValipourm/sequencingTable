export interface HeaderProps {}

export interface ContentProps {
  children: React.ReactElement[] | any;
}

export interface PageTitleProps {
  title1: string;
  title2: string;
}

export interface WarningBoxProps {
  text: string;
}

export interface SectionBoxProps {
  active: number;
  stepTwoTitle: string;
  stepOneTitle: string;
}

export interface FooterProps {}

export interface ButtonProps {
  text: string;
  onClick: () => void;
}

export interface TableConfigs {
  weekdays: string;
  period: number;
  cost: number;
  availabilities: string;
}

export interface PageStrings {
  pageHeaderTitle: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  title: string;
  metaDescription: string;
  subtitle: string;
  warningText: string;
  stepOneTitle: string;
  stepTwoTitle: string;
  pageHeaderBackground: string | null | undefined;
  firstScheduleCta: string;
}

export interface BookedData {
  reservedTime: string[];
}
